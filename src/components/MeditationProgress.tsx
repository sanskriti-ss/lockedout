import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BANDS = ["Delta", "Theta", "Alpha", "Beta", "Gamma"];
const COLORS = ["#6366f1", "#06b6d4", "#22c55e", "#f59e42", "#eab308"];

// Generate synthetic EEG band data (percentages)
function getSyntheticBands() {
  let vals = Array.from({ length: 5 }, () => Math.random() * 30 + 10);
  const sum = vals.reduce((a, b) => a + b, 0);
  return vals.map(v => Math.round((v / sum) * 100));
}

const before = getSyntheticBands();
const after = getSyntheticBands();

const MeditationProgress: React.FC = () => {
  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        <Link to="/meditation">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Link>
        <Badge className="mb-4 px-4 py-2 bg-gradient-meditate text-white">Progress Tracking</Badge>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Brain Activity Before & After Meditation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 justify-center items-end">
              {/* Before Meditation */}
              <div className="flex-1">
                <div className="text-center text-muted-foreground mb-2">Before</div>
                <svg width={260} height={200}>
                  {before.map((val, i) => (
                    <g key={BANDS[i]}>
                      <rect x={20 + i * 45} y={180 - val * 1.5} width={30} height={val * 1.5} fill={COLORS[i]} />
                      <text x={35 + i * 45} y={195} textAnchor="middle" fontSize={14} fill="#fff">{BANDS[i]}</text>
                      <text x={35 + i * 45} y={180 - val * 1.5 - 8} textAnchor="middle" fontSize={12} fill="#fff">{val}%</text>
                    </g>
                  ))}
                </svg>
              </div>
              {/* After Meditation */}
              <div className="flex-1">
                <div className="text-center text-muted-foreground mb-2">After</div>
                <svg width={260} height={200}>
                  {after.map((val, i) => (
                    <g key={BANDS[i]}>
                      <rect x={20 + i * 45} y={180 - val * 1.5} width={30} height={val * 1.5} fill={COLORS[i]} />
                      <text x={35 + i * 45} y={195} textAnchor="middle" fontSize={14} fill="#fff">{BANDS[i]}</text>
                      <text x={35 + i * 45} y={180 - val * 1.5 - 8} textAnchor="middle" fontSize={12} fill="#fff">{val}%</text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>
            <div className="text-xs text-gray-400 text-center">(The brain produces different waves based on activity and mental state: delta waves (0.5–4 Hz) dominate during deep, dreamless sleep and help the body heal; theta waves (4–8 Hz) show up during light sleep, meditation, and creative daydreaming; alpha waves (8–12 Hz) appear when calm but awake and relaxed, such as during quiet reflection; beta waves (13–30 Hz) are present during focused thinking, learning, and problem solving; and gamma waves (30–100 Hz) are strongest when the brain is handling complex tasks or deep concentration, such as integrating information and experiencing heightened perception.)</div>
            <div className="flex justify-center mt-4">
              <a href="https://pubmed.ncbi.nlm.nih.gov/36252972/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-meditate text-black px-6 py-2 rounded-lg shadow hover:shadow-lg transition-all">
                  Read this scientific paper (Attar, 2024) to understand what they mean
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeditationProgress;
