import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Clients
  app.get(api.clients.list.path, async (req, res) => {
    const search = req.query.search as string | undefined;
    const clients = await storage.getClients(search);
    res.json(clients);
  });

  app.get(api.clients.get.path, async (req, res) => {
    const client = await storage.getClient(Number(req.params.id));
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  });

  // Sessions
  app.get(api.sessions.list.path, async (req, res) => {
    const date = req.query.date as string | undefined;
    const sessions = await storage.getSessions(date);
    res.json(sessions);
  });

  app.post(api.sessions.create.path, async (req, res) => {
    try {
      const input = api.sessions.create.input.parse(req.body);
      const session = await storage.createSession(input);
      res.status(201).json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.message });
      }
      throw err;
    }
  });

  app.put(api.sessions.update.path, async (req, res) => {
     try {
      const input = api.sessions.update.input.parse(req.body);
      const session = await storage.updateSession(Number(req.params.id), input);
      res.json(session);
    } catch (err) {
      if (err instanceof Error && err.message === "Session not found") {
        return res.status(404).json({ message: "Session not found" });
      }
      throw err;
    }
  });

  // Invoices
  app.get(api.invoices.list.path, async (req, res) => {
    const invoices = await storage.getInvoices();
    res.json(invoices);
  });

  app.post(api.invoices.create.path, async (req, res) => {
    const input = api.invoices.create.input.parse(req.body);
    const invoice = await storage.createInvoice(input);
    res.status(201).json(invoice);
  });

  app.put(api.invoices.update.path, async (req, res) => {
    const input = api.invoices.update.input.parse(req.body);
    const invoice = await storage.updateInvoice(Number(req.params.id), input);
    res.json(invoice);
  });

  // Demo
  app.post(api.demo.trigger.path, async (req, res) => {
    const input = api.demo.trigger.input.parse(req.body);
    const result = await storage.triggerScenario(input);
    res.json(result);
  });

  return httpServer;
}
