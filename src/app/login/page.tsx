"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FormState {
  email: string;
  password: string;
  isSignUp: boolean;
  organization?: string;
  full_name?: string;
  phone?: string;
  userType?: 'user' | 'data_provider';
}

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    isSignUp: false,
    organization: "",
    full_name: "",
    phone: "",
    userType: 'user'
  });
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const isNewUser = searchParams.get("new");
    if (isNewUser === "user") {
      setForm((prev) => ({ ...prev, isSignUp: true, userType: 'user' }));
    } else if (isNewUser === "data-provider") {
      setForm((prev) => ({ ...prev, isSignUp: true, userType: 'data_provider' }));
    }
  }, [searchParams]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleMode = () => setForm({ ...form, isSignUp: !form.isSignUp });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);

    try {
      let result;
      if (form.isSignUp) {
        // First create the auth user
        result = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });

        if (result.error) {
          alert(result.error.message);
          return;
        }

        if (result.data.user) {
          // Then create the profile based on user type
          const profileData = form.userType === 'data_provider' 
            ? {
                id: result.data.user.id,
                organization: form.organization,
                full_name: form.full_name,
                phone: form.phone,
                role: "data_provider"
              }
            : {
                id: result.data.user.id,
                role: "user"
              };

          const { error: profileError } = await supabase
            .from("user_profiles")
            .insert([profileData]);

          if (profileError) {
            alert(profileError.message);
            return;
          }

          // Redirect based on user type
          router.push(form.userType === 'data_provider' ? '/provider-landing' : '/setup');
        }
      } else {
        // Regular sign in
        result = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (result.error) {
          alert(result.error.message);
          return;
        }

        // Check profile and redirect accordingly
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("full_name, role")
          .eq("id", result.data.user?.id)
          .single();

        if (profile?.role === "data_provider") {
          router.push('/provider-landing');
        } else if (!profile?.full_name) {
          router.push('/setup');
        } else if (profile?.role === "admin") {
          router.push('/admin/dashboard');
        } else {
          router.push('/user-profile');
        }
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.protocol}//${window.location.host}/api/auth/confirm`,
      },
    });
    if (error) alert(error.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10 bg-gradient-to-b from-zinc-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-teal-500/30 animate-gradient-xy" />
      
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl backdrop-blur-xl bg-zinc-900/80 border border-zinc-800 relative z-20">
        <div className="flex items-center">
          <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400 mx-auto">
            {form.isSignUp ? "Create Account" : "Sign in to your account"}
          </h1>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {form.isSignUp && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, userType: 'user' }))}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    form.userType === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  User
                </button>
                <button
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, userType: 'data_provider' }))}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    form.userType === 'data_provider'
                      ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  Data Provider
                </button>
              </div>

              {form.userType === 'data_provider' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300">
                      Organization Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      placeholder="Enter organization name"
                      value={form.organization}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300">
                      Your Role In Organisation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      placeholder="Enter your role"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border border-zinc-700 rounded-xl bg-zinc-800/50 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white transition-colors"
              >
                {isVisible ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {form.isSignUp && (
            <div className="flex items-center space-x-2">
              <input
                required
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 accent-teal-500"
              />
              <span className="text-sm text-zinc-400">
                I agree to the
                <a href="/terms" className="text-teal-400 hover:text-teal-300 hover:underline mx-1">
                  Terms
                </a>
                &amp;
                <a href="/privacy" className="text-teal-400 hover:text-teal-300 hover:underline ml-1">
                  Privacy Policy
                </a>
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 font-semibold text-white bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-teal-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              form.isSignUp ? "Create Account" : "Sign In"
            )}
          </button>
        </form>

        {form.userType !== 'data_provider' && (
          <>
            <div className="flex items-center justify-between">
              <hr className="w-full border-zinc-600" />
              <span className="px-2 text-sm text-zinc-400">
                OR
              </span>
              <hr className="w-full border-zinc-600" />
            </div>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center text-white gap-2 py-2 border border-zinc-600 rounded-full hover:bg-zinc-800 transition"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </button>
          </>
        )}
        
        <p className="text-center text-sm text-zinc-400">
          {form.isSignUp ? "Already have an account?" : "Need to create an account?"}
          <button
            onClick={toggleMode}
            className="text-teal-400 hover:text-teal-300 hover:underline ml-1 transition-colors"
          >
            {form.isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
