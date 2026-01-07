import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Smartphone, User, HelpCircle, LogOut } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-serif text-white">Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="glass rounded-2xl p-6 flex items-center gap-4">
           <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-xl font-bold text-primary">
             JD
           </div>
           <div className="flex-1">
             <h2 className="text-lg font-medium text-white">Dr. Jane Doe</h2>
             <p className="text-muted-foreground text-sm">Clinical Psychologist</p>
           </div>
           <button className="px-4 py-2 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition-colors">
             Edit Profile
           </button>
        </section>

        {/* Security Group */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pl-2">Security & Access</h3>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                 <Smartphone className="w-5 h-5 text-primary" />
                 <div>
                   <div className="text-white">Face ID Login</div>
                   <div className="text-xs text-muted-foreground">Use biometric authentication</div>
                 </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Lock className="w-5 h-5 text-primary" />
                 <div>
                   <div className="text-white">Two-Factor Auth</div>
                   <div className="text-xs text-muted-foreground">Extra layer of security</div>
                 </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Notifications Group */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider pl-2">Notifications</h3>
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                 <Bell className="w-5 h-5 text-blue-400" />
                 <div>
                   <div className="text-white">Session Reminders</div>
                   <div className="text-xs text-muted-foreground">15 mins before start</div>
                 </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <User className="w-5 h-5 text-blue-400" />
                 <div>
                   <div className="text-white">Client Activity</div>
                   <div className="text-xs text-muted-foreground">New bookings & messages</div>
                 </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Support & Logout */}
        <div className="grid grid-cols-2 gap-4">
           <button className="glass p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
             <HelpCircle className="w-5 h-5 text-muted-foreground" />
             <span>Help & Support</span>
           </button>
           <button className="glass p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500/10 hover:text-red-400 transition-colors text-red-400/80">
             <LogOut className="w-5 h-5" />
             <span>Sign Out</span>
           </button>
        </div>
        
        <div className="text-center text-xs text-muted-foreground pt-8">
           MySession v1.0.2 • Build 2405
        </div>
      </div>
    </div>
  );
}
