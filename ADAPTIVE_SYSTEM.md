# LockedOut Adaptive System

## Overview

LockedOut is an intelligent, adaptive environment that responds to real-time EEG data to optimize your productivity and well-being. The system monitors 6 key mood qualities and automatically adjusts your environment to help you achieve optimal focus, relaxation, and engagement.

## Core Features

### 🧠 Real-time EEG Mood Analysis
The system monitors 6 key qualities from your EEG headset:
- **Stress** (0-100): Current stress levels
- **Engagement** (0-100): How engaged you are with your current task
- **Interest** (0-100): Level of interest in current activity
- **Excitement** (0-100): Current excitement/energy levels
- **Focus** (0-100): Concentration and focus levels
- **Relaxation** (0-100): Current relaxation state

### 🎛️ Adaptive Environment Controls
Based on your mood scores, the system automatically adjusts:

#### Stress Management
- **Low Stress (<30)**: Lofi beats, high brightness, white noise
- **Medium Stress (30-70)**: Dim brightness, breathing guidance
- **High Stress (>70)**: Breathing animations, muted notifications, reduced brightness

#### Engagement Optimization
- **Low Engagement (<30)**: Micro goal notifications
- **High Engagement (>70)**: Break reminders after 60 minutes

#### Interest Enhancement
- **Low Interest (<30)**: High brightness, visual stimuli cycling
- **High Interest (>70)**: Quick notes overlay for insight capture

#### Excitement Regulation
- **Low Excitement (<30)**: Upbeat music, increased volume
- **High Excitement (>70)**: White noise, lower volume, dark mode

#### Focus Support
- **Low Focus (<30)**: Distraction blocking, website restrictions
- **Medium Focus (30-70)**: Pomodoro timer overlay
- **High Focus (>70)**: Micro break suggestions

#### Relaxation Assistance
- **Low Relaxation (<30)**: Breathing exercises, social connection prompts
- **High Relaxation (>70)**: Warm color filters, ambient sounds, rest suggestions

## System Architecture

### Core Components

1. **SystemController** (`src/lib/system-controller.ts`)
   - Main orchestrator for all adaptive features
   - Processes mood scores and applies appropriate actions
   - Manages overlays, notifications, and system state

2. **NativeIntegration** (`src/lib/native-integration.ts`)
   - Handles system-level permissions and controls
   - Manages brightness, volume, notifications, fullscreen
   - Provides fallbacks for unsupported features

3. **useAdaptiveSession** (`src/hooks/use-adaptive-session.ts`)
   - React hook for managing adaptive sessions
   - Handles session timing, mood updates, and state management
   - Integrates with SystemController for real-time adjustments

4. **MoodVisualizer** (`src/components/MoodVisualizer.tsx`)
   - Real-time visualization of mood scores
   - Beautiful, animated interface showing all 6 qualities
   - Color-coded indicators for quick status assessment

### Session Modes

The system supports 5 different session modes, each with unique mood patterns:

1. **Intense Study**: High engagement, variable focus, moderate stress
2. **Casual Study**: Balanced engagement, moderate focus, low stress
3. **Casual Browsing**: Low engagement, variable interest, low focus
4. **Meditation**: High relaxation, high focus, low stress
5. **Puzzles**: High engagement, high interest, moderate excitement

## Getting Started

### 1. Start a Session

1. Navigate to the homepage and select your desired session mode
2. Configure session duration (15-180 minutes)
3. Enable/disable adaptive mode
4. Click "Start Session"

### 2. System Initialization

The system will automatically:
- Request necessary permissions (notifications, screen wake lock)
- Initialize the mood monitoring system
- Set up overlays and system controls
- Begin real-time mood analysis

### 3. Real-time Monitoring

Once active, you'll see:
- Real-time mood scores updating every 5 seconds
- Visual indicators for each mood quality
- Automatic environment adjustments
- Smart notifications and suggestions

## Integration with Real EEG Data

### Current Implementation
The system currently uses simulated EEG data that follows realistic patterns based on session type and time. This allows for testing and development without actual EEG hardware.

### Real EEG Integration
To integrate with real EEG data, replace the `simulateEEGData` function in `useAdaptiveSession.ts`:

