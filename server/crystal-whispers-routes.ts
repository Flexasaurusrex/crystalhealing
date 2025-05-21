import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const router = Router();

// Make sure the upload directory exists
const createUploadDirIfNeeded = async () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'crystal-whispers');
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
  filename: (req: any, file: Express.Multer.File, cb: Function) => {
    // Create a filename based on the crystal type
    const crystalType = req.body && req.body.crystal ? req.body.crystal : 'unknown';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${crystalType}-${uniqueSuffix}${ext}`);
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

// File to store Crystal Whispers images data
const CRYSTAL_WHISPERS_FILE = path.join(process.cwd(), 'public', 'crystal-whispers-images.json');

// Initialize Crystal Whispers images file if it doesn't exist
const initializeCrystalWhispersFile = async () => {
  try {
    await createUploadDirIfNeeded();
    
    if (!await existsAsync(CRYSTAL_WHISPERS_FILE)) {
      const defaultImages = {
        main: '',
        amethyst: '',
        roseQuartz: '',
        clearQuartz: '',
        citrine: '',
        selenite: '',
        fluorite: ''
      };
      
      await writeFileAsync(CRYSTAL_WHISPERS_FILE, JSON.stringify(defaultImages, null, 2));
    }
  } catch (error) {
    console.error('Error initializing Crystal Whispers images file:', error);
  }
};

// Get all Crystal Whispers images
const getCrystalWhispersImages = async () => {
  await initializeCrystalWhispersFile();
  
  try {
    const data = await readFileAsync(CRYSTAL_WHISPERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading Crystal Whispers images:', error);
    return {};
  }
};

// Update Crystal Whispers image
const updateCrystalWhispersImage = async (crystalType: string, imageUrl: string) => {
  const images = await getCrystalWhispersImages();
  
  images[crystalType] = imageUrl;
  
  await writeFileAsync(CRYSTAL_WHISPERS_FILE, JSON.stringify(images, null, 2));
  return images;
};

// Route to get all Crystal Whispers images
router.get('/crystal-whispers-images', async (_req: Request, res: Response) => {
  try {
    const images = await getCrystalWhispersImages();
    return res.json(images);
  } catch (error) {
    console.error('Error getting Crystal Whispers images:', error);
    return res.status(500).json({ error: 'Failed to get Crystal Whispers images' });
  }
});

// Route to handle Crystal Whispers image uploads
router.post('/upload-crystal-image', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const crystalType = req.body.crystal;
    if (!crystalType) {
      return res.status(400).json({ error: 'Crystal type is required' });
    }
    
    // Return the URL to the uploaded file
    const imageUrl = `/uploads/crystal-whispers/${file.filename}`;
    
    // Update Crystal Whispers images
    const updatedImages = await updateCrystalWhispersImage(crystalType, imageUrl);
    
    // Return success response
    return res.json({ 
      success: true, 
      imageUrl,
      images: updatedImages,
      message: `Image successfully uploaded for ${crystalType} crystal`
    });
  } catch (error) {
    console.error('Error uploading crystal image:', error);
    return res.status(500).json({ error: 'Failed to upload crystal image' });
  }
});

export default router;