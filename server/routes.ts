import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import crystalImageRoutes from './crystal-image-routes';
import adminRoutes from './admin-routes';
import crystalWhispersRoutes from './crystal-whispers-routes';
import directUploadRoutes from './direct-upload-routes';

export async function registerRoutes(app: Express): Promise<Server> {
  // Register crystal image generation routes
  app.use('/api', crystalImageRoutes);
  
  // Register admin routes
  app.use('/api', adminRoutes);
  
  // Register Crystal Whispers routes
  app.use('/api', crystalWhispersRoutes);
  
  // Register direct upload routes
  app.use('/api', directUploadRoutes);
  // Contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body using Zod schema
      const validatedData = contactFormSchema.parse(req.body);
      
      // Store the contact form submission
      const contact = await storage.createContact({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message
      });
      
      // Return the created contact
      res.status(201).json({
        message: "Contact form submitted successfully",
        data: contact
      });
    } catch (error) {
      if (error instanceof Error) {
        // Handle validation errors
        if (error.name === "ZodError") {
          const validationError = fromZodError(error as any);
          return res.status(400).json({
            message: "Validation error",
            errors: validationError.message
          });
        }
        
        // Handle other errors
        res.status(500).json({
          message: `Error processing contact form: ${error.message}`
        });
      } else {
        res.status(500).json({
          message: "An unknown error occurred"
        });
      }
    }
  });
  
  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req: Request, res: Response) => {
    try {
      const contacts = await storage.getContacts();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving contacts"
      });
    }
  });
  
  // Get a specific contact by ID (admin endpoint)
  app.get("/api/contacts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({
          message: "Invalid ID format"
        });
      }
      
      const contact = await storage.getContact(id);
      
      if (!contact) {
        return res.status(404).json({
          message: "Contact not found"
        });
      }
      
      res.status(200).json(contact);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving contact"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
