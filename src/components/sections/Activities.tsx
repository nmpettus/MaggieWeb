@@ .. @@
 import React from "react";
 import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Download, Puzzle, BookText, PenSquare } from "lucide-react";
-import LetterToMaggie from "@/components/activities/LetterToMaggie";
 
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