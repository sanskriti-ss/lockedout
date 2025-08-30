import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ravenQuestions, RavenQuestion } from "./questions";

const RavenMatricesPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questions = ravenQuestions;
  const current = questions[step];

  const handleAnswer = (idx: number) => {
    if (current.answer === idx) {
      setScore((s) => s + 1);
      setFeedback("Correct!");
    } else {
      setFeedback("Incorrect");
    }
    setTimeout(() => {
      setFeedback(null);
      if (step + 1 < questions.length) {
        setStep(step + 1);
      } else {
        setShowResult(true);
      }
    }, 900);
  };

  if (showResult) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Raven's Matrices Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="text-4xl font-bold">{score} / {questions.length}</div>
            <div className="text-lg">{score >= 8 ? "Excellent!" : score >= 5 ? "Good job!" : "Keep practicing!"}</div>
            <Link to="/puzzles">
              <Button className="mt-4">Back to Puzzles</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-lg w-full">
        <Link to="/puzzles">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
        <Badge className="mb-4 px-4 py-2 bg-gradient-puzzle text-white">
          {step < 5 ? "Easy" : "Hard"} Question {step + 1} / {questions.length}
        </Badge>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Raven's Matrices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="whitespace-pre text-3xl text-center font-mono">
              {current.prompt}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {current.options.map((opt, idx) => (
                <Button
                  key={idx}
                  className="text-2xl py-6"
                  variant="outline"
                  onClick={() => handleAnswer(idx)}
                  disabled={!!feedback}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {feedback && (
              <div className={`text-lg font-bold ${feedback === "Correct!" ? "text-green-600" : "text-red-600"}`}>{feedback}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RavenMatricesPage;
