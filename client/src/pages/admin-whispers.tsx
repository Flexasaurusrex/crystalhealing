import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Image, Upload, CheckCircle2, ImageIcon, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

interface CrystalImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function AdminWhispersPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploadingSection, setUploadingSection] = useState("");
  const { toast } = useToast();
  const [crystalImages, setCrystalImages] = useState<{[key: string]: string}>({
    main: "",
    amethyst: "",
    roseQuartz: "",
    clearQuartz: "",
    citrine: "",
    selenite: "",
    fluorite: "",
  });

  // Crystal Whispers section - all the crystals
  const crystalTypes = [
    { id: 'main', title: 'Main Banner', description: 'Main Crystal Whispers section banner' },
    { id: 'amethyst', title: 'Amethyst', description: 'Amethyst crystal image for Whispers' },
    { id: 'roseQuartz', title: 'Rose Quartz', description: 'Rose Quartz crystal for Whispers' },
    { id: 'clearQuartz', title: 'Clear Quartz', description: 'Clear Quartz crystal for Whispers' },
    { id: 'citrine', title: 'Citrine', description: 'Citrine crystal for Whispers' },
    { id: 'selenite', title: 'Selenite', description: 'Selenite crystal for Whispers' },
    { id: 'fluorite', title: 'Fluorite', description: 'Fluorite crystal for Whispers' },
  ];

  // Fetch crystal image data
  const fetchCrystalImages = async () => {
    try {
      const response = await fetch("/api/crystal-whispers-images");
      if (response.ok) {
        const data = await response.json();
        setCrystalImages(data);
      }
    } catch (error) {
      console.error("Error fetching crystal images:", error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in a real app, you'd want to use a secure method
    if (username === "admin" && password === "crystalsforkids") {
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the Crystal Whispers admin panel",
      });
      // Fetch data after login
      fetchCrystalImages();
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  // Open image preview dialog
  const handlePreviewImage = (url: string, title: string) => {
    setPreviewImage(url);
    setPreviewTitle(title);
  };

  // Format section name for display
  const formatName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  };

  // Handle direct crystal image uploads
  const handleImageUpload = async (crystalId: string, file: File) => {
    if (!file) return;
    
    setUploadingSection(crystalId);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
    formData.append('crystal', crystalId);
    
    try {
      const response = await fetch('/api/upload-crystal-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }
      
      // Safely parse the JSON response
      let data;
      try {
        const text = await response.text();
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Error parsing server response");
      }
      
      // Update the state with the new image URL
      if (data.imageUrl) {
        setCrystalImages(prev => ({
          ...prev,
          [crystalId]: data.imageUrl
        }));
      }
        
      toast({
        title: "Upload successful",
        description: `Image for ${formatName(crystalId)} has been updated`,
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
    id, 
    title, 
    description, 
    currentImage = "" 
  }: { 
    id: string; 
    title: string; 
    description: string; 
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
            <Label htmlFor={`${id}-upload`} className="text-xs">
              {currentImage ? 'Replace Image' : 'Upload New Image'}
            </Label>
            <Input
              id={`${id}-upload`}
              type="file"
              accept="image/*"
              className="mt-1 text-xs"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageUpload(id, e.target.files[0]);
                }
              }}
              disabled={uploadingSection === id}
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
        {uploadingSection === id && (
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
          <DialogDescription>Crystal Whispers image preview</DialogDescription>
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
          <title>Crystal Whispers Admin | Crystals for Kids</title>
        </Helmet>
        <div className="container mx-auto py-16 px-4">
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle>Crystal Whispers Admin</CardTitle>
              <CardDescription>
                Log in to manage Crystal Whispers images
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

  return (
    <>
      <Helmet>
        <title>Crystal Whispers Admin | Crystals for Kids</title>
      </Helmet>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Crystal Whispers Admin</h1>
          </div>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
            Log Out
          </Button>
        </div>

        <div className="space-y-8">
          {/* Crystal Images Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Crystal Whispers Images</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Upload and manage images for each crystal in the Crystal Whispers interactive section
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crystalTypes.map(crystal => (
                <ImageUploadCard 
                  key={crystal.id}
                  id={crystal.id}
                  title={crystal.title} 
                  description={crystal.description}
                  currentImage={crystalImages[crystal.id]}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Image Preview Dialog */}
        <ImagePreviewDialog />
      </div>
    </>
  );
}