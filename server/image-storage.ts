import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);
const mkdirAsync = promisify(fs.mkdir);

// Mapping file to track section images
const SECTION_IMAGES_FILE = path.join(process.cwd(), 'public', 'section-images.json');

// Make sure the upload directory exists
export const createUploadDirIfNeeded = async () => {
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!await existsAsync(uploadDir)) {
    await mkdirAsync(uploadDir, { recursive: true });
  }
  return uploadDir;
};

// Initialize section images file if it doesn't exist
export const initializeSectionImagesFile = async () => {
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
export const getSectionImages = async () => {
  await initializeSectionImagesFile();
  
  try {
    const data = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading section images:', error);
    return {};
  }
};

// Update section image with stronger persistence
export const updateSectionImage = async (section: string, subsection: string | null, imageUrl: string) => {
  try {
    // Get the latest images directly from file
    let sectionImages = {};
    if (await existsAsync(SECTION_IMAGES_FILE)) {
      const rawData = await readFileAsync(SECTION_IMAGES_FILE, 'utf8');
      sectionImages = JSON.parse(rawData);
    } else {
      // Create default structure if file doesn't exist
      sectionImages = await getSectionImages();
    }
    
    // Update the image URL
    if (subsection) {
      if (!sectionImages[section]) {
        sectionImages[section] = {};
      }
      sectionImages[section][subsection] = imageUrl;
    } else {
      sectionImages[section] = imageUrl;
    }
    
    // Write changes immediately with sync to ensure persistence
    fs.writeFileSync(SECTION_IMAGES_FILE, JSON.stringify(sectionImages, null, 2));
    
    // Double-check that file was correctly written by reading it back
    const verifyData = fs.readFileSync(SECTION_IMAGES_FILE, 'utf8');
    const verifiedImages = JSON.parse(verifyData);
    
    // Verify specific image was saved
    let savedCorrectly = false;
    if (subsection) {
      savedCorrectly = verifiedImages[section]?.[subsection] === imageUrl;
    } else {
      savedCorrectly = verifiedImages[section] === imageUrl;
    }
    
    if (savedCorrectly) {
      console.log(`CONFIRMED: Image for ${section}${subsection ? '/' + subsection : ''} saved to ${imageUrl}`);
    } else {
      console.error(`FAILED: Image for ${section}${subsection ? '/' + subsection : ''} was not saved correctly`);
    }
    
    // Also save to a backup file for extra protection
    const backupFile = SECTION_IMAGES_FILE + '.backup';
    fs.writeFileSync(backupFile, JSON.stringify(sectionImages, null, 2));
    
    return sectionImages;
  } catch (error) {
    console.error('ERROR saving image:', error);
    throw error;
  }
};