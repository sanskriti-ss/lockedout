import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Flower, Wind, Waves, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Meditation = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleActivateMode = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Meditation Session Ended" : "Meditation Session Started",
      description: isActive ? "Welcome back to awareness" : "Finding peace within",
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
            <h1 className="text-3xl font-bold bg-gradient-meditate bg-clip-text text-transparent">
              Meditation Mode
            </h1>
            <p className="text-muted-foreground">
              Peaceful environment for mindfulness and reflection
            </p>
          </div>
        </div>

        <Badge className={`mb-8 px-4 py-2 ${isActive ? 'bg-gradient-meditate text-white' : 'bg-muted text-muted-foreground'}`}>
          {isActive ? 'In Session' : 'Ready'}
        </Badge>

        <Card className="mb-8 bg-gradient-meditate p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-meditate">
                  <Flower className="w-5 h-5 text-white" />
                </div>
                Mindfulness Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleActivateMode}
                className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-meditate hover:shadow-lg'} text-white`}
                size="lg"
              >
                {isActive ? 'End Session' : 'Begin Meditation'}
              </Button>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-meditate">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Breathing Guides</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Visual and audio cues for mindful breathing
              </p>
              <Button variant="outline" size="sm">Practice Now</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-meditate">
                  <Waves className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Nature Sounds</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Calming sounds from nature for deep relaxation
              </p>
              <Button variant="outline" size="sm">Choose Sounds</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-meditate">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Progress Tracking</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Track your mindfulness journey and habits
              </p>
              <Button variant="outline" size="sm">View Progress</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Meditation;