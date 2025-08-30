import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Pause, Volume2, Sun, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const IntenseStudy = () => {
  const [isActive, setIsActive] = useState(false);
  const [spotifyActive, setSpotifyActive] = useState(false);
  const [brightnessActive, setBrightnessActive] = useState(false);
  const [discordBlocked, setDiscordBlocked] = useState(false);
  const { toast } = useToast();

  const handleActivateMode = () => {
    if (!isActive) {
      // Simulate activating all features
      setTimeout(() => setSpotifyActive(true), 500);
      setTimeout(() => setBrightnessActive(true), 1000);
      setTimeout(() => setDiscordBlocked(true), 1500);
      
      toast({
        title: "Intense Study Mode Activated",
        description: "All systems optimized for deep focus",
      });
    } else {
      // Deactivate all features
      setSpotifyActive(false);
      setBrightnessActive(false);
      setDiscordBlocked(false);
      
      toast({
        title: "Intense Study Mode Deactivated",
        description: "Normal settings restored",
      });
    }
    setIsActive(!isActive);
  };

  const actions = [
    {
      id: "spotify",
      title: "Focus Playlist",
      description: "Play deep focus soundtrack from Spotify",
      icon: Volume2,
      active: spotifyActive,
      action: () => {
        setSpotifyActive(!spotifyActive);
        toast({
          title: spotifyActive ? "Music Stopped" : "Playing Focus Playlist",
          description: spotifyActive ? "Spotify playback paused" : "Deep focus beats now playing",
        });
      }
    },
    {
      id: "brightness",
      title: "Optimize Brightness",
      description: "Increase screen brightness for better focus",
      icon: Sun,
      active: brightnessActive,
      action: () => {
        setBrightnessActive(!brightnessActive);
        toast({
          title: brightnessActive ? "Brightness Normalized" : "Brightness Optimized",
          description: brightnessActive ? "Screen brightness restored" : "Brightness increased to 85%",
        });
      }
    },
    {
      id: "discord",
      title: "Block Discord",
      description: "Block access to discord.com during study session",
      icon: Shield,
      active: discordBlocked,
      action: () => {
        setDiscordBlocked(!discordBlocked);
        toast({
          title: discordBlocked ? "Discord Unblocked" : "Discord Blocked",
          description: discordBlocked ? "Access to Discord restored" : "Discord.com is now blocked",
        });
      }
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-card">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-intense bg-clip-text text-transparent">
              Intense Study Mode
            </h1>
            <p className="text-muted-foreground">
              Maximum focus configuration for deep learning sessions
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-8">
          <Badge 
            className={`px-4 py-2 text-sm font-medium ${
              isActive 
                ? 'bg-gradient-intense text-white' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        {/* Main Control Panel */}
        <Card className="mb-8 bg-gradient-intense p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-intense">
                  {isActive ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </div>
                Master Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleActivateMode}
                className={`w-full ${
                  isActive 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
                    : 'bg-gradient-intense hover:shadow-intense'
                } text-white transition-all duration-300`}
                size="lg"
              >
                {isActive ? 'Deactivate Study Mode' : 'Activate Study Mode'}
              </Button>
            </CardContent>
          </div>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {actions.map((action) => (
            <Card 
              key={action.id}
              className={`transition-all duration-300 cursor-pointer ${
                action.active 
                  ? 'bg-gradient-intense/10 border-intense shadow-lg' 
                  : 'hover:shadow-md bg-card'
              }`}
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    action.active 
                      ? 'bg-gradient-intense shadow-lg' 
                      : 'bg-muted'
                  } transition-all duration-300`}>
                    <action.icon className={`w-5 h-5 ${
                      action.active ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{action.title}</h3>
                      {action.active && (
                        <CheckCircle className="w-4 h-4 text-intense" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    variant={action.active ? "default" : "outline"}
                    size="sm"
                    className={action.active 
                      ? "bg-gradient-intense hover:shadow-lg text-white" 
                      : ""
                    }
                  >
                    {action.active ? 'Active' : 'Activate'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Session Stats */}
        {isActive && (
          <Card className="mt-8 bg-gradient-intense/5 border-intense/20">
            <CardHeader>
              <CardTitle className="text-intense">Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-intense">00:25:32</div>
                  <div className="text-sm text-muted-foreground">Time Focused</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-intense">7</div>
                  <div className="text-sm text-muted-foreground">Distractions Blocked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-intense">98%</div>
                  <div className="text-sm text-muted-foreground">Focus Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default IntenseStudy;