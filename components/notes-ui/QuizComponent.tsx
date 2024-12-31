"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { width, height } = useWindowSize();
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const correct = selectedOption === currentQuestion.correctIndex;
      setIsCorrect(correct);
      setIsAnswered(true);
      if (correct) {
        setScore(score + 1);
        setShowConfetti(true);
      }
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const progressBarWidth =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const getResultColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage < 33) return "text-red-500";
    if (percentage < 80) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={150}
          recycle={false}
        />
      )}
      {showResult ? (
        <Card className="w-full max-w-md shadow-lg font-wotfard">
          <CardHeader>
            <CardTitle className="text-center">Quiz Result</CardTitle>
          </CardHeader>
          <CardContent className="text-left space-y-4">
            <p className={`text-xl mt-0`}>
              Correct: <span className={`text-green-500`}>{score}</span>
            </p>
            <p className={`text-xl`}>
              Wrong:{" "}
              <span className={`text-red-500`}>{questions.length - score}</span>
            </p>
            <p className={`text-xl`}>Total Questions: {questions.length}</p>
            <p className={`text-xl`}>
              You got:{" "}
              <span className={`${getResultColor()}`}>
                {((score / questions.length) * 100).toFixed(2)} %
              </span>
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardDescription className="text-center font-wotfard font-bold">
              <span className="font-gilroy">Question number</span>
              <br />
              {currentQuestionIndex + 1}{" "}
              <span className="font-normal">out of</span> {questions.length}
            </CardDescription>
            <CardTitle className="text-center font-gilroy">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <div className="bg-gray-800 h-1 overflow-hidden my-4 rounded-s-2xl mx-2">
            <div
              className="bg-gradient-to-r from-lime-500 via-teal-500 to-sky-500 gradient-animation h-full transition-all"
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          </div>
          <CardContent>
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={cn(
                    "w-full py-2 px-4 transition-transform text-black rounded-full font-gilroy",
                    selectedOption === index && !isAnswered
                      ? "bg-blue-600 dark:text-white text-black ring-2 ring-[#2C0B8E] dark:ring-[#aa2fe7]"
                      : "",
                    isAnswered
                      ? index === currentQuestion.correctIndex
                        ? "dark:bg-green-600 bg-green-400 text-black dark:text-white"
                        : selectedOption === index
                        ? "dark:bg-red-600 bg-red-400 text-black dark:text-white"
                        : "dark:bg-gray-700 text-white dark:text-white"
                      : "bg-[#F0F0F0] dark:bg-[#01050E] dark:hover:bg-[#aa2fe7] dark:text-white text-black hover:bg-[#dddddd]"
                  )}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="mt-6">
              {!isAnswered ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full rounded-full dark:bg-[#aa2fe7] dark:text-black bg-[#2C0B8E] text-white font-gilroy"
                >
                  Submit
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-center">
                    {isCorrect
                      ? "Correct! Great job."
                      : `Incorrect! The correct answer is: ${
                          currentQuestion.options[currentQuestion.correctIndex]
                        }`}
                  </p>
                  <Button
                    onClick={handleNext}
                    className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    {currentQuestionIndex === questions.length - 1
                      ? "Finish"
                      : "Next"}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Quiz;
