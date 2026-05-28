import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { login as loginApi } from "@/api/auth";

import { useAuth } from "@/context/auth-context";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const token = await loginApi(email, password);

      const userData = {
        name: email.split("@")[0],
        email,
      };

      login(userData, token);

      navigate("/");
  } catch (err: any) {
  console.error(err);

  setError(
    err.message || "Login failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse dark:bg-blue-500/5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse dark:bg-cyan-500/5" />
      </div>

<div className="glass-card dark:glass-card-dark w-full max-w-md p-8 space-y-6 bg-white/60 dark:bg-black/30 border-primary/20 dark:border-white/10">        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your Aethera account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               className="glass-effect backdrop-blur border-primary/30 bg-white/40 dark:border-white/20 dark:bg-white/5"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             className="glass-effect backdrop-blur border-primary/30 bg-white/40 dark:border-white/20 dark:bg-white/5"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                {error}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold py-2 rounded-lg transition-all"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background dark:bg-slate-950 text-muted-foreground">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full glass-effect border-primary/30 dark:border-white/20 hover:bg-primary/10 dark:hover:bg-white/5"
          onClick={() => navigate("/signup")}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
