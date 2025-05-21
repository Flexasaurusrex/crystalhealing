import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { storage } from './storage';

const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const router = Router();

// Make sure the upload directory exists
const createUploadDirIfNeeded = async () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!await existsAsync(uploadDir)) {
    await mkdirAsync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

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

// Mapping file to track section images
const SECTION_IMAGES_FILE = path.join(process.cwd(), 'public', 'section-images.json');

// Initialize section images file if it doesn't exist
const initializeSectionImagesFile = async () => {
  try {
    await createUploadDirIfNeeded();
    
    if (!await existsAsync(SECTION_IMAGES_FILE)) {
      const defaultSections = {
        hero: '',
        about: '',
        mission: '',
        gallery: {
          amethyst: '',
          roseQuartz: '',
          clearQuartz: '',
          citrine: '',
          selenite: '',
          fluorite: ''
        },
        impact: '',
        crystalEducation: '',
        crystalWhispers: {
          main: '',
          amethyst: '',
          roseQuartz: '',
          clearQuartz: '',
          citrine: '',
          selenite: '',
          fluorite: ''
        },
        donate: ''
      };
      
      await writeFileAsync(SECTION_IMAGES_FILE, JSON.stringify(defaultSections, null, 2));
    }
  } catch (error) {
    console.error('Error initializing section images file:', error);
  }
};

// Get all section images
const getSectionImages = async () => {
  await initializeSectionImagesFile();
  
  try {
    const data = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading section images:', error);
    return {};
  }
};

// Update section image
const updateSectionImage = async (section: string, subsection: string | null, imageUrl: string) => {
  const sectionImages = await getSectionImages();
  
  if (subsection) {
    if (!sectionImages[section]) {
      sectionImages[section] = {};
    }
    sectionImages[section][subsection] = imageUrl;
  } else {
    sectionImages[section] = imageUrl;
  }
  
  await writeFileAsync(SECTION_IMAGES_FILE, JSON.stringify(sectionImages, null, 2));
  return sectionImages;
};

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