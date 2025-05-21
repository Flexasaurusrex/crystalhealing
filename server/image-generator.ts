import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);

// Ensure the API key is available
if (!process.env.TOGETHER_API_KEY) {
  console.error("TOGETHER_API_KEY environment variable is not set");
}

/**
 * Generate an image using Together.ai
 * @param prompt The text prompt for image generation
 * @param name The name of the crystal
 */
export async function generateCrystalImage(prompt: string, name: string): Promise<string> {
  try {
    // Make sure the directory exists
    const imagesDir = path.join(process.cwd(), 'public', 'crystal-images');
    if (!await existsAsync(imagesDir)) {
      await mkdirAsync(imagesDir, { recursive: true });
    }

    // Define an enhanced prompt for better quality images
    const enhancedPrompt = `High quality professional photograph of a ${name} crystal, detailed crystal structure, studio lighting, on a black background, dramatic lighting, cinematic, product photography, crystal healing, mineral specimen, gemstone, 8k, hyperrealistic. Details: ${prompt}`;
    
    console.log(`Generating image for ${name} crystal using Together.ai...`);

    // Make the API request to Together.ai
    const response = await axios({
      method: 'post',
      url: 'https://api.together.xyz/v1/images/generations',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`
      },
      data: {
        model: 'togethercomputer/redshift-xl',
        prompt: enhancedPrompt,
        width: 512,
        height: 512,
        n: 1
      }
    });

    // Process the image data
    if (response.data && response.data.data && response.data.data.length > 0) {
      const imageBase64 = response.data.data[0].base64;
      
      // Create a unique filename
      const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      const filePath = path.join(imagesDir, filename);
      
      // Write the base64 data to a file
      const imageBuffer = Buffer.from(imageBase64, 'base64');
      await writeFileAsync(filePath, imageBuffer);
      
      // Return the URL path for the frontend to use
      return `/crystal-images/${filename}`;
    } else {
      throw new Error('No image data returned from API');
    }
  } catch (error) {
    console.error('Error generating crystal image:', error);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    return ''; // Return empty string if there's an error
  }
}