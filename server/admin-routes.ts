import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { storage } from './storage';

// Import our dedicated image storage module
import { createUploadDirIfNeeded, getSectionImages, updateSectionImage } from './image-storage';

const router = Router();

// Configure multer for file uploads
const storageConfig = multer.diskStorage({
  destination: async (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    try {
      const uploadDir = await createUploadDirIfNeeded();
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    // Create a unique filename
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storageConfig,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: Function) => {
    // Accept only images
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// Route to get all section images
router.get('/section-images', async (_req: Request, res: Response) => {
  try {
    const sectionImages = await getSectionImages();
    return res.json(sectionImages);
  } catch (error) {
    console.error('Error getting section images:', error);
    return res.status(500).json({ error: 'Failed to get section images' });
  }
});

// Route to handle image uploads
router.post('/upload-image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const section = req.body.section;
    const subsection = req.body.subsection || null;
    
    if (!section) {
      return res.status(400).json({ error: 'Section name is required' });
    }
    
    // Return the URL to the uploaded file
    const imageUrl = `/uploads/${file.filename}`;
    
    // Update section images
    const updatedSections = await updateSectionImage(section, subsection, imageUrl);
    
    // Return success response
    return res.json({ 
      success: true, 
      imageUrl,
      sections: updatedSections,
      message: `Image successfully uploaded for ${subsection ? `${section}/${subsection}` : section}`
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Get all contacts for admin view
router.get('/contacts', async (req: Request, res: Response) => {
  try {
    const contacts = await storage.getContacts();
    return res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

export default router;