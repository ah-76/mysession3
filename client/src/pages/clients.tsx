import { useState } from "react";
import { useClients } from "@/hooks/use-clients";
import { Link } from "wouter";
import { Search, Filter, MoreVertical, Phone, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const { data: clients, isLoading } = useClients(search);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-serif text-white">Clients</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Search clients..."
              className="w-full bg-card/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-card/50 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 glass rounded-2xl animate-pulse" />
          ))
        ) : clients?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No clients found.
          </div>
        ) : (
          clients?.map((client) => (
            <Link key={client.id} href={`/clients/${client.id}`} className="block group">
              <div className="glass rounded-2xl p-6 h-full border border-white/5 group-hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center text-lg font-bold text-white border border-white/10 shadow-inner">
                    {client.avatar || client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border",
                    client.status === "Active" 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-white/5 text-muted-foreground border-white/10"
                  )}>
                    {client.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                  {client.name}
                </h3>
                
                <div className="space-y-2 mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{client.phone}</span>
                  </div>
                  {client.nextSession && (
                    <div className="flex items-center gap-2 text-primary/80 mt-3 pt-3 border-t border-white/5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="font-medium">
                        Next: {format(new Date(client.nextSession), "MMM d, h:mm a")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
