import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import SpotifyPlayer from 'react-spotify-web-playback';
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Sun,
  Shield,
  CheckCircle,
  Brain,
  Settings,
  Activity,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdaptiveSession } from "@/hooks/use-adaptive-session";
import MoodVisualizer from "./MoodVisualizer";
import { eegIntegration } from "@/lib/eeg-integration";
import HighStressPopup from "@/high_stress/HighStressPopup";
import LowEnergyPopup from "@/high_stress/LowEnergyPopup";
import { isHighStress } from "@/high_stress/highStressUtils";

const IntenseStudy = () => {
  const [enableAdaptive, setEnableAdaptive] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(60); // minutes
  const [eegConnected, setEegConnected] = useState(false);
  const [eegDeviceType, setEegDeviceType] = useState<'mw20' | 'epocx' | 'flexsaline' | 'flexgel' | 'insight' | 'mn8' | 'xtrodes'>('mw20');
  const [showHighStress, setShowHighStress] = useState(false);
  const [showLowEnergy, setShowLowEnergy] = useState(false);
  const { toast } = useToast();

  // Initialize adaptive session
  const {
    sessionState,
    startSession,
    stopSession,
    pauseSession,
    resumeSession,
    getSessionProgress,
    getFormattedTime,
    initializeSystem,
    updateEEGData
  } = useAdaptiveSession({
    duration: sessionDuration,
    mode: 'intense-study',
    enableAdaptive
  });

  // Connect to EEG device
  const connectEEG = async () => {
    try {
      // Set up EEG data callback
      eegIntegration.setDataCallback(updateEEGData);

      // Initialize EEG connection
      const success = await eegIntegration.initialize(eegDeviceType);
      if (success) {
        setEegConnected(true);
        eegIntegration.startStreaming();
        toast({
          title: "EEG Device Connected",
          description: `Connected to ${eegIntegration.getConnectionStatus().deviceName}`,
        });
      } else {
        toast({
          title: "EEG Connection Failed",
          description: "Please check your device and try again",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "EEG Connection Error",
        description: "Failed to connect to EEG device",
        variant: "destructive"
      });
    }
  };

  const token = import.meta.env.VITE_SPOTIFY_TOKEN;
  console.log(token)

  // Disconnect EEG device
  const disconnectEEG = () => {
    eegIntegration.disconnect();
    setEegConnected(false);
    toast({
      title: "EEG Device Disconnected",
      description: "EEG device has been disconnected",
    });
  };

  const handleStartSession = async () => {
    try {
      await startSession();
      toast({
        title: "Intense Study Session Started",
        description: "Adaptive system is now monitoring your mood and optimizing your environment",
      });
    } catch (error) {
      toast({
        title: "Failed to Start Session",
        description: "Please check system permissions and try again",
        variant: "destructive"
      });
    }
  };

  const handleStopSession = () => {
    stopSession();
    toast({
      title: "Session Ended",
      description: "All adaptive features have been disabled",
    });
  };

  const handlePauseSession = () => {
    pauseSession();
    toast({
      title: "Session Paused",
      description: "Adaptive features temporarily disabled",
    });
  };

  const handleResumeSession = () => {
    resumeSession();
    toast({
      title: "Session Resumed",
      description: "Adaptive features reactivated",
    });
  };

  const getStatusColor = () => {
    switch (sessionState.systemStatus) {
      case 'active': return 'text-green-500';
      case 'initializing': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (sessionState.systemStatus) {
      case 'active': return 'System Active';
      case 'initializing': return 'Initializing...';
      case 'error': return 'System Error';
      default: return 'System Stopped';
    }
  };

  const prevStressRef = useRef<number | undefined>(undefined);
  const prevFocusRef = useRef<number | undefined>(undefined);

  // Show popup if stress score > 0.8 (future EEG integration)
  useEffect(() => {
    const currentStress = sessionState.currentMoodScores?.stress;
    const prevStress = prevStressRef.current;
    if (
      typeof currentStress === 'number' &&
      typeof prevStress === 'number' &&
      prevStress <= 0.8 &&
      currentStress > 0.8 &&
      !showHighStress
    ) {
      setShowHighStress(true);
    }
    prevStressRef.current = currentStress;
  }, [sessionState.currentMoodScores?.stress, showHighStress]);

  // Show low energy popup if focus drops below threshold
  useEffect(() => {
    const currentFocus = sessionState.currentMoodScores?.focus;
    const prevFocus = prevFocusRef.current;
    if (
      typeof currentFocus === 'number' &&
      typeof prevFocus === 'number' &&
      prevFocus >= 0.2 &&
      currentFocus < 0.2 &&
      !showLowEnergy
    ) {
      setShowLowEnergy(true);
    }
    prevFocusRef.current = currentFocus;
  }, [sessionState.currentMoodScores?.focus, showLowEnergy]);

  // Keyboard shortcuts: 's' for stress, 'd' for low energy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 's' || e.key === 'S') {
        setShowHighStress(true);
      }
      if (e.key === 'd' || e.key === 'D') {
        setShowLowEnergy(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <SpotifyPlayer
        token={token}
        uris={['spotify:artist:6HQYnRM4OzToCYPpVBInuU']}
      />
      <HighStressPopup open={showHighStress} onClose={() => setShowHighStress(false)} />
      <LowEnergyPopup open={showLowEnergy} onClose={() => setShowLowEnergy(false)} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-card">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-intense bg-clip-text text-transparent">
              Intense Study Mode
            </h1>
            <p className="text-muted-foreground">
              AI-powered adaptive environment for maximum focus and productivity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${getStatusColor()}`} />
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>

        {/* Session Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Session Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="adaptive-mode">Adaptive Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically adjust environment based on EEG mood data
                </p>
              </div>
              <Switch
                id="adaptive-mode"
                checked={enableAdaptive}
                onCheckedChange={setEnableAdaptive}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Session Duration: {sessionDuration} minutes</Label>
              <input
                id="duration"
                type="range"
                min="15"
                max="180"
                step="15"
                value={sessionDuration}
                onChange={(e) => setSessionDuration(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>15 min</span>
                <span>180 min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EEG Device Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              EEG Device Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>EEG Device Type</Label>
                <p className="text-sm text-muted-foreground">
                  Select your EEG headset type
                </p>
              </div>
              <select
                value={eegDeviceType}
                onChange={(e) => setEegDeviceType(e.target.value as any)}
                className="px-3 py-2 border rounded-md bg-card text-foreground border-border"
                disabled={eegConnected}
              >
                <option value="mw20">MW20 – 2 Channel EEG Earbuds</option>
                <option value="epocx">EPOC X - 14 Channel EEG Headset</option>
                <option value="flexsaline">FLEX Saline - 32 Channel EEG Headset</option>
                <option value="flexgel">FLEX Gel - 32 Channel EEG Headset</option>
                <option value="insight">Insight - 5 Channel EEG Headset</option>
                <option value="mn8">MN8 - 2 Channel EEG Headphones</option>
                <option value="xtrodes">X-trodes Powered by EmotivPRO</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>EEG Connection</Label>
                <p className="text-sm text-muted-foreground">
                  {eegConnected ? 'Connected' : 'Not connected'}
                </p>
              </div>
              {!eegConnected ? (
                <Button onClick={connectEEG} variant="outline">
                  Connect EEG Device
                </Button>
              ) : (
                <Button onClick={disconnectEEG} variant="destructive">
                  Disconnect
                </Button>
              )}
            </div>

            {eegConnected && (
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded-md">
                <div className="flex items-center gap-2 text-green-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    Connected to {eegIntegration.getConnectionStatus().deviceName}
                  </span>
                </div>
                <p className="text-xs text-green-300 mt-1">
                  Data rate: {eegIntegration.getConnectionStatus().dataRate}Hz
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Control Panel */}
        <Card className="mb-8 bg-gradient-intense p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-intense">
                  {sessionState.isActive ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </div>
                Session Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Session Progress */}
              {sessionState.isActive && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Session Progress</span>
                    <span>{getSessionProgress().toFixed(1)}%</span>
                  </div>
                  <Progress value={getSessionProgress()} className="h-2" />
                  <div className="text-center text-2xl font-bold text-intense">
                    {getFormattedTime()}
                  </div>
                </div>
              )}

              {/* Control Buttons */}
              <div className="flex gap-3">
                {!sessionState.isActive ? (
                  <Button
                    onClick={handleStartSession}
                    className="flex-1 bg-gradient-intense hover:shadow-intense text-white"
                    size="lg"
                    disabled={sessionState.systemStatus === 'initializing'}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handlePauseSession}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      onClick={handleStopSession}
                      variant="destructive"
                      className="flex-1"
                      size="lg"
                    >
                      Stop Session
                    </Button>
                  </>
                )}
              </div>

              {!sessionState.isActive && sessionState.startTime && (
                <Button
                  onClick={handleResumeSession}
                  variant="outline"
                  className="w-full"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Resume Session
                </Button>
              )}
            </CardContent>
          </div>
        </Card>

        {/* Mood Visualization */}
        {enableAdaptive && (
          <div className="mb-8">
            <MoodVisualizer
              scores={sessionState.currentMoodScores}
              isActive={sessionState.isActive}
            />
          </div>
        )}

        {/* Adaptive Features Status */}
        {sessionState.isActive && enableAdaptive && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Active Adaptive Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-900/20 border border-green-600/30">
                  <Brain className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-medium text-green-200">EEG Monitoring</div>
                    <div className="text-sm text-green-300">Real-time mood analysis</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-900/20 border border-blue-600/30">
                  <Sun className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-blue-200">Brightness Control</div>
                    <div className="text-sm text-blue-300">Adaptive screen brightness</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-900/20 border border-purple-600/30">
                  <Volume2 className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-purple-200">Audio Control</div>
                    <div className="text-sm text-purple-300">Smart music selection</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-900/20 border border-orange-600/30">
                  <Shield className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="font-medium text-orange-200">Distraction Blocking</div>
                    <div className="text-sm text-orange-300">Website blocking</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-900/20 border border-indigo-600/30">
                  <CheckCircle className="w-5 h-5 text-indigo-400" />
                  <div>
                    <div className="font-medium text-indigo-200">Notifications</div>
                    <div className="text-sm text-indigo-300">Smart alerts</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-900/20 border border-pink-600/30">
                  <Activity className="w-5 h-5 text-pink-400" />
                  <div>
                    <div className="font-medium text-pink-200">Overlays</div>
                    <div className="text-sm text-pink-300">Breathing & Pomodoro</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Session Statistics */}
        {sessionState.isActive && (
          <Card className="bg-gradient-intense/5 border-intense/20">
            <CardHeader>
              <CardTitle className="text-intense">Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-intense">{getFormattedTime()}</div>
                  <div className="text-sm text-muted-foreground">Time Elapsed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-intense">
                    {getSessionProgress().toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Progress</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-intense">
                    {sessionState.currentMoodScores.focus}
                  </div>
                  <div className="text-sm text-muted-foreground">Focus Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-intense">
                    {sessionState.currentMoodScores.stress}
                  </div>
                  <div className="text-sm text-muted-foreground">Stress Level</div>
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