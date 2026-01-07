import { useInvoices, useUpdateInvoice } from "@/hooks/use-invoices";
import { format } from "date-fns";
import { CreditCard, CheckCircle2, AlertCircle, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  const { data: invoices, isLoading } = useInvoices();
  const { mutate: updateInvoice } = useUpdateInvoice();

  const handleMarkPaid = (id: number) => {
    updateInvoice({ id, status: "Paid" });
  };

  const stats = [
    { label: "Total Revenue (YTD)", value: "$24,500", change: "+12%" },
    { label: "Outstanding", value: "$1,250", change: "-5%" },
    { label: "Overdue", value: "$300", change: "0%" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-serif text-white">Billing & Invoices</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-serif text-white">{stat.value}</span>
              <span className={cn("text-xs px-2 py-1 rounded", stat.change.startsWith("+") ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-muted-foreground")}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Autopay Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-primary/20 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-400">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Autopay is active</h3>
            <p className="text-sm text-blue-200/70">Payments are processed automatically 24h after session completion.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Processing via Stripe</span>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        </div>
      </div>

      {/* Invoices List */}
      <div className="glass rounded-2xl overflow-hidden border border-white/5">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Recent Invoices</h2>
          <button className="text-sm text-primary hover:underline">Download Report</button>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading invoices...</div>
          ) : invoices?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No invoices found.</div>
          ) : (
            invoices?.map((invoice) => (
              <div key={invoice.id} className="p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{invoice.clientName}</div>
                    <div className="text-xs text-muted-foreground">#{invoice.invoiceNumber} • {format(new Date(invoice.date), "MMM d, yyyy")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="font-serif text-lg text-white w-24 text-right">
                    ${invoice.amount}
                  </div>
                  
                  <div className="w-24 flex justify-center">
                     <span className={cn(
                      "text-xs px-2.5 py-1 rounded-full border min-w-[80px] text-center",
                      invoice.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                      invoice.status === "Sent" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      invoice.status === "Overdue" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                      "bg-white/5 text-muted-foreground border-white/10"
                    )}>
                      {invoice.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {invoice.status !== "Paid" && (
                      <button 
                        onClick={() => handleMarkPaid(invoice.id)}
                        className="p-2 hover:bg-emerald-500/20 rounded-lg text-muted-foreground hover:text-emerald-400 transition-colors"
                        title="Mark as Paid"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-white/10 rounded-lg text-muted-foreground hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
