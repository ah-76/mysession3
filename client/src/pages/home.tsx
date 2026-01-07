import { format } from "date-fns";
import { useSessions } from "@/hooks/use-sessions";
import { useInvoices } from "@/hooks/use-invoices";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  MoreHorizontal, 
  Plus, 
  FileText, 
  CreditCard,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

export default function Home() {
  const today = new Date();
  const dateStr = today.toISOString();
  
  const { data: sessions, isLoading: loadingSessions } = useSessions(dateStr);
  const { data: invoices } = useInvoices();

  const unpaidInvoices = invoices?.filter(i => i.status !== "Paid" && i.status !== "Draft").length || 0;
  const draftInvoices = invoices?.filter(i => i.status === "Draft").length || 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <p className="text-primary font-medium mb-1 tracking-wide uppercase text-xs">Welcome back</p>
          <h1 className="text-3xl md:text-4xl font-serif text-white">
            {format(today, "EEEE, MMM do")}
          </h1>
        </div>
        <div className="hidden md:block">
           <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95 flex items-center gap-2">
             <Plus className="w-4 h-4" />
             New Session
           </button>
        </div>
      </header>

      {/* Pulse Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-24 h-24" />
          </div>
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Billing Pulse</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif text-white">{unpaidInvoices}</span>
            <span className="text-sm text-muted-foreground">unpaid invoices</span>
          </div>
          <div className="mt-4 flex gap-2">
             <span className="text-xs bg-orange-500/10 text-orange-400 px-2 py-1 rounded border border-orange-500/20">
               {draftInvoices} Drafts
             </span>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Calendar className="w-24 h-24" />
          </div>
          <h3 className="text-muted-foreground text-sm font-medium uppercase tracking-wider mb-2">Today's Schedule</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif text-white">{sessions?.length || 0}</span>
            <span className="text-sm text-muted-foreground">sessions scheduled</span>
          </div>
           <div className="mt-4 flex gap-2">
             <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">
               On Track
             </span>
          </div>
        </div>
        
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-colors flex flex-col justify-center items-start">
           <h3 className="text-white font-serif text-lg mb-4">Quick Actions</h3>
           <div className="flex gap-3 w-full">
              <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors flex flex-col items-center gap-2">
                 <FileText className="w-5 h-5 text-primary" />
                 <span className="text-xs">Invoice</span>
              </button>
               <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors flex flex-col items-center gap-2">
                 <Clock className="w-5 h-5 text-primary" />
                 <span className="text-xs">Block</span>
              </button>
               <button className="flex-1 bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/5 transition-colors flex flex-col items-center gap-2">
                 <Calendar className="w-5 h-5 text-primary" />
                 <span className="text-xs">Reschedule</span>
              </button>
           </div>
        </div>
      </div>

      {/* Today's Timeline */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif text-white">Today's Sessions</h2>
          <Link href="/calendar" className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
            View Calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-3">
          {loadingSessions ? (
            // Skeleton
            [1, 2, 3].map((i) => (
              <div key={i} className="h-24 glass rounded-2xl animate-pulse" />
            ))
          ) : sessions?.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
              <p className="text-muted-foreground">No sessions scheduled for today.</p>
            </div>
          ) : (
            sessions?.map((session) => (
              <div 
                key={session.id} 
                className="glass rounded-2xl p-4 md:p-6 flex items-center gap-4 group hover:bg-white/5 transition-all cursor-pointer border-l-4 border-l-transparent hover:border-l-primary"
              >
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-lg font-bold text-white">
                    {format(new Date(session.time), "h:mm")}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {format(new Date(session.time), "a")}
                  </span>
                </div>
                
                <div className="h-10 w-px bg-white/10 mx-2" />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">
                      {session.clientName}
                    </h3>
                    {session.status !== "Confirmed" && (
                      <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border",
                        session.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        session.status === "Needs Reschedule" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                        "bg-white/5 text-muted-foreground border-white/10"
                      )}>
                        {session.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {session.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      {session.mode === "In-Person" ? <MapPin className="w-3.5 h-3.5" /> : <Video className="w-3.5 h-3.5" />}
                      {session.mode}
                    </span>
                  </div>
                </div>

                <button className="p-2 hover:bg-white/10 rounded-full text-muted-foreground hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
