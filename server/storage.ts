import { 
  clients, sessions, invoices,
  type Client, type InsertClient,
  type Session, type InsertSession,
  type Invoice, type InsertInvoice,
  type DemoScenarioRequest,
  type SessionWithClient, type InvoiceWithClient
} from "@shared/schema";

export interface IStorage {
  // Clients
  getClients(search?: string): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;

  // Sessions
  getSessions(date?: string): Promise<SessionWithClient[]>;
  createSession(session: InsertSession): Promise<Session>;
  updateSession(id: number, updates: Partial<InsertSession>): Promise<Session>;

  // Invoices
  getInvoices(): Promise<InvoiceWithClient[]>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: number, updates: Partial<InsertInvoice>): Promise<Invoice>;

  // Demo
  triggerScenario(scenario: DemoScenarioRequest): Promise<{ message: string; success: boolean }>;
  resetData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private clients: Map<number, Client>;
  private sessions: Map<number, Session>;
  private invoices: Map<number, Invoice>;
  private clientIds = 1;
  private sessionIds = 1;
  private invoiceIds = 1;

  constructor() {
    this.clients = new Map();
    this.sessions = new Map();
    this.invoices = new Map();
    this.seedData();
  }

  private seedData() {
    this.clients.clear();
    this.sessions.clear();
    this.invoices.clear();
    this.clientIds = 1;
    this.sessionIds = 1;
    this.invoiceIds = 1;

    // Seed Clients
    const seedClients: InsertClient[] = [
      { name: "Sarah Jenkins", email: "sarah.j@example.com", phone: "555-0101", status: "Active", notes: "Working on anxiety and work-life balance.", avatar: "SJ" },
      { name: "Michael Chen", email: "m.chen@example.com", phone: "555-0102", status: "Active", notes: "Grief counseling. Prefer evening slots.", avatar: "MC" },
      { name: "Alex Rivera", email: "arivera@example.com", phone: "555-0103", status: "Active", notes: "CBT for social anxiety.", avatar: "AR" },
      { name: "Emma Wilson", email: "emma.w@example.com", phone: "555-0104", status: "Paused", notes: "Traveling until March.", avatar: "EW" },
      { name: "David Kim", email: "dkim@example.com", phone: "555-0105", status: "Active", notes: "Relationship dynamics.", avatar: "DK" },
      { name: "Olivia Martin", email: "omartin@example.com", phone: "555-0106", status: "Active", notes: "Stress management.", avatar: "OM" },
    ];

    seedClients.forEach(c => {
      const id = this.clientIds++;
      this.clients.set(id, { ...c, id, nextSession: null, status: c.status || "Active", avatar: c.avatar || null });
    });

    // Seed Sessions (2 weeks around today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const generateSession = (clientId: number, offsetDays: number, hour: number, status: string = "Confirmed") => {
      const date = new Date(today);
      date.setDate(today.getDate() + offsetDays);
      date.setHours(hour, 0, 0, 0);
      
      const id = this.sessionIds++;
      this.sessions.set(id, {
        id,
        clientId,
        time: date,
        duration: 50,
        mode: Math.random() > 0.5 ? "In-Person" : "Remote",
        status,
        notes: null
      });
    };

    // Past sessions
    generateSession(1, -1, 10, "Completed");
    generateSession(2, -2, 14, "Completed");

    // Today
    generateSession(1, 0, 10, "Confirmed");
    generateSession(3, 0, 14, "Confirmed");
    generateSession(5, 0, 16, "Confirmed");

    // Upcoming
    generateSession(2, 1, 11, "Confirmed");
    generateSession(6, 2, 9, "Confirmed");
    generateSession(1, 7, 10, "Confirmed"); // Next week
    generateSession(3, 7, 14, "Confirmed"); // Next week

    // Seed Invoices
    const generateInvoice = (clientId: number, amount: number, status: string, offsetDays: number) => {
      const date = new Date(today);
      date.setDate(today.getDate() + offsetDays);
      const id = this.invoiceIds++;
      this.invoices.set(id, {
        id,
        clientId,
        amount,
        status,
        date,
        invoiceNumber: `INV-${2024000 + id}`
      });
    };

    generateInvoice(1, 150, "Paid", -5);
    generateInvoice(2, 150, "Sent", -2);
    generateInvoice(3, 150, "Overdue", -10);
    generateInvoice(5, 150, "Draft", 0);
  }

  // Clients
  async getClients(search?: string): Promise<Client[]> {
    let clients = Array.from(this.clients.values());
    if (search) {
      const lowerSearch = search.toLowerCase();
      clients = clients.filter(c => c.name.toLowerCase().includes(lowerSearch));
    }
    return clients;
  }

  async getClient(id: number): Promise<Client | undefined> {
    return this.clients.get(id);
  }

  // Sessions
  async getSessions(dateStr?: string): Promise<SessionWithClient[]> {
    let sessions = Array.from(this.sessions.values());
    
    // Sort by time
    sessions.sort((a, b) => a.time.getTime() - b.time.getTime());

    // Filter by date if provided (simple string check on ISO date part)
    if (dateStr) {
      // Implement filtering if strictly needed, but for now return all or let frontend filter
      // Actually, let's just return all for simplicity in this demo, usually fine for small datasets
    }

    return sessions.map(s => {
      const client = this.clients.get(s.clientId);
      return { ...s, clientName: client ? client.name : "Unknown Client" };
    });
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const id = this.sessionIds++;
    const session: Session = { ...insertSession, id, notes: insertSession.notes ?? null };
    this.sessions.set(id, session);
    return session;
  }

  async updateSession(id: number, updates: Partial<InsertSession>): Promise<Session> {
    const session = this.sessions.get(id);
    if (!session) throw new Error("Session not found");
    const updated = { ...session, ...updates };
    this.sessions.set(id, updated);
    return updated;
  }

  // Invoices
  async getInvoices(): Promise<InvoiceWithClient[]> {
    const invoices = Array.from(this.invoices.values());
    invoices.sort((a, b) => b.date.getTime() - a.date.getTime()); // Newest first
    return invoices.map(i => {
      const client = this.clients.get(i.clientId);
      return { ...i, clientName: client ? client.name : "Unknown Client" };
    });
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const id = this.invoiceIds++;
    const invoice: Invoice = { ...insertInvoice, id };
    this.invoices.set(id, invoice);
    return invoice;
  }

  async updateInvoice(id: number, updates: Partial<InsertInvoice>): Promise<Invoice> {
    const invoice = this.invoices.get(id);
    if (!invoice) throw new Error("Invoice not found");
    const updated = { ...invoice, ...updates };
    this.invoices.set(id, updated);
    return updated;
  }

  // Demo Scenarios
  async resetData(): Promise<void> {
    this.seedData();
  }

  async triggerScenario(scenario: DemoScenarioRequest): Promise<{ message: string; success: boolean }> {
    const today = new Date();
    today.setHours(0,0,0,0);

    switch (scenario.type) {
      case "vacation":
        // Mark next week's sessions as "Needs Reschedule"
        for (const session of this.sessions.values()) {
          const sessionDate = new Date(session.time);
          const diffDays = Math.floor((sessionDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
          if (diffDays >= 5 && diffDays <= 9) { // Next week roughly
             this.sessions.set(session.id, { ...session, status: "Needs Reschedule" });
          }
        }
        return { message: "Vacation added. Sessions marked for reschedule.", success: true };

      case "reschedule_request":
        // Find an upcoming confirmed session and mark as "Pending" (simulating request)
        // Just pick the first confirmed session in future
        const upcoming = Array.from(this.sessions.values()).find(s => s.time > new Date() && s.status === "Confirmed");
        if (upcoming) {
          this.sessions.set(upcoming.id, { ...upcoming, status: "Needs Reschedule" }); // Using standard status
          return { message: `Reschedule requested for ${upcoming.time.toDateString()}`, success: true };
        }
        return { message: "No upcoming sessions to reschedule.", success: false };

      case "payment_received":
         // Find a Sent or Overdue invoice and mark Paid
         const unpaid = Array.from(this.invoices.values()).find(i => i.status === "Sent" || i.status === "Overdue");
         if (unpaid) {
           this.invoices.set(unpaid.id, { ...unpaid, status: "Paid" });
           return { message: `Payment received for invoice #${unpaid.invoiceNumber}`, success: true };
         }
         return { message: "No unpaid invoices found.", success: false };

      case "reset":
        this.seedData();
        return { message: "Demo data reset.", success: true };

      default:
        return { message: "Unknown scenario", success: false };
    }
  }
}

export const storage = new MemStorage();
