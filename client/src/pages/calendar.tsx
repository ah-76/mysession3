import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { useSessions } from "@/hooks/use-sessions";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate the week view
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const { data: sessions } = useSessions(selectedDate.toISOString());

  // Hours for the timeline (9 AM to 6 PM)
  const hours = Array.from({ length: 10 }).map((_, i) => i + 9);

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-serif text-white">Calendar</h1>
        <div className="flex items-center gap-2 bg-card/50 rounded-lg p-1 border border-white/10">
          <button className="p-1 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium px-2 min-w-[100px] text-center">
            {format(selectedDate, "MMMM yyyy")}
          </span>
          <button className="p-1 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Week Strip */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
          
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-200",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105" 
                  : "bg-card/40 border-white/5 hover:bg-card hover:border-white/10 text-muted-foreground"
              )}
            >
              <span className="text-xs uppercase font-medium mb-1 opacity-80">
                {format(day, "EEE")}
              </span>
              <span className={cn("text-lg font-bold", isToday && !isSelected && "text-primary")}>
                {format(day, "d")}
              </span>
              {isToday && !isSelected && (
                <div className="w-1 h-1 rounded-full bg-primary mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Day Timeline */}
      <div className="flex-1 glass rounded-2xl p-6 relative min-h-[500px] overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
           <button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
             <Plus className="w-4 h-4" /> Block Time
           </button>
        </div>

        <div className="space-y-8 relative z-10">
          {hours.map((hour) => (
            <div key={hour} className="flex group h-20">
              <div className="w-16 text-right pr-4 text-sm text-muted-foreground font-medium -mt-2.5">
                {hour > 12 ? `${hour - 12} PM` : `${hour} ${hour === 12 ? "PM" : "AM"}`}
              </div>
              <div className="flex-1 border-t border-white/5 group-hover:border-white/10 transition-colors relative">
                {/* Render sessions that start in this hour */}
                {sessions?.filter(s => {
                  const sHour = new Date(s.time).getHours();
                  return sHour === hour;
                }).map(session => (
                  <div 
                    key={session.id}
                    className="absolute top-0 left-0 right-4 ml-2 p-3 rounded-xl bg-primary/20 border-l-4 border-l-primary text-primary-foreground text-sm hover:brightness-110 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-lg shadow-primary/5"
                    style={{
                      height: `${(session.duration / 60) * 80}px`, // approximate height mapping
                      top: `${(new Date(session.time).getMinutes() / 60) * 100}%`
                    }}
                  >
                    <div className="font-semibold">{session.clientName}</div>
                    <div className="opacity-80 text-xs">{session.mode} • {session.duration} min</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
