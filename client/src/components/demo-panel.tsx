import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw, CalendarOff, CheckCircle2 } from "lucide-react";
import { useDemoScenario } from "@/hooks/use-demo";

export function DemoPanel() {
  const { mutate: triggerScenario, isPending } = useDemoScenario();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/20 text-primary-foreground hover:brightness-110 transition-all group">
          <div className="p-1.5 rounded-lg bg-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Demo Mode</p>
            <p className="text-[10px] text-primary/80">Trigger Scenarios</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Demo Scenarios</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Simulate real-world events to see how the dashboard reacts.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 border-white/10 hover:bg-white/5 hover:border-primary/50"
            disabled={isPending}
            onClick={() => triggerScenario({ type: "reschedule_request" })}
          >
            <CalendarOff className="mr-4 h-5 w-5 text-orange-400" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Client Reschedule</div>
              <div className="text-xs text-muted-foreground">Simulate a client requesting a time change</div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 border-white/10 hover:bg-white/5 hover:border-primary/50"
            disabled={isPending}
            onClick={() => triggerScenario({ type: "payment_received" })}
          >
            <CheckCircle2 className="mr-4 h-5 w-5 text-emerald-400" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Payment Received</div>
              <div className="text-xs text-muted-foreground">Mark a random invoice as paid</div>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="justify-start h-auto py-4 border-white/10 hover:bg-white/5 hover:border-primary/50"
            disabled={isPending}
            onClick={() => triggerScenario({ type: "reset" })}
          >
            <RefreshCw className="mr-4 h-5 w-5 text-red-400" />
            <div className="text-left">
              <div className="font-semibold text-foreground">Reset Data</div>
              <div className="text-xs text-muted-foreground">Clear all demo data and start fresh</div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
