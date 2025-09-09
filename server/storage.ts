import { 
  type User, 
  type InsertUser, 
  type Category, 
  type InsertCategory, 
  type Event, 
  type InsertEvent,
  type EventAttendee,
  type InsertEventAttendee,
  type Favorite,
  type InsertFavorite,
  type NewsletterSubscription,
  type InsertNewsletterSubscription
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryEventCount(id: string, count: number): Promise<void>;

  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  getEventsByCategory(categoryId: string): Promise<Event[]>;
  getFeaturedEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;

  // Event Attendees
  getEventAttendees(eventId: string): Promise<EventAttendee[]>;
  addEventAttendee(attendee: InsertEventAttendee): Promise<EventAttendee>;
  removeEventAttendee(eventId: string, userId: string): Promise<void>;

  // Favorites
  getUserFavorites(userId: string): Promise<Favorite[]>;
  addFavorite(favorite: InsertFavorite): Promise<Favorite>;
  removeFavorite(userId: string, eventId: string): Promise<void>;

  // Newsletter
  subscribeNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private events: Map<string, Event>;
  private eventAttendees: Map<string, EventAttendee>;
  private favorites: Map<string, Favorite>;
  private newsletterSubscriptions: Map<string, NewsletterSubscription>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.events = new Map();
    this.eventAttendees = new Map();
    this.favorites = new Map();
    this.newsletterSubscriptions = new Map();

    // Initialize with default categories
    this.initializeDefaultCategories();
  }

  private initializeDefaultCategories() {
    const defaultCategories = [
      { name: "Technology", description: "Tech conferences and workshops", icon: "laptop-code" },
      { name: "Business", description: "Business networking and seminars", icon: "briefcase" },
      { name: "Music", description: "Concerts and music festivals", icon: "music" },
      { name: "Arts", description: "Art exhibitions and creative workshops", icon: "palette" },
      { name: "Sports", description: "Sports events and fitness activities", icon: "running" },
      { name: "Food", description: "Food festivals and culinary events", icon: "utensils" },
      { name: "Health", description: "Health and wellness events", icon: "heart" },
      { name: "Education", description: "Educational workshops and seminars", icon: "graduation-cap" },
    ];

    defaultCategories.forEach((cat) => {
      const category: Category = {
        id: randomUUID(),
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        eventCount: 0,
      };
      this.categories.set(category.id, category);
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date(),
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
    };
    this.users.set(user.id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const category: Category = {
      ...insertCategory,
      id: randomUUID(),
      eventCount: 0,
      description: insertCategory.description || null,
    };
    this.categories.set(category.id, category);
    return category;
  }

  async updateCategoryEventCount(id: string, count: number): Promise<void> {
    const category = this.categories.get(id);
    if (category) {
      category.eventCount = count;
    }
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getEventsByCategory(categoryId: string): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.categoryId === categoryId);
  }

  async getFeaturedEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => event.isFeatured);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const event: Event = {
      ...insertEvent,
      id: randomUUID(),
      attendees: 0,
      createdAt: new Date(),
      price: insertEvent.price?.toString() || "0",
      capacity: insertEvent.capacity || null,
      isFeatured: insertEvent.isFeatured || false,
      imageUrl: insertEvent.imageUrl || null,
    };
    this.events.set(event.id, event);

    // Update category event count
    const categoryEvents = await this.getEventsByCategory(event.categoryId);
    await this.updateCategoryEventCount(event.categoryId, categoryEvents.length);

    return event;
  }

  async updateEvent(id: string, eventUpdate: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (event) {
      const updatedEvent = { ...event, ...eventUpdate };
      this.events.set(id, updatedEvent);
      return updatedEvent;
    }
    return undefined;
  }

  async deleteEvent(id: string): Promise<void> {
    this.events.delete(id);
  }

  // Event Attendees
  async getEventAttendees(eventId: string): Promise<EventAttendee[]> {
    return Array.from(this.eventAttendees.values()).filter(attendee => attendee.eventId === eventId);
  }

  async addEventAttendee(insertAttendee: InsertEventAttendee): Promise<EventAttendee> {
    const attendee: EventAttendee = {
      ...insertAttendee,
      id: randomUUID(),
      registeredAt: new Date(),
    };
    this.eventAttendees.set(attendee.id, attendee);

    // Update event attendee count
    const event = this.events.get(insertAttendee.eventId);
    if (event) {
      event.attendees = (event.attendees || 0) + 1;
    }

    return attendee;
  }

  async removeEventAttendee(eventId: string, userId: string): Promise<void> {
    const attendee = Array.from(this.eventAttendees.values()).find(
      a => a.eventId === eventId && a.userId === userId
    );
    if (attendee) {
      this.eventAttendees.delete(attendee.id);

      // Update event attendee count
      const event = this.events.get(eventId);
      if (event && event.attendees && event.attendees > 0) {
        event.attendees = event.attendees - 1;
      }
    }
  }

  // Favorites
  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return Array.from(this.favorites.values()).filter(fav => fav.userId === userId);
  }

  async addFavorite(insertFavorite: InsertFavorite): Promise<Favorite> {
    const favorite: Favorite = {
      ...insertFavorite,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.favorites.set(favorite.id, favorite);
    return favorite;
  }

  async removeFavorite(userId: string, eventId: string): Promise<void> {
    const favorite = Array.from(this.favorites.values()).find(
      f => f.userId === userId && f.eventId === eventId
    );
    if (favorite) {
      this.favorites.delete(favorite.id);
    }
  }

  // Newsletter
  async subscribeNewsletter(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const subscription: NewsletterSubscription = {
      ...insertSubscription,
      id: randomUUID(),
      subscribedAt: new Date(),
    };
    this.newsletterSubscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined> {
    return Array.from(this.newsletterSubscriptions.values()).find(sub => sub.email === email);
  }
}

export const storage = new MemStorage();
