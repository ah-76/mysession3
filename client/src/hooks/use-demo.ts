import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type DemoScenarioRequest } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useDemoScenario() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: DemoScenarioRequest) => {
      const res = await fetch(api.demo.trigger.path, {
        method: api.demo.trigger.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to trigger scenario");
      return api.demo.trigger.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      toast({
        title: "Demo Scenario Triggered",
        description: data.message,
      });
      // Invalidate everything to refresh UI state
      queryClient.invalidateQueries();
    },
  });
}
