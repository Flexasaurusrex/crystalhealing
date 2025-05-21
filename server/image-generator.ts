import fetch from 'node-fetch';
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

const TOGETHER_API_URL = "https://api.together.xyz/v1/completions";

/**
 * Generate an image using Together.ai
 * @param prompt The text prompt for image generation
 * @param filename The filename to save the image as
 */
export async function generateCrystalImage(prompt: string, name: string): Promise<string> {
  try {
    // Make sure the directory exists
    const imagesDir = path.join(process.cwd(), 'public', 'crystal-images');
    if (!await existsAsync(imagesDir)) {
      await mkdirAsync(imagesDir, { recursive: true });
    }

    // Define an enhanced prompt for better quality images
    const enhancedPrompt = `Create a high-quality, photorealistic image of a ${name} crystal. The crystal should be placed on a soft, neutral background that highlights its natural beauty. Ensure the crystal is well-lit to showcase its translucent qualities and natural colors. The crystal should appear three-dimensional, capturing its facets and natural formation. Style: photorealistic, natural light, studio photography. Details: ${prompt}`;
    
    console.log(`Generating image for ${name} crystal...`);

    // Make the API request to Together.ai
    const response = await fetch(TOGETHER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`
      },
      body: JSON.stringify({
        model: "stabilityai/stable-diffusion-xl-base-1.0",
        prompt: enhancedPrompt,
        max_tokens: 4096,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error from Together API: ${response.status} ${errorText}`);
    }

    const data = await response.json() as any;
    
    // Process the image data - base64 encoded
    if (data.choices && data.choices[0] && data.choices[0].text) {
      // Create a unique filename
      const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      const filePath = path.join(imagesDir, filename);
      
      // Write the base64 data to a file
      const imageBuffer = Buffer.from(data.choices[0].text, 'base64');
      await writeFileAsync(filePath, imageBuffer);
      
      // Return the URL path for the frontend to use
      return `/crystal-images/${filename}`;
    } else {
      throw new Error('No image data returned from API');
    }
  } catch (error) {
    console.error('Error generating crystal image:', error);
    return ''; // Return empty string if there's an error
  }
}