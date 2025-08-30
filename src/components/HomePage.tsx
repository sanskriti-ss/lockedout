import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  BookOpen, 
  Globe, 
  Flower, 
  Puzzle,
  Zap,
  Focus,
  Activity
} from "lucide-react";

const HomePage = () => {
  const modes = [
    {
      id: "intense-study",
      title: "Intense Study",
      description: "Deep focus mode with enhanced concentration tools",
      icon: Brain,
      gradient: "bg-gradient-intense",
      color: "intense",
      features: ["Spotify Focus Playlist", "Increased Brightness", "Block Distractions"]
    },
    {
      id: "casual-study", 
      title: "Casual Study",
      description: "Relaxed learning environment for lighter sessions",
      icon: BookOpen,
      gradient: "bg-gradient-casual",
      color: "casual",
      features: ["Ambient Sounds", "Gentle Reminders", "Flexible Timing"]
    },
    {
      id: "casual-browsing",
      title: "Casual Browsing", 
      description: "Mindful internet exploration with gentle guidance",
      icon: Globe,
      gradient: "bg-gradient-browse",
      color: "browse",
      features: ["Time Tracking", "Mindful Breaks", "Content Filtering"]
    },
    {
      id: "meditation",
      title: "Meditation",
      description: "Peaceful environment for mindfulness and reflection", 
      icon: Flower,
      gradient: "bg-gradient-meditate",
      color: "meditate",
      features: ["Breathing Guides", "Nature Sounds", "Progress Tracking"]
    },
    {
      id: "puzzles",
      title: "Puzzles",
      description: "Brain training and cognitive enhancement games",
      icon: Puzzle,
      gradient: "bg-gradient-puzzle", 
      color: "puzzle",
      features: ["Daily Challenges", "Progress Analytics", "Skill Building"]
    },
    {
      id: "avoiding-brainrot",
      title: "Avoiding Brainrot",
      description: "Stay mindful, get time reminders, and connect with friends",
      icon: Activity,
      gradient: "bg-gradient-to-r from-fuchsia-500 to-rose-500",
      color: "meditate",
      features: ["10-min Time Popups", "Book/Show Suggestions", "Friends Online"]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-hero glow-pulse">
              <Focus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              LockedOut
            </h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your productivity with intelligent focus modes tailored to your activities.
            Enhance concentration, block distractions, and optimize your environment.
          </p>

          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Smart Automation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              <span>Real-time Monitoring</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Focus className="w-4 h-4 text-primary" />
              <span>Deep Focus</span>
            </div>
          </div>
        </div>

        {/* Mode Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modes.map((mode, index) => (
            <Card 
              key={mode.id}
              className="group hover:shadow-card-custom transition-all duration-300 hover:scale-105 bg-card border-border/50 overflow-hidden"
            >
              <div className={`h-2 ${mode.gradient}`} />
              
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${mode.gradient} shadow-lg`}>
                    <mode.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {mode.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Features
                  </p>
                  <div className="space-y-1">
                    {mode.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/${mode.id}`} className="block">
                  <Button 
                    className={`w-full ${mode.gradient} hover:shadow-lg transition-all duration-300 hover:shadow-${mode.color}/20 text-white border-0`}
                  >
                    Start {mode.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground">
            Designed to help you achieve peak productivity and mindful living
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;