```typescript
// Replace this function with your EEG data processing
const processRealEEGData = (eegRawData: any): MoodScores => {
  // Your EEG processing logic here
  // Return normalized scores (0-100) for each quality
  return {
    stress: processedStressScore,
    engagement: processedEngagementScore,
    interest: processedInterestScore,
    excitement: processedExcitementScore,
    focus: processedFocusScore,
    relaxation: processedRelaxationScore
  };
};
```

### EEG Data Requirements
Your EEG processing should output normalized scores (0-100) for each quality:
- **Stress**: Higher values indicate more stress
- **Engagement**: Higher values indicate more engagement
- **Interest**: Higher values indicate more interest
- **Excitement**: Higher values indicate more excitement
- **Focus**: Higher values indicate better focus
- **Relaxation**: Higher values indicate more relaxation

## System Permissions

The system requests the following permissions:

### Required Permissions
- **Notifications**: For smart alerts and suggestions
- **Screen Wake Lock**: To prevent screen sleep during sessions

### Optional Permissions
- **Clipboard**: For copying notes and insights
- **Fullscreen**: For immersive session modes

### Permission Handling
- The system gracefully degrades if permissions are denied
- Features requiring permissions are disabled automatically
- Users can manually enable permissions in browser settings

## Customization

### Threshold Adjustment
You can customize the low/medium/high thresholds in `system-controller.ts`:

```typescript
// Current thresholds
if (score < 30) { // Low
  // Low-level actions
} else if (score > 70) { // High
  // High-level actions
} else { // Medium
  // Medium-level actions
}
```

### Action Customization
Each mood quality has customizable actions. Modify the processing functions in `SystemController`:

```typescript
private async processStress(score: number): Promise<void> {
  if (score < 30) {
    // Customize low stress actions
    this.currentState.musicType = 'lofi';
    this.currentState.brightness = Math.max(this.currentState.brightness, 70);
  }
  // ... more customization
}
```

### Session Mode Patterns
Customize mood patterns for different session types in `useAdaptiveSession.ts`:

```typescript
case 'intense-study':
  stressPattern = Math.sin(baseTime * 0.1) * 20 + 60;
  engagementPattern = Math.cos(baseTime * 0.05) * 15 + 70;
  // ... customize patterns
  break;
```

## Troubleshooting

### Common Issues

1. **Permissions Denied**
   - Check browser settings for notification permissions
   - Refresh the page and try again
   - Some features will be disabled but the system will still work

2. **System Not Responding**
   - Check browser console for error messages
   - Ensure all dependencies are installed
   - Try refreshing the page

3. **Overlays Not Showing**
   - Check if popup blockers are enabled
   - Ensure the page has focus
   - Check browser console for JavaScript errors

### Debug Mode
Enable debug logging by checking the browser console. The system provides detailed logs for:
- System initialization
- Mood score processing
- Action triggers
- Permission status
- Error conditions

## Future Enhancements

### Planned Features
- **Spotify Integration**: Direct music control based on mood
- **Website Blocking**: Automatic distraction blocking
- **Email Integration**: Smart email suggestions
- **Calendar Integration**: Schedule optimization
- **Machine Learning**: Personalized mood patterns

### Integration Points
- **Spotify API**: For music control (teammate working on this)
- **Browser Extensions**: For website blocking (teammate working on this)
- **Native Apps**: For system-level controls
- **EEG APIs**: For real-time data processing

## Development

### Project Structure
```
src/
├── lib/
│   ├── system-controller.ts    # Main adaptive logic
│   └── native-integration.ts   # System permissions & controls
├── hooks/
│   └── use-adaptive-session.ts # Session management
├── components/
│   ├── MoodVisualizer.tsx      # Real-time mood display
│   └── [Session Components]    # Mode-specific interfaces
```

### Key Technologies
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **shadcn/ui**: Component library
- **Vite**: Build tool

### Contributing
1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions, issues, or contributions:
- Check the browser console for detailed logs
- Review this documentation
- Open an issue on GitHub
- Contact the development team

---

**Note**: This system is designed to work with real EEG data. The current implementation uses simulated data for development and testing purposes. Replace the simulation with actual EEG processing for production use. 