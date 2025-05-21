import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { LockKeyhole, LogOut } from 'lucide-react';

// Simple admin credential check
// In a real app, you'd use proper authentication with the server
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'crystalsforkids';

export function AdminLoginToggle() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set admin status in localStorage and state
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setIsOpen(false);
      
      toast({
        title: "Admin mode active",
        description: "You can now edit images directly on the page.",
      });
      
      // Reload the page to apply admin mode changes
      window.location.reload();
    } else {
      toast({
        title: "Login failed",
        description: "Invalid username or password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    
    toast({
      title: "Logged out",
      description: "Admin mode deactivated.",
    });
    
    // Reload the page to apply changes
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isAdmin ? (
        <Button onClick={handleLogout} variant="destructive" size="sm">
          <LogOut className="h-4 w-4 mr-1" />
          Exit Admin Mode
        </Button>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <LockKeyhole className="h-4 w-4 mr-1" />
              Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Admin Login</DialogTitle>
              <DialogDescription>
                Enter your credentials to access admin features.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleLogin}>Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}