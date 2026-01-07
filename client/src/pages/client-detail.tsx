import { useRoute } from "wouter";
import { useClient } from "@/hooks/use-clients";
import { ArrowLeft, MessageSquare, Calendar as CalendarIcon, CreditCard, FileText } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";

export default function ClientDetail() {
  const [, params] = useRoute("/clients/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: client, isLoading } = useClient(id);

  if (isLoading) return <div className="p-8 text-center">Loading client profile...</div>;
  if (!client) return <div className="p-8 text-center">Client not found</div>;

  return (
    <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <Link href="/clients" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-primary/20">
              {client.avatar || client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-3xl font-serif text-white">{client.name}</h1>
              <p className="text-muted-foreground">{client.status} • Client since 2023</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
              Reschedule
            </button>
            <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Send Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Session Card */}
          <div className="glass p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
             <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
               <CalendarIcon className="w-5 h-5 text-primary" /> Next Session
             </h2>
             
             {client.nextSession ? (
               <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                 <div>
                   <div className="text-2xl font-serif text-white">
                     {format(new Date(client.nextSession), "EEEE, MMMM do")}
                   </div>
                   <div className="text-primary mt-1">
                     {format(new Date(client.nextSession), "h:mm a")} • In-Person
                   </div>
                 </div>
                 <button className="text-xs border border-white/20 rounded px-3 py-1.5 hover:bg-white/10 transition-colors">
                   Manage
                 </button>
               </div>
             ) : (
               <div className="p-8 text-center border border-dashed border-white/10 rounded-xl text-muted-foreground">
                 No upcoming sessions scheduled.
               </div>
             )}
          </div>

          {/* Clinical Notes */}
          <div className="glass p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" /> Clinical Notes
              </h2>
              <button className="text-xs text-primary hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-background/40 p-4 rounded-xl border border-white/5">
                <div className="text-xs text-muted-foreground mb-2">Last Session • 2 days ago</div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {client.notes || "Client discussed progress on work-life balance goals. Reported lower anxiety levels this week. Assigned homework: 10min daily meditation."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-400" /> Billing
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Good Standing</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rate</span>
                <span className="text-sm font-medium text-white">$150 / hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Payment</span>
                <span className="text-sm font-medium text-white">Mar 12, 2024</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 rounded-lg bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
              View Payment History
            </button>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" /> Contact
            </h2>
             <div className="space-y-3 text-sm">
               <div className="flex gap-3 items-center">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                   <MessageSquare className="w-4 h-4 text-muted-foreground" />
                 </div>
                 <span className="text-white">{client.phone}</span>
               </div>
               <div className="flex gap-3 items-center">
                 <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                   <MessageSquare className="w-4 h-4 text-muted-foreground" />
                 </div>
                 <span className="text-white truncate">{client.email}</span>
               </div>
             </div>
             <button className="w-full mt-6 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary/20 transition-colors">
               Send Secure Message
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
