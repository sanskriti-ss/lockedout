import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Globe, Timer, Filter, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CasualBrowsing = () => {
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleActivateMode = () => {
    setIsActive(!isActive);
    toast({
      title: isActive ? "Casual Browsing Mode Deactivated" : "Casual Browsing Mode Activated",
      description: isActive ? "Normal browsing resumed" : "Mindful browsing mode enabled",
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
            <h1 className="text-3xl font-bold bg-gradient-browse bg-clip-text text-transparent">
              Casual Browsing Mode
            </h1>
            <p className="text-muted-foreground">
              Mindful internet exploration with gentle guidance
            </p>
          </div>
        </div>

        <Badge className={`mb-8 px-4 py-2 ${isActive ? 'bg-gradient-browse text-white' : 'bg-muted text-muted-foreground'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>

        <Card className="mb-8 bg-gradient-browse p-1">
          <div className="bg-card rounded-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-browse">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                Mindful Browsing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleActivateMode}
                className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-browse hover:shadow-lg'} text-white`}
                size="lg"
              >
                {isActive ? 'Stop Monitoring' : 'Start Mindful Browsing'}
              </Button>
            </CardContent>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-browse">
                  <Timer className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Time Tracking</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor time spent on different websites
              </p>
              <Button variant="outline" size="sm">View Stats</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-browse">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Content Filtering</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Filter out distracting or harmful content
              </p>
              <Button variant="outline" size="sm">Configure</Button>
            </CardContent>
          </Card>

          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-browse">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Usage Analytics</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Insights into your browsing patterns
              </p>
              <Button variant="outline" size="sm">View Report</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CasualBrowsing;