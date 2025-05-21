import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionImages, setSectionImages] = useState({
    amethyst: "",
    roseQuartz: "",
    clearQuartz: "",
    citrine: "",
    selenite: "",
    fluorite: ""
  });
  const [uploadingSection, setUploadingSection] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication - in a real app, you'd want to use a secure method
    if (username === "admin" && password === "crystalsforkids") {
      setIsAuthenticated(true);
      toast({
        title: "Logged in successfully",
        description: "Welcome to the admin panel",
      });
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchContacts();
    }
  }, [isAuthenticated]);

  const handleImageUpload = async (sectionId: string, file: File) => {
    setUploadingSection(sectionId);
    
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
    formData.append('section', sectionId);
    
    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Update the state with the new image URL
      setSectionImages(prev => ({
        ...prev,
        [sectionId]: data.imageUrl
      }));
      
      toast({
        title: "Upload successful",
        description: `Image for ${sectionId} has been updated`,
      });
    } catch (error) {
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

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login | Crystals for Kids</title>
        </Helmet>
        <div className="container mx-auto py-16 px-4">
          <Card className="max-w-md mx-auto">
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
          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crystal Images Management</CardTitle>
                <CardDescription>
                  Upload and manage images for different crystal types in the Crystal Whispers section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Amethyst */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Amethyst</h3>
                    {sectionImages.amethyst && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.amethyst} 
                          alt="Amethyst" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="amethyst-upload">Upload New Image</Label>
                      <Input
                        id="amethyst-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('amethyst', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'amethyst'}
                      />
                    </div>
                    {uploadingSection === 'amethyst' && (
                      <p className="text-sm text-purple-600 mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  {/* Rose Quartz */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Rose Quartz</h3>
                    {sectionImages.roseQuartz && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.roseQuartz} 
                          alt="Rose Quartz" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="roseQuartz-upload">Upload New Image</Label>
                      <Input
                        id="roseQuartz-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('roseQuartz', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'roseQuartz'}
                      />
                    </div>
                    {uploadingSection === 'roseQuartz' && (
                      <p className="text-sm text-pink-600 mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  {/* Clear Quartz */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Clear Quartz</h3>
                    {sectionImages.clearQuartz && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.clearQuartz} 
                          alt="Clear Quartz" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="clearQuartz-upload">Upload New Image</Label>
                      <Input
                        id="clearQuartz-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('clearQuartz', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'clearQuartz'}
                      />
                    </div>
                    {uploadingSection === 'clearQuartz' && (
                      <p className="text-sm text-blue-600 mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  {/* Citrine */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Citrine</h3>
                    {sectionImages.citrine && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.citrine} 
                          alt="Citrine" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="citrine-upload">Upload New Image</Label>
                      <Input
                        id="citrine-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('citrine', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'citrine'}
                      />
                    </div>
                    {uploadingSection === 'citrine' && (
                      <p className="text-sm text-yellow-600 mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  {/* Selenite */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Selenite</h3>
                    {sectionImages.selenite && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.selenite} 
                          alt="Selenite" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="selenite-upload">Upload New Image</Label>
                      <Input
                        id="selenite-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('selenite', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'selenite'}
                      />
                    </div>
                    {uploadingSection === 'selenite' && (
                      <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                    )}
                  </div>
                  
                  {/* Fluorite */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Fluorite</h3>
                    {sectionImages.fluorite && (
                      <div className="aspect-square mb-3 rounded-md overflow-hidden">
                        <img 
                          src={sectionImages.fluorite} 
                          alt="Fluorite" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="mt-2">
                      <Label htmlFor="fluorite-upload">Upload New Image</Label>
                      <Input
                        id="fluorite-upload"
                        type="file"
                        accept="image/*"
                        className="mt-1"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload('fluorite', e.target.files[0]);
                          }
                        }}
                        disabled={uploadingSection === 'fluorite'}
                      />
                    </div>
                    {uploadingSection === 'fluorite' && (
                      <p className="text-sm text-green-600 mt-2">Uploading...</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    {contacts.map((contact: any) => (
                      <div 
                        key={contact.id} 
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{contact.name}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(contact.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-1">
                          {contact.email}
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subject: {contact.subject}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {contact.message}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}