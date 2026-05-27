import type {PropsWithChildren} from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse dark:bg-blue-500/5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse dark:bg-cyan-500/5" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 dark:bg-purple-500/5" />
      </div>
      
      <Header />
      
      <main className="min-h-screen container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-lg bg-white/40 dark:bg-black/20 py-8 mt-12 support-[backdrop-blur]:bg-white/30 dark:support-[backdrop-blur]:bg-black/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-muted-foreground">
              Aethera - Premium Weather Intelligence
            </p>
            <p className="text-xs text-muted-foreground">
              Crafted with precision by Titan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Layout;
