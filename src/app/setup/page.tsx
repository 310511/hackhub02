"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { UserRole } from '@/utils/db_types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function SetupPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    organization: '',
    role: ''
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router, supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      // Update user profile
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          organization: formData.organization,
          role: "user",
        });
      
      if (error) throw error;
      
      setFormSubmitted(true);
      // Redirect after short delay to show success message
      setTimeout(() => {
        if (formData.role==="admin") router.push('/admin/dashboard')
        else router.push('/user-profile')}, 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to save profile information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-2xl bg-zinc-900 relative z-20">
          <div className="text-center">
          <h1 className="text-2xl font-bold text-white mx-auto">
            Complete Your Profile
          </h1>
          <p className="text-center text-zinc-300 mt-2">
            Please provide some additional information to get started
          </p>
          </div>

        {formSubmitted ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-3 text-lg font-medium text-gray-900">Setup Complete!</h2>
            <p className="mt-2 text-gray-500">Redirecting you to the dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-2xl focus:ring focus:ring-teal-500 bg-zinc-700 text-white"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-2xl focus:ring focus:ring-teal-500 bg-zinc-700 text-white"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Organization 
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-2xl focus:ring focus:ring-teal-500 bg-zinc-700 text-white"
                placeholder="Enter your organization name"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full py-2 font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-full shadow-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : "Complete Setup"}
              </Button>
            </div>
          </form>
        )}

        <div className="text-center text-sm text-gray-400">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center justify-center mx-auto text-md text-teal-500 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
