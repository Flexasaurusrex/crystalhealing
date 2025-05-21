import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Image, Upload, CheckCircle2, ImageIcon } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Link } from 'wouter';

// Type definitions for section images
interface SectionImageData {
  // Main sections
  hero?: string;
  about?: string;
  mission?: string;
  impact?: string;
  donate?: string;
  crystalEducation?: string;
  
  // Gallery crystals
  amethyst: string;
  roseQuartz: string;
  clearQuartz: string;
  citrine: string;
  selenite: string;
  fluorite: string;
  
  // For dynamic access
  [key: string]: string | undefined;
}

// Type for contact submissions
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  
  // Expanded section images state to include all sections
  const [sectionImages, setSectionImages] = useState<SectionImageData>({
    // Main sections
    hero: "",
    about: "",
    mission: "",
    impact: "",
    donate: "",
    crystalEducation: "",
    crystalWhispers: "",
    
    // Gallery crystals
    amethyst: "",
    roseQuartz: "",
    clearQuartz: "",
    citrine: "",
    selenite: "",
    fluorite: ""
  });
  
  const [uploadingSection, setUploadingSection] = useState("");
  const { toast } = useToast();

  // Fetch section images on initial load
  const fetchSectionImages = async () => {
    try {
      const response = await fetch("/api/section-images");
      if (response.ok) {
        const data = await response.json();
        setSectionImages(prev => ({
          ...prev,
          ...data,
          // Handle nested gallery structure
          ...(data.gallery ? Object.keys(data.gallery).reduce((acc, key) => {
            acc[key] = data.gallery[key];
            return acc;
          }, {} as Record<string, string>) : {})
        }));
      }
    } catch (error) {
      console.error("Error fetching section images:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in a real app, you'd want to use a secure method
    if (username === "admin" && password === "crystalsforkids") {
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin panel",
      });
      // Fetch data after successful login
      fetchContacts();
      fetchSectionImages();
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/contacts");
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Error",
        description: "Failed to load contact submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Open image preview dialog
  const handlePreviewImage = (url: string, title: string) => {
    setPreviewImage(url);
    setPreviewTitle(title);
  };

  // Format section name for display
  const formatSectionName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  };

  const handleImageUpload = async (sectionId: string, file: File, isGalleryItem = false) => {
    if (!file) return;
    
    setUploadingSection(sectionId);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
    
    // Handle the special case for crystal whispers section
    if (sectionId.startsWith('crystalWhispers.')) {
      const parts = sectionId.split('.');
      formData.append('section', 'crystalWhispers');
      formData.append('subsection', parts[1]);
    } else if (isGalleryItem) {
      formData.append('section', 'gallery');
      formData.append('subsection', sectionId);
    } else {
      formData.append('section', sectionId);
    }
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }
      
      let data;
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Failed to parse response: ${text.substring(0, 100)}`);
      }
      
      // Update the state with the new image URL
      if (data.sections) {
        // If API returns full sections data
        setSectionImages(prev => ({
          ...prev,
          ...data.sections,
          // Handle nested gallery structure
          ...(data.sections.gallery ? Object.keys(data.sections.gallery).reduce((acc, key) => {
            acc[key] = data.sections.gallery[key];
            return acc;
          }, {} as Record<string, string>) : {}),
          // Handle nested crystal whispers structure
          ...(data.sections.crystalWhispers ? { crystalWhispers: data.sections.crystalWhispers } : {})
        }));
      } else if (data.imageUrl) {
        // Fall back to old behavior
        if (sectionId.startsWith('crystalWhispers.')) {
          const parts = sectionId.split('.');
          setSectionImages(prev => ({
            ...prev,
            crystalWhispers: {
              ...prev.crystalWhispers,
              [parts[1]]: data.imageUrl
            }
          }));
        } else {
          setSectionImages(prev => ({
            ...prev,
            [sectionId]: data.imageUrl
          }));
        }
      }
      
      const displayName = sectionId.startsWith('crystalWhispers.') 
        ? `${formatSectionName('crystalWhispers')} - ${formatSectionName(sectionId.split('.')[1])}`
        : formatSectionName(sectionId);
        
      toast({
        title: "Upload successful",
        description: `Image for ${displayName} has been updated`,
      });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Something went wrong while uploading the image",
        variant: "destructive",
      });
    } finally {
      setUploadingSection("");
    }
  };

  // Image upload card component
  const ImageUploadCard = ({ 
    title, 
    description, 
    sectionId, 
    isGalleryItem = false,
    currentImage = "" 
  }: { 
    title: string; 
    description: string; 
    sectionId: string; 
    isGalleryItem?: boolean;
    currentImage?: string;
  }) => {
    return (
      <Card className="h-full shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <span>{title}</span>
            {currentImage && (
              <Button 
                variant="ghost" 
                size="sm"
                className="p-0 h-8 w-8"
                onClick={() => handlePreviewImage(currentImage, title)}
              >
                <Image className="h-4 w-4" />
              </Button>
            )}
          </CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          {currentImage ? (
            <div 
              className="relative w-full h-40 overflow-hidden rounded-md cursor-pointer mb-3"
              onClick={() => handlePreviewImage(currentImage, title)}
            >
              <img 
                src={currentImage} 
                alt={title}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-800 rounded-md mb-3">
              <div className="text-center">
                <ImageIcon className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">No image uploaded</p>
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor={`${sectionId}-upload`} className="text-xs">
              {currentImage ? 'Replace Image' : 'Upload New Image'}
            </Label>
            <Input
              id={`${sectionId}-upload`}
              type="file"
              accept="image/*"
              className="mt-1 text-xs"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(sectionId, e.target.files[0], isGalleryItem);
                }
              }}
              disabled={uploadingSection === sectionId}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 p-2 text-xs flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-400">
            {currentImage ? 'Image uploaded' : 'No image'}
          </span>
          {currentImage && <CheckCircle2 className="h-3 w-3 text-green-500" />}
        </CardFooter>
        
        {/* Loading overlay */}
        {uploadingSection === sectionId && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <Upload className="mx-auto h-8 w-8 animate-bounce" />
              <p className="mt-2 font-medium">Uploading...</p>
            </div>
          </div>
        )}
      </Card>
    );
  };

  // Image preview dialog
  const ImagePreviewDialog = () => (
    <Dialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{previewTitle}</DialogTitle>
          <DialogDescription>Current image preview</DialogDescription>
        </DialogHeader>
        {previewImage && (
          <div className="relative w-full overflow-hidden rounded-md">
            <img 
              src={previewImage} 
              alt={previewTitle}
              className="object-contain max-h-[70vh] w-full"
            />
          </div>
        )}
        <DialogFooter>
          <Button onClick={() => setPreviewImage(null)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Crystals for Kids</title>
        </Helmet>
        <div className="container mx-auto py-16 px-4">
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Log in to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Log In</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  // Define section groups for better organization
  const mainSections = [
    { id: 'hero', title: 'Hero Section', description: 'Main banner image' },
    { id: 'about', title: 'About Section', description: 'Image for about section' },
    { id: 'mission', title: 'Mission Section', description: 'Image for mission statement' },
    { id: 'impact', title: 'Impact Section', description: 'Image for impact metrics' },
    { id: 'crystalEducation', title: 'Crystal Education', description: 'Crystal education section image' },
    { id: 'donate', title: 'Donate Section', description: 'Image for donation form area' },
  ];
  
  // Crystal Whispers section - special handling for this section
  const crystalWhispersImages = [
    { id: 'main', title: 'Main Banner', description: 'Main Crystal Whispers section image' },
    { id: 'amethyst', title: 'Amethyst', description: 'Amethyst crystal image for Whispers' },
    { id: 'roseQuartz', title: 'Rose Quartz', description: 'Rose Quartz whispers image' },
    { id: 'clearQuartz', title: 'Clear Quartz', description: 'Clear Quartz whispers image' },
    { id: 'citrine', title: 'Citrine', description: 'Citrine whispers image' },
    { id: 'selenite', title: 'Selenite', description: 'Selenite whispers image' },
    { id: 'fluorite', title: 'Fluorite', description: 'Fluorite whispers image' },
  ];

  const crystalGallery = [
    { id: 'amethyst', title: 'Amethyst', description: 'Amethyst crystal image' },
    { id: 'roseQuartz', title: 'Rose Quartz', description: 'Rose Quartz crystal image' },
    { id: 'clearQuartz', title: 'Clear Quartz', description: 'Clear Quartz crystal image' },
    { id: 'citrine', title: 'Citrine', description: 'Citrine crystal image' },
    { id: 'selenite', title: 'Selenite', description: 'Selenite crystal image' },
    { id: 'fluorite', title: 'Fluorite', description: 'Fluorite crystal image' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Panel | Crystals for Kids</title>
      </Helmet>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Log Out
          </Button>
        </div>

        <Tabs defaultValue="images">
          <TabsList className="mb-4">
            <TabsTrigger value="images">Image Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Form Submissions</TabsTrigger>
          </TabsList>
          
          {/* Images Tab */}
          <TabsContent value="images" className="space-y-8">
            {/* Main Section Images */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Page Section Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mainSections.map(section => (
                  <ImageUploadCard 
                    key={section.id}
                    title={section.title} 
                    description={section.description}
                    sectionId={section.id}
                    currentImage={sectionImages[section.id]}
                  />
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            {/* Crystal Whispers Section - Link to dedicated page */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Crystal Whispers Section</h2>
                <Link href="/admin/crystal-whispers">
                  <Button variant="default">
                    Manage Crystal Whispers Images
                  </Button>
                </Link>
              </div>
              <Card className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Dedicated Management Interface</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    We've created a dedicated section for managing the Crystal Whispers images to make
                    it easier to upload and manage images for each crystal type.
                  </p>
                  <Link href="/admin/crystal-whispers">
                    <Button size="lg" className="mt-2">
                      Go to Crystal Whispers Admin
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            
            <Separator className="my-6" />
            
            {/* Crystal Gallery Images */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Crystal Gallery Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crystalGallery.map(crystal => (
                  <ImageUploadCard 
                    key={crystal.id}
                    title={crystal.title} 
                    description={crystal.description}
                    sectionId={crystal.id}
                    isGalleryItem={true}
                    currentImage={sectionImages[crystal.id]}
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Contact Submissions Tab */}
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>
                  View all submissions from the contact form
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700"></div>
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No contact form submissions yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div 
                        key={contact.id} 
                        className="p-4 border rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</p>
                            <p className="font-medium">{contact.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</p>
                            <p className="font-medium">{contact.email}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Message:</p>
                            <p className="whitespace-pre-line bg-gray-50 dark:bg-gray-900 p-2 rounded-md">{contact.message}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date:</p>
                            <p className="text-sm">{new Date(contact.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Image Preview Dialog */}
        <ImagePreviewDialog />
      </div>
    </>
  );
}