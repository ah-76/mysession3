import { Link, useLocation } from "wouter";
import { Home, Calendar, Users, CreditCard, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DemoPanel } from "@/components/demo-panel";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Calendar, label: "Calendar", href: "/calendar" },
    { icon: Users, label: "Clients", href: "/clients" },
    { icon: CreditCard, label: "Billing", href: "/billing" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden p-4 flex justify-between items-center glass sticky top-0 z-50">
        <h1 className="text-xl font-serif font-bold text-white tracking-wide">MySession</h1>
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary">
          JD
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 border-r border-white/5 bg-card/30 p-6">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">MySession</h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Therapist Portal</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary shadow-[0_0_20px_-5px_rgba(139,92,246,0.3)]" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}>
                <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
                <span className={cn("font-medium", isActive ? "font-semibold" : "")}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
           <DemoPanel />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 relative z-10 scrollbar-hide">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/10 z-50 pb-safe">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[64px]",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "fill-current/10")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* FAB for Mobile */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        <button className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
          <Plus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}
