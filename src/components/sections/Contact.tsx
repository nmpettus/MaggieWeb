import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { sendContactForm } from "@/utils/api";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
    toast.error("Please enter your name!");
    return;
    }

    if (!email.trim()) {
    toast.error("Please enter your email address!");
    return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address!");
    return;
    }

    if (!subject.trim()) {
    toast.error("Please enter a subject!");
    return;
    }

    if (!message.trim()) {
    toast.error("Please enter your message!");
    return;
    }

    setIsSubmitting(true);

    try {
    const result = await sendContactForm({
    name,
    email,
    subject,
    message,
    });

    if (result.success) {
    toast.success("Message sent successfully!", {
    description: "We'll get back to you soon!",
    });

    setShowSuccess(true);

    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    } else {
    throw new Error(result.error || "Failed to send message");
    }
    } catch (error) {
    console.error("Error sending message:", error);
    toast.error("There was a problem sending your message. Please try again later.");
    } finally {
    setIsSubmitting(false);
    }
  };

  return (
    <>
    <Card className="transition-all duration-300 hover:shadow-lg">
    <CardHeader className="flex items-center bg-gradient-to-r from-green-100 to-blue-100">
    <div className="p-3 rounded-full bg-green-200 mb-4">
    <MessageSquare className="h-10 w-10 text-green-600" />
    </div>
    <CardTitle className="text-3xl font-['Comic_Neue'] text-center">Contact Us</CardTitle>
    <CardDescription className="text-lg text-center">
    Have a question or comment? We'd love to hear from you!
    </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
    <form onSubmit={handleSubmit} className="space-y-4">
    <div className="space-y-2">
    <Label htmlFor="name" className="text-lg">Your Name</Label>
    <Input
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter your name"
    required
    className="border-2 border-green-200 focus:border-green-400 text-lg"
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="email" className="text-lg">Email Address</Label>
    <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email address"
    required
    className="border-2 border-green-200 focus:border-green-400 text-lg"
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="subject" className="text-lg">Subject</Label>
    <Input
    id="subject"
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    placeholder="What's this about?"
    required
    className="border-2 border-green-200 focus:border-green-400 text-lg"
    />
    </div>

    <div className="space-y-2">
    <Label htmlFor="message" className="text-lg">Your Message</Label>
    <Textarea
    id="message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type your message here"
    required
    className="min-h-[120px] border-2 border-green-200 focus:border-green-400 text-lg"
    />
    </div>
    </form>
    </CardContent>
    <CardFooter className="flex justify-center pb-6 bg-gradient-to-r from-green-100 to-blue-100">
    <Button
    onClick={handleSubmit}
    disabled={isSubmitting}
    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-lg py-6"
    >
    <MessageSquare size={20} />
    {isSubmitting ? 'Sending message...' : 'Send Message'}
    </Button>
    </CardFooter>
    </Card>

    <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
    <DialogContent className="bg-green-50 border-green-200">
    <DialogHeader>
    <DialogTitle className="font-['Comic_Neue'] text-2xl text-green-800">Message Sent!</DialogTitle>
    <DialogDescription className="text-lg">
    Thanks for reaching out! We'll get back to you as soon as possible.
    </DialogDescription>
    </DialogHeader>
    <div className="flex justify-center py-4">
    <img
    src="/lovable-uploads/22798029-d558-453e-8673-fa3d5ec62840.png"
    alt="Maggie thanking you"
    className="w-1/2 rounded-lg shadow-md"
    />
    </div>
    <DialogFooter>
    <Button
    onClick={() => setShowSuccess(false)}
    className="bg-green-600 hover:bg-green-700 text-lg"
    >
    Close
    </Button>
    </DialogFooter>
    </DialogContent>
    </Dialog>
    </>
  );
};

export default Contact;
