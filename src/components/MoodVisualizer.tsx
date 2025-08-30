import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MoodScores } from '@/lib/system-controller';
import {
    Brain,
    Heart,
    Eye,
    Zap,
    Target,
    Leaf,
    TrendingUp,
    TrendingDown
} from 'lucide-react';

interface MoodVisualizerProps {
    scores: MoodScores;
    isActive: boolean;
}

const MoodVisualizer: React.FC<MoodVisualizerProps> = ({ scores, isActive }) => {
    const getMoodIcon = (type: keyof MoodScores) => {
        const icons = {
            stress: Brain,
            engagement: Target,
            interest: Eye,
            excitement: Zap,
            focus: TrendingUp,
            relaxation: Leaf
        };
        return icons[type];
    };

    const getMoodColor = (type: keyof MoodScores, score: number) => {
        const colors = {
            stress: score > 70 ? 'text-red-500' : score > 30 ? 'text-yellow-500' : 'text-green-500',
            engagement: score > 70 ? 'text-green-500' : score > 30 ? 'text-yellow-500' : 'text-red-500',
            interest: score > 70 ? 'text-blue-500' : score > 30 ? 'text-yellow-500' : 'text-gray-500',
            excitement: score > 70 ? 'text-purple-500' : score > 30 ? 'text-orange-500' : 'text-blue-500',
            focus: score > 70 ? 'text-green-500' : score > 30 ? 'text-yellow-500' : 'text-red-500',
            relaxation: score > 70 ? 'text-green-500' : score > 30 ? 'text-yellow-500' : 'text-red-500'
        };
        return colors[type];
    };

    const getProgressColor = (type: keyof MoodScores, score: number) => {
        const colors = {
            stress: score > 70 ? 'bg-red-500' : score > 30 ? 'bg-yellow-500' : 'bg-green-500',
            engagement: score > 70 ? 'bg-green-500' : score > 30 ? 'bg-yellow-500' : 'bg-red-500',
            interest: score > 70 ? 'bg-blue-500' : score > 30 ? 'bg-yellow-500' : 'bg-gray-500',
            excitement: score > 70 ? 'bg-purple-500' : score > 30 ? 'bg-orange-500' : 'bg-blue-500',
            focus: score > 70 ? 'bg-green-500' : score > 30 ? 'bg-yellow-500' : 'bg-red-500',
            relaxation: score > 70 ? 'bg-green-500' : score > 30 ? 'bg-yellow-500' : 'bg-red-500'
        };
        return colors[type];
    };

    const getMoodLabel = (type: keyof MoodScores, score: number) => {
        const labels = {
            stress: score > 70 ? 'High Stress' : score > 30 ? 'Moderate Stress' : 'Low Stress',
            engagement: score > 70 ? 'Highly Engaged' : score > 30 ? 'Moderately Engaged' : 'Low Engagement',
            interest: score > 70 ? 'Very Interested' : score > 30 ? 'Somewhat Interested' : 'Low Interest',
            excitement: score > 70 ? 'Very Excited' : score > 30 ? 'Moderately Excited' : 'Low Excitement',
            focus: score > 70 ? 'Highly Focused' : score > 30 ? 'Moderately Focused' : 'Low Focus',
            relaxation: score > 70 ? 'Very Relaxed' : score > 30 ? 'Moderately Relaxed' : 'Low Relaxation'
        };
        return labels[type];
    };

    const getMoodStatus = (type: keyof MoodScores, score: number) => {
        if (score > 70) return 'high';
        if (score > 30) return 'medium';
        return 'low';
    };

    const moodTypes: Array<{ key: keyof MoodScores; label: string }> = [
        { key: 'stress', label: 'Stress' },
        { key: 'engagement', label: 'Engagement' },
        { key: 'interest', label: 'Interest' },
        { key: 'excitement', label: 'Excitement' },
        { key: 'focus', label: 'Focus' },
        { key: 'relaxation', label: 'Relaxation' }
    ];

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Real-time Mood Analysis
                    <div className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                        {isActive ? 'Active' : 'Inactive'}
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {moodTypes.map(({ key, label }) => {
                        const score = scores[key];
                        const Icon = getMoodIcon(key);
                        const colorClass = getMoodColor(key, score);
                        const progressColor = getProgressColor(key, score);
                        const status = getMoodStatus(key, score);

                        return (
                            <div
                                key={key}
                                className={`p-4 rounded-lg border transition-all duration-300 ${isActive ? 'animate-pulse' : ''
                                    } ${status === 'high' ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
                                        status === 'medium' ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' :
                                            'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <Icon className={`w-4 h-4 ${colorClass}`} />
                                        <span className="font-medium text-sm">{label}</span>
                                    </div>
                                    <span className={`text-lg font-bold ${colorClass}`}>
                                        {score}
                                    </span>
                                </div>

                                <Progress
                                    value={score}
                                    className="h-2 mb-2"
                                    style={{
                                        '--progress-color': progressColor
                                    } as React.CSSProperties}
                                />

                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">
                                        {getMoodLabel(key, score)}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {score > 50 ? (
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3 text-red-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Section */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        Current State Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Overall Stress:</span>
                            <span className={`font-medium ${scores.stress > 70 ? 'text-red-600' :
                                scores.stress > 30 ? 'text-yellow-600' : 'text-green-600'
                                }`}>
                                {scores.stress > 70 ? 'High' : scores.stress > 30 ? 'Medium' : 'Low'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Focus Level:</span>
                            <span className={`font-medium ${scores.focus > 70 ? 'text-green-600' :
                                scores.focus > 30 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {scores.focus > 70 ? 'High' : scores.focus > 30 ? 'Medium' : 'Low'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Engagement:</span>
                            <span className={`font-medium ${scores.engagement > 70 ? 'text-green-600' :
                                scores.engagement > 30 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                {scores.engagement > 70 ? 'High' : scores.engagement > 30 ? 'Medium' : 'Low'}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoodVisualizer; 