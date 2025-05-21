import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

// Fixed image mappings that won't change
const FIXED_MAPPINGS_FILE = path.join(process.cwd(), 'public', 'uploads', 'fixed', 'image-mapping.json');
const SECTION_IMAGES_FILE = path.join(process.cwd(), 'public', 'section-images.json');
const CRYSTAL_WHISPERS_FILE = path.join(process.cwd(), 'public', 'crystal-whispers-images.json');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const existsAsync = promisify(fs.exists);

export async function applyFixedImageMappings() {
  console.log('Applying permanent image mappings...');
  
  try {
    // Check if our fixed mappings exist
    if (!await existsAsync(FIXED_MAPPINGS_FILE)) {
      console.error('Fixed image mappings file not found');
      return;
    }
    
    // Read our fixed mappings
    const fixedMappingsData = await readFileAsync(FIXED_MAPPINGS_FILE, 'utf8');
    const fixedMappings = JSON.parse(fixedMappingsData);
    
    // Make sure section images file exists and read it
    let sectionImages: Record<string, any> = {};
    if (await existsAsync(SECTION_IMAGES_FILE)) {
      try {
        const data = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
        sectionImages = JSON.parse(data);
      } catch (err) {
        console.error('Error reading section images file, will recreate');
      }
    }
    
    // Apply fixed mappings
    if (fixedMappings.about && fixedMappings.about.image) {
      sectionImages.about = fixedMappings.about.image;
    }
    
    // Update gallery images
    if (fixedMappings.gallery) {
      if (!sectionImages.gallery) sectionImages.gallery = {};
      
      for (const [crystal, imageUrl] of Object.entries(fixedMappings.gallery)) {
        sectionImages.gallery[crystal] = imageUrl;
      }
    }
    
    // Write the updated section images
    await writeFileAsync(SECTION_IMAGES_FILE, JSON.stringify(sectionImages, null, 2));
    console.log('Successfully applied fixed image mappings');
    
    return true;
  } catch (err) {
    console.error('Error applying fixed image mappings:', err);
    return false;
  }
}

// Run immediately when imported
applyFixedImageMappings().catch(err => console.error('Failed to apply fixed image mappings:', err));
