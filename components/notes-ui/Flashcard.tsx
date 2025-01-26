"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardProps {
  cards: Flashcard[];
}

type FlashcardResult = {
  cardIndex: number;
  timestamp: Date;
  status: "correct" | "incorrect";
};

const FlashcardComponent: React.FC<FlashcardProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<FlashcardResult[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem("flashcardResults");
    if (savedResults) {
      setResults(
        JSON.parse(savedResults, (key, value) => {
          if (key === "timestamp") return new Date(value);
          return value;
        })
      );
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("flashcardResults", JSON.stringify(results));
    }
  }, [results, loaded]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNavigation = (direction: "prev" | "next") => {
    setIsFlipped(false);
    setCurrentIndex((prev) => {
      const newIndex =
        direction === "next"
          ? Math.min(prev + 1, cards.length - 1)
          : Math.max(prev - 1, 0);
      return newIndex;
    });
  };

  const handleRetry = () => {
    setResults((prev) => prev.filter((r) => r.cardIndex !== currentIndex));
  };

  const recordResult = (status: "correct" | "incorrect") => {
    setResults((prev) => [
      ...prev.filter((r) => r.cardIndex !== currentIndex),
      {
        cardIndex: currentIndex,
        timestamp: new Date(),
        status,
      },
    ]);
  };

  const currentCard = cards[currentIndex];
  const cardResults = results.filter((r) => r.cardIndex === currentIndex);

  return (
    <div className="flex flex-col items-center gap-4 my-8">
      <div className="perspective-1000 w-full max-w-md">
        <Card
          className={cn(
            "w-full h-64 cursor-pointer relative preserve-3d",
            "transition-transform duration-300 ease-in-out",
            isFlipped ? "rotate-y-180" : ""
          )}
          onClick={handleFlip}
        >
          {/* Front Side */}
          <CardContent className="absolute w-full h-full flex items-center justify-center p-6 backface-hidden rotate-y-0 bg-card">
            <div className="text-xl text-center">{currentCard.front}</div>
          </CardContent>

          {/* Back Side */}
          <CardContent className="absolute w-full h-full flex items-center justify-center p-6 backface-hidden rotate-y-180 bg-card">
            <div className="text-xl text-center">{currentCard.back}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button
          variant="outline"
          onClick={() => handleNavigation("prev")}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={handleRetry}
          disabled={!cardResults.length}
        >
          Retry
        </Button>

        <Button
          variant="outline"
          onClick={() => handleNavigation("next")}
          disabled={currentIndex === cards.length - 1}
        >
          Next
        </Button>

        {isFlipped && (
          <div className="flex gap-2">
            <Button
              variant="default"
              onClick={() => recordResult("correct")}
              className="bg-green-600 hover:bg-green-700"
            >
              Mark Correct
            </Button>
            <Button
              variant="default"
              onClick={() => recordResult("incorrect")}
              className="bg-red-600 hover:bg-red-700"
            >
              Mark Incorrect
            </Button>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Card {currentIndex + 1} of {cards.length} • Correct:{" "}
        {results.filter((r) => r.status === "correct").length} • Incorrect:{" "}
        {results.filter((r) => r.status === "incorrect").length}
      </div>
    </div>
  );
};

export default FlashcardComponent;
