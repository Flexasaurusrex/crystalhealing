import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Edit2, Loader2, CheckCircle, X } from 'lucide-react';

interface InPlaceImageEditorProps {
  currentImageUrl: string;
  altText: string;
  className?: string;
  onImageUpdated?: (newUrl: string) => void;
  sectionId?: string;
  subsectionId?: string;
}

export function InPlaceImageEditor({
  currentImageUrl,
  altText,
  className = "",
  onImageUpdated,
  sectionId,
  subsectionId
}: InPlaceImageEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(() => {
    // In a real app, you'd check authentication status
    // For now, we'll use a simple localStorage approach
    return localStorage.getItem('isAdmin') === 'true';
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      // Always add section info to the form data if available - this ensures persistence
      if (sectionId) {
        formData.append('sectionId', sectionId);
      }
      if (subsectionId) {
        formData.append('subsectionId', subsectionId);
      }
      
      // Use a consistent endpoint for all uploads
      const response = await fetch('/api/simple-upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      const imageUrl = data.url;
        
      if (imageUrl) {
        // Update the image URL in the component
        if (onImageUpdated) {
          onImageUpdated(imageUrl);
        }
        
        // Show success state
        setUploadSuccess(true);
        
        // Show a more specific toast message if we know which section was updated
        toast({
          title: "Image updated",
          description: sectionId 
            ? `The image for ${sectionId}${subsectionId ? '/' + subsectionId : ''} has been saved.`
            : "The image has been successfully updated.",
        });
        
        // Auto hide the editor after a brief success display
        setTimeout(() => {
          setIsEditing(false);
          setUploadSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // If not admin, just show the image
  if (!isAdmin) {
    return <img src={currentImageUrl} alt={altText} className={className} />;
  }

  return (
    <div className="group relative">
      <img 
        src={currentImageUrl} 
        alt={altText} 
        className={`${className} ${isEditing ? 'opacity-50' : ''}`}
      />
      
      {!isEditing && (
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800"
          onClick={() => setIsEditing(true)}
        >
          <Edit2 className="h-4 w-4 mr-1" />
          Edit
        </Button>
      )}
      
      {isEditing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 rounded-md">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
              <p className="mt-2 text-white font-medium">Uploading...</p>
            </div>
          ) : uploadSuccess ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="mt-2 text-white font-medium">Upload successful!</p>
            </div>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="mb-2"
              >
                Choose New Image
              </Button>
              <Button 
                variant="outline" 
                className="bg-white dark:bg-gray-800"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}