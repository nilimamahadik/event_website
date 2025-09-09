import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertEventSchema, 
  insertUserSchema, 
  insertCategorySchema,
  insertEventAttendeeSchema,
  insertFavoriteSchema,
  insertNewsletterSubscriptionSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid category data", error });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const { category, featured } = req.query;
      
      let events;
      if (featured === "true") {
        events = await storage.getFeaturedEvents();
      } else if (category) {
        events = await storage.getEventsByCategory(category as string);
      } else {
        events = await storage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data", error });
    }
  });

  app.put("/api/events/:id", async (req, res) => {
    try {
      const eventUpdate = req.body;
      const event = await storage.updateEvent(req.params.id, eventUpdate);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Event Attendees
  app.get("/api/events/:id/attendees", async (req, res) => {
    try {
      const attendees = await storage.getEventAttendees(req.params.id);
      res.json(attendees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch attendees" });
    }
  });

  app.post("/api/events/:eventId/attendees", async (req, res) => {
    try {
      const validatedData = insertEventAttendeeSchema.parse({
        eventId: req.params.eventId,
        userId: req.body.userId,
      });
      const attendee = await storage.addEventAttendee(validatedData);
      res.status(201).json(attendee);
    } catch (error) {
      res.status(400).json({ message: "Invalid attendee data", error });
    }
  });

  app.delete("/api/events/:eventId/attendees/:userId", async (req, res) => {
    try {
      await storage.removeEventAttendee(req.params.eventId, req.params.userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove attendee" });
    }
  });

  // Favorites
  app.get("/api/users/:userId/favorites", async (req, res) => {
    try {
      const favorites = await storage.getUserFavorites(req.params.userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addFavorite(validatedData);
      res.status(201).json(favorite);
    } catch (error) {
      res.status(400).json({ message: "Invalid favorite data", error });
    }
  });

  app.delete("/api/users/:userId/favorites/:eventId", async (req, res) => {
    try {
      await storage.removeFavorite(req.params.userId, req.params.eventId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  // Users
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: "Invalid user data", error });
    }
  });

  // Newsletter
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if already subscribed
      const existing = await storage.getNewsletterSubscription(validatedData.email);
      if (existing) {
        return res.status(409).json({ message: "Email already subscribed" });
      }
      
      const subscription = await storage.subscribeNewsletter(validatedData);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: "Invalid subscription data", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
