import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { storage } from './storage';

const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);

const router = Router();

// Configure multer for file uploads
const storageConfig = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Make sure the directory exists
    if (!await existsAsync(uploadDir)) {
      await mkdirAsync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
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
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// Route to handle image uploads
router.post('/upload-image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const section = req.body.section;
    if (!section) {
      return res.status(400).json({ error: 'Section name is required' });
    }
    
    // Return the URL to the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`;
    
    // Return success response
    return res.json({ 
      success: true, 
      imageUrl,
      message: `Image successfully uploaded for ${section}`
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