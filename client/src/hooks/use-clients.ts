import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertClient, type Client } from "@shared/schema";

export function useClients(search?: string) {
  return useQuery({
    queryKey: [api.clients.list.path, search],
    queryFn: async () => {
      const url = search 
        ? `${api.clients.list.path}?search=${encodeURIComponent(search)}` 
        : api.clients.list.path;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch clients");
      return api.clients.list.responses[200].parse(await res.json());
    },
  });
}

export function useClient(id: number) {
  return useQuery({
    queryKey: [api.clients.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.clients.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch client");
      return api.clients.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
