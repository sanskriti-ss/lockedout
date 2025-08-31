import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Coffee, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MusicPopup from "@/high_stress/MusicPopup";
import SpotifyPlayer from "./SpotifyCustomizedPlayer";

const CasualStudy = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();
  const [showMusicPopup, setShowMusicPopup] = useState(false);
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const spotifyType = 'playlist';
  const spotifyId = '3OqdJY9FxLoseJKAsZxlgY';

  const spotifyUri = `spotify:${spotifyType}:${spotifyId}`;

  const handleActivateMode = () => {
    setIsActive(!isActive);
    if (!isActive) {setShowMusicPopup(true);}
    toast({
      title: isActive ? "Casual Study Mode Deactivated" : "Casual Study Mode Activated", 
      description: isActive ? "Back to normal mode" : "Relaxed learning environment ready",
    });
  };

  const handleMusicYes = () => {
    setShouldPlayMusic(true);
    setShowMusicPopup(false);
  };

  const handleMusicNo = () => {
    setShouldPlayMusic(false);
    setShowMusicPopup(false);
  };

  const token = import.meta.env.VITE_SPOTIFY_TOKEN;

  return (
    <div className="min-h-screen p-6">
      <MusicPopup open={showMusicPopup} onClose={() => setShowMusicPopup(false)} onYes={handleMusicYes} onNo={handleMusicNo} token={token} spotifyUri={spotifyUri}/>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-card">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-casual bg-clip-text text-transparent">
              Casual Study Mode
            </h1>
            <p className="text-muted-foreground">
              Relaxed environment for comfortable learning sessions
            </p>
          </div>
        </div>

        <Badge className={`mb-8 px-4 py-2 ${isActive ? 'bg-gradient-casual text-white' : 'bg-muted text-muted-foreground'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>

        <Card className="mb-8 bg-gradient-casual p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-casual">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                Study Environment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleActivateMode}
                className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-casual hover:shadow-lg'} text-white`}
                size="lg"
              >
                {isActive ? 'End Study Session' : 'Start Studying'}
              </Button>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-casual">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Ambient Sounds</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Gentle background music and nature sounds
              </p>
              <Button variant="outline" size="sm">Configure</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-casual">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Gentle Reminders</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Soft notifications for breaks and progress
              </p>
              <Button variant="outline" size="sm">Set Timers</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-casual">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Break Suggestions</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Smart recommendations for healthy breaks
              </p>
              <Button variant="outline" size="sm">View Options</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="fixed right-10 bottom-10 z-50">
        <SpotifyPlayer
          token={token}
          playId={spotifyUri}
          isPlaying={shouldPlayMusic}
        />
      </div>
    </div>
  );
};

export default CasualStudy;