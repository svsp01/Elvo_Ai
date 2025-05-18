"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState, useEffect } from "react"; // Import useEffect
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Keep this for now, but we'll get the value in useEffect
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client after hydration
    setCallbackUrl(searchParams.get("callbackUrl"));
  }, [searchParams]); // Re-run if searchParams object changes

  // Log state changes
  const setErrorWithLog = (value: string) => {
    console.log("AuthCard: Setting error state", { error: value });
    setError(value);
  };

  const setLoadingWithLog = (value: boolean) => {
    console.log("AuthCard: Setting loading state", { loading: value });
    setLoading(value);
  };

  const setEmailWithLog = (value: string) => {
    console.log("AuthCard: Setting email state", { email: value });
    setEmail(value);
  };

  const setPasswordWithLog = (value: string) => {
    console.log("AuthCard: Setting password state", { password: value });
    setPassword(value);
  };

  const validateInputs = (email: string, password: string): string | null => {
    console.log("AuthCard: Validating inputs", { email, password });
    if (!email || !password) {
      const error = "Email and password are required";
      console.log("AuthCard: Validation failed", { error });
      return error;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      const error = "Invalid email format";
      console.log("AuthCard: Validation failed", { error });
      return error;
    }
    if (password.length < 6) {
      const error = "Password must be at least 6 characters";
      console.log("AuthCard: Validation failed", { error });
      return error;
    }
    console.log("AuthCard: Validation passed");
    return null;
  };

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    console.log("AuthCard: handleAuth called (form submission)");
    e.preventDefault();
    setErrorWithLog("");
    setLoadingWithLog(true);

    const validationError = validateInputs(email, password);
    if (validationError) {
      setErrorWithLog(validationError);
      setLoadingWithLog(false);
      return;
    }

    try {
      console.log("AuthCard: Attempting credentials login", { email });
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Keep this to handle errors inline
      }).catch((err) => {
        console.error("AuthCard: Network error during signIn", {
          error: err.message,
          name: err.name,
          stack: err.stack,
        });
        throw err;
      });

      console.log("AuthCard: Credentials login result", { result });

      if (!result) {
        console.log("AuthCard: Credentials login failed: result is undefined");
        setErrorWithLog(
          "Login failed: Server did not respond. Please try again."
        );
        setLoadingWithLog(false);
        return;
      }

      if (result.error || !result.ok) {
        console.log("AuthCard: Credentials login failed", {
          error: result.error,
          status: result.status,
          ok: result.ok,
        });
        setErrorWithLog(
          result.error === "CredentialsSignin"
            ? "Login failed. Please check your email and password."
            : "Login failed. Please check your email and password."
        );
        setLoadingWithLog(false);
        return;
      }

      console.log("AuthCard: Credentials login successful", {
        status: result.status,
        url: result.url,
      });
      // window.location.href = "/"; // OLD: Hardcoded redirect
      router.replace(callbackUrl || "/dashboard");
    } catch (err) {
      console.error("AuthCard: Unexpected error in credentials login", err);
      setErrorWithLog("An unexpected error occurred during login");
      setLoadingWithLog(false);
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    console.log("AuthCard: handleOAuthSignIn called", { provider });
    setErrorWithLog("");
    setLoadingWithLog(true);
    try {
      console.log(`AuthCard: Initiating ${provider} OAuth login`);
      // Use the callbackUrl from query params, or default to /dashboard
      await signIn(provider, {
        callbackUrl: callbackUrl || "/dashboard",
      }).catch((err) => {
        console.error(`AuthCard: Network error during ${provider} signIn`, {
          error: err.message,
          name: err.name,
          stack: err.stack,
        });
        throw err;
      });
      console.log(`AuthCard: ${provider} OAuth login initiated successfully`);
    } catch (error) {
      console.error(`AuthCard: ${provider} OAuth login failed`, error);
      setErrorWithLog(`Failed to sign in with ${provider}`);
    } finally {
      setLoadingWithLog(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would handle authentication here
    console.log("Logging in with:", email);

    setIsSubmitting(false);
  };

  return (
    // <Card className="w-[380px]">
    //   <CardHeader>
    //     <CardTitle>Account Access</CardTitle>
    //     <CardDescription>
    //       Login or create a new account to continue
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    //     <Tabs defaultValue="login" className="w-full">
    //       <TabsList className="grid w-full grid-cols-2">
    //         <TabsTrigger value="login">Login</TabsTrigger>
    //         <TabsTrigger value="register">Register</TabsTrigger>
    //       </TabsList>
    //       <TabsContent value="login">
    //         <form onSubmit={handleAuth}>
    //           <div className="grid w-full items-center gap-4">
    //             <div className="flex flex-col space-y-1.5">
    //               <Label htmlFor="email">Email</Label>
    //               <div className="relative">
    //                 <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    //                 <Input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   placeholder="Enter your email"
    //                   className="pl-8"
    //                   value={email}
    //                   onChange={(e) => setEmailWithLog(e.target.value)}
    //                   disabled={loading}
    //                 />
    //               </div>
    //             </div>
    //             <div className="flex flex-col space-y-1.5">
    //               <Label htmlFor="password">Password</Label>
    //               <div className="relative">
    //                 <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    //                 <Input
    //                   id="password"
    //                   name="password"
    //                   type="password"
    //                   placeholder="Enter your password"
    //                   className="pl-8"
    //                   value={password}
    //                   onChange={(e) => setPasswordWithLog(e.target.value)}
    //                   disabled={loading}
    //                 />
    //               </div>
    //             </div>
    //             <Button type="submit" className="w-full" disabled={loading}>
    //               {loading ? "Processing..." : "Sign In"}
    //             </Button>
    //           </div>
    //         </form>
    //       </TabsContent>
    //       <TabsContent value="register">
    //         <form onSubmit={handleAuth}>
    //           <div className="grid w-full items-center gap-4">
    //             <div className="flex flex-col space-y-1.5">
    //               <Label htmlFor="email">Email</Label>
    //               <div className="relative">
    //                 <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    //                 <Input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   placeholder="Enter your email"
    //                   className="pl-8"
    //                   value={email}
    //                   onChange={(e) => setEmailWithLog(e.target.value)}
    //                   disabled={loading}
    //                 />
    //               </div>
    //             </div>
    //             <div className="flex flex-col space-y-1.5">
    //               <Label htmlFor="password">Password</Label>
    //               <div className="relative">
    //                 <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    //                 <Input
    //                   id="password"
    //                   name="password"
    //                   type="password"
    //                   placeholder="Create a password"
    //                   className="pl-8"
    //                   value={password}
    //                   onChange={(e) => setPasswordWithLog(e.target.value)}
    //                   disabled={loading}
    //                 />
    //               </div>
    //             </div>
    //             <Button type="submit" className="w-full" disabled={loading}>
    //               {loading ? "Processing..." : "Sign Up"}
    //             </Button>
    //           </div>
    //         </form>
    //       </TabsContent>
    //     </Tabs>
    //   </CardContent>
    //   <CardFooter className="flex flex-col gap-4">
    //     <div className="relative w-full">
    //       <div className="absolute inset-0 flex items-center">
    //         <span className="w-full border-t" />
    //       </div>
    //       <div className="relative flex justify-center text-xs uppercase">
    //         <span className="bg-background px-2 text-muted-foreground">
    //           Or continue with
    //         </span>
    //       </div>
    //     </div>
    //     <Button
    //       variant="outline"
    //       className="w-full"
    //       onClick={() => handleOAuthSignIn("google")}
    //       disabled={loading}
    //     >
    //       Continue with Google
    //     </Button>
    //     <Button
    //       variant="outline"
    //       className="w-full"
    //       onClick={() => handleOAuthSignIn("github")}
    //       disabled={loading}
    //     >
    //       <Github className="mr-2 h-4 w-4" />
    //       Continue with GitHub
    //     </Button>
    //   </CardFooter>
    // </Card>
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <div className=" bg-white fixed top-0 z-50 w-full flex items-center justify-center shadow-md">
          <Link href="/" className=" cursor-pointer">
            <Image
              src="/Elvo_logo_transparent.png"
              alt="Elvo.ai"
              width={80}
              height={40}
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pt-25 w-full">
          <div className="w-full max-w-md">
            <h1 className="text-xl font-semibold text-center text-gray-800 mb-8">
              Sign In
            </h1>
            {/* Social Login Buttons */}
            <div className="space-y-4 mb-6">
              <Button
                onClick={() => handleOAuthSignIn("google")}
                disabled={loading}
                variant={"outline"}
                className=" w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {/* Google Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 mr-3"
                  aria-hidden="true"
                >
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
                </svg>
                Continue with Google
              </Button>

              {/* Microsoft Icon */}

              {/* <Button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 23 23"
                  className="w-5 h-5 mr-3"
                  aria-hidden="true"
                >
                  <path fill="#f25022" d="M1 1h10v10H1z" />
                  <path fill="#00a4ef" d="M1 12h10v10H1z" />
                  <path fill="#7fba00" d="M12 1h10v10H12z" />
                  <path fill="#ffb900" d="M12 12h10v10H12z" />
                </svg>
                Continue with Microsoft
              </Button> */}

              {/* Gihub Icon */}

              <Button
                disabled={loading}
                variant={"outline"}
                onClick={() => handleOAuthSignIn("github")}
                className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2.5 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with Github
              </Button>
            </div>
            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>{" "}
            {/* <Tabs defaultValue="login" className="w-full mb-1">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>{" "}
              </TabsList> */}
            {/* <TabsContent value="login">
                <form onSubmit={handleAuth}>
                  <div className="mb-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      disabled={loading}
                      onChange={(e) => setEmailWithLog(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6 text-right">
                    <Link
                      href="/forgot-password"
                      className="text-emerald-800 hover:bg-[#10B981] text-sm"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className={`w-full py-3 rounded-md transition-colors mb-6 ${
                      email
                        ? "bg-emerald-800 text-white hover:bg-[#10B981]"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </TabsContent> */}
            {/* <TabsContent value="register">
                <form onSubmit={handleAuth}>
                  <div className="mb-6">
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      disabled={loading}
                      onChange={(e) => setEmailWithLog(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      disabled={loading}
                      onChange={(e) => setPasswordWithLog(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring- focus:ring-emerald-800 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6 text-right">
                    <Link
                      href="/forgot-password"
                      className="text-emerald-800 hover:bg-[#10B981] text-sm"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className={`w-full py-3 rounded-md transition-colors mb-6 ${
                      email
                        ? "bg-emerald-800 text-white hover:bg-[#10B981]"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </TabsContent> */}
            {/* </Tabs> */}
            {/* Email Form */}
            <form onSubmit={handleAuth}>
              <div className="mb-6">
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  disabled={loading}
                  onChange={(e) => setEmailWithLog(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  disabled={loading}
                  onChange={(e) => setPasswordWithLog(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring- focus:ring-[#10B981] focus:border-transparent"
                  required
                />
              </div>

              <div className="mb-6 text-right">
                <Link
                  href="/forgot-password"
                  className="text-[#10B981] hover:bg-emerald-800 text-sm"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className={`w-full py-3 rounded-md transition-colors mb-6 ${
                  email
                    ? "bg-[#10B981] text-white hover:bg-emerald-800"
                    : "bg-[#10B981] text-white hover:bg-emerald-800"
                }`}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
            {/* Terms */}
            <div className="text-center text-gray-500 text-sm">
              By using Elvo you agree to the{" "}
              <Link
                href="/terms"
                className="text-[#10B981] hover:bg-emerald-800"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-[#10B981] hover:bg-emerald-800"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
