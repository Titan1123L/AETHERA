import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { signup } from "@/api/auth";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await signup(name, email, password);

      setMessage(response);

      navigate("/login");
    } catch (err) {
      setMessage("Signup failed");
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

      <div className="glass-card dark:glass-card-dark w-full max-w-md p-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Join Aethera
          </h1>
          <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-effect backdrop-blur border-white/20 bg-white/10 dark:bg-white/5"
            />
          </div>

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
              className="glass-effect backdrop-blur border-white/20 bg-white/10 dark:bg-white/5"
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
              className="glass-effect backdrop-blur border-white/20 bg-white/10 dark:bg-white/5"
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 border ${message.includes("failed") ? "bg-red-500/10 border-red-500/20" : "bg-green-500/10 border-green-500/20"}`}
            >
              <p
                className={`text-sm font-medium ${message.includes("failed") ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
              >
                {message}
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
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background dark:bg-slate-950 text-muted-foreground">
              Already have an account?
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full glass-effect border-white/20 hover:bg-white/10 dark:hover:bg-white/5"
          onClick={() => navigate("/login")}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
