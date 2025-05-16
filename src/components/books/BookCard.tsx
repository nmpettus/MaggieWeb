
import React from "react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  coverImage: string;
  title: string;
  languages: string[];
  description: string;
  reviewCount: number;
  amazonLink: string;
  bookId: string;
  onOpenReviews: (bookId: string, title: string) => void;
  onImageClick: (imageSrc: string) => void;
}

const BookCard = ({
  coverImage,
  title,
  languages,
  description,
  reviewCount,
  amazonLink,
  bookId,
  onOpenReviews,
  onImageClick,
}: BookCardProps) => {
  // Map language names to their respective badge colors
  const languageColors: Record<string, string> = {
    English: "bg-indigo-600",
    Spanish: "bg-amber-500",
    Italian: "bg-emerald-500",
  };

  // Convert "MAGGIE" to "Maggie" in the title
  const formattedTitle = title.replace(/MAGGIE/g, "Maggie");

  return (
    <Card className="overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
      <div className="p-3">
        <AspectRatio ratio={3/4}>
          <img 
            src={coverImage}
            alt={`${formattedTitle} Book Cover`}
            className="rounded-md object-contain w-full h-full cursor-pointer"
            onClick={() => onImageClick(coverImage)}
          />
        </AspectRatio>
      </div>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{formattedTitle}</h3>
        <div className="flex flex-wrap mb-4">
          {languages.map((language) => (
            <span 
              key={language}
              className={`${languageColors[language]} text-white text-xs px-2 py-1 rounded mr-2 mb-1`}
            >
              {language}
            </span>
          ))}
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <span className="text-gray-500 ml-2">({reviewCount} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <div className="flex w-full space-x-2">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex-1"
            onClick={() => window.open(amazonLink, "_blank")}
          >
            Amazon
          </Button>
          <Button 
            variant="outline" 
            className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white flex-1"
            onClick={() => onOpenReviews(bookId, formattedTitle)}
          >
            Reviews
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
