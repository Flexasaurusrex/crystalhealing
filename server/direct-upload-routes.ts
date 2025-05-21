import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const router = Router();
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

// Make sure uploads directory exists
const ensureUploadsDir = async () => {
  const dir = path.join(process.cwd(), 'public', 'uploads');
  if (!await exists(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
};

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    try {
      const dir = await ensureUploadsDir();
      cb(null, dir);
    } catch (err) {
      cb(err as Error, '');
    }
  },
  filename: (_req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  }
});

// Create the multer instance
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Simple file upload endpoint with section tracking
router.post('/simple-upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Get the file URL
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Check if we have section/subsection info - if so, save to section images
    const sectionId = req.body.sectionId;
    const subsectionId = req.body.subsectionId;
    
    if (sectionId) {
      try {
        // Import the section image update function from our dedicated module
        const { updateSectionImage } = require('./image-storage');
        
        // Update the section image data
        await updateSectionImage(sectionId, subsectionId || null, fileUrl);
        console.log(`Updated image for ${sectionId}${subsectionId ? '/' + subsectionId : ''}`);
      } catch (err) {
        console.error('Error updating section image data:', err);
        // Continue anyway, so at least the upload works
      }
    }
    
    return res.status(200).json({ 
      url: fileUrl,
      success: true,
      sectionUpdated: !!sectionId
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;