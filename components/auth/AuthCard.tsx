"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Lock, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function AuthCard() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
        redirect: false,
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
        setErrorWithLog("Login failed: Server did not respond. Please try again.");
        setLoadingWithLog(false);
        return;
      }

      if (result.error || !result.ok) {
        console.log("AuthCard: Credentials login failed", {
          error: result.error,
          status: result.status,
          ok: result.ok,
        });
        setErrorWithLog("Login failed. Please check your email and password.");
        setLoadingWithLog(false);
        return;
      }

      console.log("AuthCard: Credentials login successful", {
        status: result.status,
        url: result.url,
      });
      window.location.href = "/";
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
      await signIn(provider, { callbackUrl: "/" }).catch((err) => {
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

  return (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>Login or create a new account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleAuth}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-8"
                      value={email}
                      onChange={(e) => setEmailWithLog(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-8"
                      value={password}
                      onChange={(e) => setPasswordWithLog(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Sign In"}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleAuth}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-8"
                      value={email}
                      onChange={(e) => setEmailWithLog(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-8"
                      value={password}
                      onChange={(e) => setPasswordWithLog(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Sign Up"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthSignIn("google")}
          disabled={loading}
        >
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthSignIn("github")}
          disabled={loading}
        >
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </Button>
      </CardFooter>
    </Card>
  );
}