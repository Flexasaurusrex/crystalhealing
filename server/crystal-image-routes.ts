import { Router, Request, Response } from 'express';
import { generateCrystalImage } from './image-generator';
import { crystalImagePlaceholders } from './placeholder-images';

const router = Router();

// Route to generate crystal images
router.post('/generate-crystal-image', async (req: Request, res: Response) => {
  try {
    const { prompt, name } = req.body;
    
    if (!prompt || !name) {
      return res.status(400).json({ error: 'Prompt and crystal name are required' });
    }
    
    // First check if we have a matching placeholder image
    if (crystalImagePlaceholders[name]) {
      return res.json({ imagePath: crystalImagePlaceholders[name] });
    }
    
    // If no placeholder, try to generate the image
    const imagePath = await generateCrystalImage(prompt, name);
    
    if (!imagePath) {
      return res.status(500).json({ error: 'Failed to generate image' });
    }
    
    // Return the image path to the client
    return res.json({ imagePath });
  } catch (error) {
    console.error('Error in image generation route:', error);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
});

export default router;