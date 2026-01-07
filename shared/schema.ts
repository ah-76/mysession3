import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Although we are using in-memory storage, we define the schema for type consistency
// and potential future DB usage.

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull().default("Active"), // Active, Paused
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  notes: text("notes"),
  nextSession: timestamp("next_session"),
  avatar: text("avatar"), // Initials or URL
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  time: timestamp("time").notNull(),
  duration: integer("duration").notNull().default(50), // minutes
  mode: text("mode").notNull().default("In-Person"), // In-Person, Remote
  status: text("status").notNull().default("Confirmed"), // Confirmed, Needs Reschedule, Pending, Completed
  notes: text("notes"),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").notNull().default("Draft"), // Draft, Sent, Paid, Overdue
  date: timestamp("date").notNull().defaultNow(),
  invoiceNumber: text("invoice_number").notNull(),
});

// Schemas
export const insertClientSchema = createInsertSchema(clients).omit({ id: true });
export const insertSessionSchema = createInsertSchema(sessions).omit({ id: true });
export const insertInvoiceSchema = createInsertSchema(invoices).omit({ id: true });

// Types
export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

// Joined types for API responses
export type SessionWithClient = Session & { clientName: string };
export type InvoiceWithClient = Invoice & { clientName: string };

// Demo Scenario Request
export const demoScenarioSchema = z.object({
  type: z.enum(["vacation", "reschedule_request", "payment_received", "reset"]),
});

export type DemoScenarioRequest = z.infer<typeof demoScenarioSchema>;
