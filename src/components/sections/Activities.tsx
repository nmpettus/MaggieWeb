import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Puzzle, BookText, PenSquare } from "lucide-react";
import LetterToMaggie from "@/components/activities/LetterToMaggie";

const Activities = () => {
  const activities = [
    {
      title: "Bible Story Mazes",
      description: "Navigate through exciting mazes based on favorite Bible stories",
      icon: <Puzzle className="h-10 w-10 text-indigo-600" />,
      downloadText: "Download Mazes"
    },
    {
      title: "Coloring Pages",
      description: "Beautiful illustrations from Bible stories to color and enjoy",
      icon: <PenSquare className="h-10 w-10 text-amber-500" />,
      downloadText: "Download Pages"
    },
    {
      title: "Fun Puzzles",
      description: "Word searches, crosswords, and more based on Biblical themes",
      icon: <Puzzle className="h-10 w-10 text-emerald-500" />,
      downloadText: "Download Puzzles"
    },
    {
      title: "Bible Facts Cards",
      description: "Interesting and educational facts about Bible stories and characters",
      icon: <BookText className="h-10 w-10 text-purple-600" />,
      downloadText: "Download Cards"
    }
  ];

  return (
    <section id="activities" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-4 text-gray-800 font-['Comic_Neue']">Activities for All</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our collection of free printable activities designed to make learning about Bible stories fun and interactive for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex items-center">
                <div className="p-3 rounded-full bg-gray-100 mb-4">
                  {activity.icon}
                </div>
                <CardTitle className="text-xl font-['Comic_Neue'] text-center">{activity.title}</CardTitle>
                <CardDescription className="text-center">{activity.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-32 bg-gray-200 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500 text-sm">Preview Image</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button className="w-full flex items-center justify-center gap-2">
                  <Download size={16} />
                  {activity.downloadText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <div className="max-w-md mx-auto">
            <LetterToMaggie />
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            New activities are added regularly. Join our newsletter to be notified when we publish new content!
          </p>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Newsletter
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Activities;
