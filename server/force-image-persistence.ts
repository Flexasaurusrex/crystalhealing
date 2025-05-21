import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

// Path to our image mapping files
const SECTION_IMAGES_FILE = path.join(process.cwd(), 'public', 'section-images.json');
const CRYSTAL_WHISPERS_FILE = path.join(process.cwd(), 'public', 'crystal-whispers-images.json');

/**
 * Force the creation of our image persistence files with actual image paths
 * to ensure uploads are properly tracked
 */
export async function forceInitImagePersistence() {
  console.log('Forcing image persistence system initialization...');
  
  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!await existsAsync(uploadDir)) {
    await mkdirAsync(uploadDir, { recursive: true });
    console.log('Created uploads directory:', uploadDir);
  }
  
  // Get a list of all existing images
  const uploadedFiles = await promisify(fs.readdir)(uploadDir);
  const imageFiles = uploadedFiles.filter(file => 
    file.endsWith('.jpg') || 
    file.endsWith('.jpeg') || 
    file.endsWith('.png') ||
    file.endsWith('.gif')
  );
  
  console.log(`Found ${imageFiles.length} existing image files`);
  
  // Create sample image references
  const defaultRecentUploads = imageFiles.slice(-10).map(file => `/uploads/${file}`);
  
  // Create section images tracking file
  try {
    let sectionImages: Record<string, any> = {};
    
    // If file exists, read it
    if (await existsAsync(SECTION_IMAGES_FILE)) {
      try {
        const data = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
        sectionImages = JSON.parse(data);
      } catch (err) {
        console.error('Error reading section images file, will recreate:', err);
      }
    }
    
    // Ensure all sections are defined as objects
    if (!sectionImages.gallery) sectionImages.gallery = {};
    if (!sectionImages.crystalWhispers) sectionImages.crystalWhispers = {};
    
    // Make sure all sections are initialized with images if available
    const sections = {
      hero: sectionImages.hero || (defaultRecentUploads[0] || ''),
      about: sectionImages.about || (defaultRecentUploads[1] || ''),
      mission: sectionImages.mission || (defaultRecentUploads[2] || ''),
      impact: sectionImages.impact || (defaultRecentUploads[3] || ''),
      crystalEducation: sectionImages.crystalEducation || (defaultRecentUploads[4] || ''),
      donate: sectionImages.donate || (defaultRecentUploads[5] || '')
    };
    
    // Handle gallery items - using empty defaults to allow fresh uploads
    const gallery = {
      amethyst: "",
      roseQuartz: "",
      clearQuartz: "",
      citrine: "",
      selenite: "",
      fluorite: ""
    };
    
    // Handle crystal whispers items
    const crystalWhispers = {
      main: sectionImages.crystalWhispers?.main || '',
      amethyst: sectionImages.crystalWhispers?.amethyst || '',
      roseQuartz: sectionImages.crystalWhispers?.roseQuartz || '',
      clearQuartz: sectionImages.crystalWhispers?.clearQuartz || '',
      citrine: sectionImages.crystalWhispers?.citrine || '',
      selenite: sectionImages.crystalWhispers?.selenite || '',
      fluorite: sectionImages.crystalWhispers?.fluorite || ''
    };
    
    // Create the final structure
    const finalSectionImages = {
      ...sections,
      gallery,
      crystalWhispers
    };
    
    // Write the file
    await writeFileAsync(SECTION_IMAGES_FILE, JSON.stringify(finalSectionImages, null, 2));
    console.log('Successfully initialized section-images.json with actual image data');
    
    // Also ensure crystal-whispers file exists
    if (!await existsAsync(CRYSTAL_WHISPERS_FILE)) {
      // Initialize with same data as the section images
      await writeFileAsync(CRYSTAL_WHISPERS_FILE, JSON.stringify(crystalWhispers, null, 2));
      console.log('Successfully initialized crystal-whispers-images.json');
    }
    
    return finalSectionImages;
  } catch (error) {
    console.error('Error initializing image persistence files:', error);
    throw error;
  }
}

/**
 * Save a section image update to our persistence file
 * @param section The section identifier (e.g., 'hero', 'about', etc.)
 * @param subsection Optional subsection (e.g., 'amethyst' in gallery)
 * @param imageUrl The URL of the image to save
 */
export async function saveImageUpdate(section: string, subsection: string | null, imageUrl: string): Promise<void> {
  try {
    // First make sure our system is initialized
    await forceInitImagePersistence();
    
    // Read the current section images
    const data = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
    const sectionImages = JSON.parse(data);
    
    // Update the appropriate section
    if (subsection) {
      if (!sectionImages[section]) {
        sectionImages[section] = {};
      }
      sectionImages[section][subsection] = imageUrl;
    } else {
      sectionImages[section] = imageUrl;
    }
    
    // Save the updated file
    await writeFileAsync(SECTION_IMAGES_FILE, JSON.stringify(sectionImages, null, 2));
    console.log(`Updated image for ${section}${subsection ? '/' + subsection : ''} to ${imageUrl}`);
    
    // Also update crystal-whispers file if needed
    if (section === 'crystalWhispers' && subsection) {
      updateCrystalWhispersFile(subsection, imageUrl);
    }
  } catch (err) {
    console.error('Error saving image update:', err);
    throw err;
  }
}

/**
 * Update the crystal whispers specific file
 */
async function updateCrystalWhispersFile(crystal: string, imageUrl: string): Promise<void> {
  try {
    if (await existsAsync(CRYSTAL_WHISPERS_FILE)) {
      const data = await readFileAsync(CRYSTAL_WHISPERS_FILE, 'utf8');
      const crystalImages = JSON.parse(data);
      
      crystalImages[crystal] = imageUrl;
      
      await writeFileAsync(CRYSTAL_WHISPERS_FILE, JSON.stringify(crystalImages, null, 2));
      console.log(`Updated crystal whispers image for ${crystal} to ${imageUrl}`);
    }
  } catch (err) {
    console.error('Error updating crystal whispers file:', err);
  }
}

// Initialize the system on module load
forceInitImagePersistence().catch(err => console.error('Failed to initialize image persistence system:', err));