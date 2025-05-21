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

// Update section image
export const updateSectionImage = async (section: string, subsection: string | null, imageUrl: string) => {
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
  console.log(`Successfully saved image for ${section}${subsection ? '/' + subsection : ''} to ${imageUrl}`);
  return sectionImages;
};