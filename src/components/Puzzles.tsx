import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Puzzle, Target, Brain, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Puzzles = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleActivateMode = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Puzzle Session Ended" : "Puzzle Training Started",
      description: isActive ? "Great mental workout!" : "Time to challenge your mind",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-card">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-puzzle bg-clip-text text-transparent">
              Puzzle Mode
            </h1>
            <p className="text-muted-foreground">
              Brain training and cognitive enhancement games
            </p>
          </div>
        </div>

        <Badge className={`mb-8 px-4 py-2 ${isActive ? 'bg-gradient-puzzle text-white' : 'bg-muted text-muted-foreground'}`}>
          {isActive ? 'Training Active' : 'Ready to Play'}
        </Badge>

        <Card className="mb-8 bg-gradient-puzzle p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-puzzle">
                  <Puzzle className="w-5 h-5 text-white" />
                </div>
                Brain Training Center
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleActivateMode}
                className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-puzzle hover:shadow-lg'} text-white`}
                size="lg"
              >
                {isActive ? 'End Training' : 'Start Brain Training'}
              </Button>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-puzzle">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Daily Challenges</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                New puzzles and challenges every day
              </p>
              <Button variant="outline" size="sm">Today's Challenge</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-puzzle">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Raven's Matrices</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get a personalized report of your brain activity.
              </p>
              <Button variant="outline" size="sm" onClick={() => navigate("/raven-matrices")}>Training Plan</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-puzzle">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Track your progress and earn rewards
              </p>
              <Button variant="outline" size="sm">View Trophies</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Puzzles;