"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2, Upload } from "lucide-react";

type FormValues = {
  image: FileList;
};

export default function PneumoniaXrayPredictionPage() {
  const [prediction, setPrediction] = useState<{
    diagnosis: string;
    probability: number;
    timestamp: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>();

  async function onSubmit(values: FormValues) {
    try {
      setError(null);
      setPrediction(null);

      const formData = new FormData();
      formData.append("file", values.image[0]);

      const response = await fetch(
        "https://nthander2002-HachathonHub-pneumonia.hf.space/api/v1/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail?.[0]?.msg || "Prediction failed");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  }

  const handleImageChange = (e: FileList | null) => {
    if (e && e[0]) {
      const file = e[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Information Section */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl">
            <CardHeader>
              <CardTitle className="text-3xl font-['Poppins'] text-cyan-400 drop-shadow-md">
                Understanding Pneumonia Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-2">
                  <h3 className="text-xl text-cyan-400 font-['Poppins']">What is Pneumonia? 🦠</h3>
                  <p className="leading-relaxed">
                    Pneumonia is an infection that causes inflammation in your lungs' air sacs. Think of your lungs like a sponge - when you have pneumonia, some of those tiny air pockets fill with fluid, making it harder to breathe!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl text-cyan-400 font-['Poppins']">How Our AI Helps? 🤖</h3>
                  <p className="leading-relaxed">
                    Our advanced AI model acts like a super-powered radiologist! It carefully analyzes chest X-rays to detect patterns and signs of pneumonia by looking for:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1">
                    <li>White spots (infiltrates) in the lungs</li>
                    <li>Fluid accumulation patterns</li>
                    <li>Tissue inflammation signatures</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
                  <p className="text-sm italic">
                    ⚡ Quick Tip: For best results, upload a clear, front-view chest X-ray image. Our AI has been trained on thousands of X-ray images to provide accurate predictions!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Upload and Results Section */}
        <Card className="bg-gradient-to-br from-zinc-900/60 to-black/80 border border-cyan-500/20 shadow-lg backdrop-blur-lg rounded-3xl">
          <CardHeader>
            <CardTitle className="text-4xl font-['Poppins'] text-cyan-400 drop-shadow-md">
              Pneumonia X-ray Detection
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1 font-['Poppins']">
              Upload a chest X-ray image for pneumonia detection.
            </CardDescription>
          </CardHeader>

          <CardContent className="mt-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 p-4 bg-zinc-800/40 rounded-xl border border-cyan-400/10 shadow-inner backdrop-blur-md">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 text-sm font-['Poppins']">
                          Chest X-ray Image
                        </FormLabel>
                        <FormControl>
                          <div className="flex flex-col items-center space-y-4">
                            <div
                              className="w-full h-64 border-2 border-dashed border-cyan-500/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-colors duration-200"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              {preview ? (
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="max-h-full max-w-full object-contain"
                                />
                              ) : (
                                <div className="text-center">
                                  <Upload className="w-12 h-12 mx-auto text-cyan-500/70" />
                                  <p className="mt-2 text-sm text-gray-400">
                                    Click or drag and drop your X-ray image here
                                  </p>
                                </div>
                              )}
                              <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  onChange(e.target.files);
                                  handleImageChange(e.target.files);
                                }}
                                ref={field.ref}
                                name={field.name}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 transition-all duration-200 text-white font-['Poppins'] text-lg py-3 rounded-xl shadow-md hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
                  disabled={form.formState.isSubmitting || !preview}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze X-ray"
                  )}
                </Button>
              </form>
            </Form>

            {error && (
              <Alert
                variant="destructive"
                className="mt-8 border border-red-500/30 bg-red-500/10 text-red-200 backdrop-blur-md"
              >
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {prediction && (
              <Alert className="mt-6 bg-cyan-500/20 border-cyan-400/30">
                <CheckCircle2 className="h-5 w-5 !text-white" />
                <AlertTitle className="text-cyan-400 font-['Poppins'] underline">
                  PREDICTION RESULT
                </AlertTitle>
                <AlertDescription className="text-gray-200">
                  <div className="mt-2 text-gray-200 space-y-1 font-['Poppins']">
                    <p>
                      <strong>Diagnosis:</strong> {prediction.diagnosis}
                    </p>
                    <p>
                      <strong>Confidence:</strong>{" "}
                      {prediction.probability < 0.01
                        ? "< 0.01%"
                        : (prediction.probability * 100).toFixed(2) + "%"}
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}