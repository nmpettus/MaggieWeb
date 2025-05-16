import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { subscribeToNewsletter } from "@/utils/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
    toast.error("Please enter an email address!");
    return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address!");
    return;
    }

    setIsSubmitting(true);

    try {
    const result = await subscribeToNewsletter({ email });

    if (result.success) {
    toast.success("Welcome to Maggie's Newsletter!", {
    description: "You'll receive updates about new books and events!",
    });

    setShowSuccess(true);
    setEmail("");
    } else {
    throw new Error(result.error || "Failed to subscribe to newsletter");
    }
    } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    toast.error("There was a problem subscribing to the newsletter. Please try again later.");
    } finally {
    setIsSubmitting(false);
    }
  };

  return (
    <>
    <Card className="transition-all duration-300 hover:shadow-lg">
    <CardHeader className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100">
    <div className="p-3 rounded-full bg-blue-200 mb-4">
    <Mail className="h-10 w-10 text-blue-600" />
    </div>
    <CardTitle className="text-3xl font-['Comic_Neue'] text-center">Join Maggie's Newsletter</CardTitle>
    <CardDescription className="text-lg text-center">
    Get updates about new books, events, and special surprises!
    </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
    <Label htmlFor="email" className="text-lg">Email Address</Label>
    <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email address"
    required
    className="border-2 border-blue-200 focus:border-blue-400 text-lg"
    />
    </div>
    </form>
    </CardContent>
    <CardFooter className="flex justify-center pb-6 bg-gradient-to-r from-blue-100 to-purple-100">
    <Button
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-lg py-6"
    >
    <Mail size={20} />
    {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
    </Button>
    </CardFooter>
    </Card>

    <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
    <DialogContent className="bg-blue-50 border-blue-200">
    <DialogHeader>
    <DialogTitle className="font-['Comic_Neue'] text-2xl text-blue-800">Welcome to Maggie's Newsletter!</DialogTitle>
    <DialogDescription className="text-lg">
    Thanks for subscribing! You'll receive updates about new books, events, and special surprises.
    </DialogDescription>
    </DialogHeader>
    <div className="flex justify-center py-4">
      <img 
        src="/lovable-uploads/22798029-d558-453e-8673-fa3d5ec62840.png"
        alt="Maggie welcoming you"
        className="w-1/2 rounded-lg shadow-md"
      />
    </div>
    <DialogFooter>
    <Button
    onClick={() => setShowSuccess(false)}
    className="bg-blue-600 hover:bg-blue-700 text-lg"
    >
    Close
    </Button>
    </DialogFooter>
    </DialogContent>
    </Dialog>
    </>
  );
};

export default Newsletter;