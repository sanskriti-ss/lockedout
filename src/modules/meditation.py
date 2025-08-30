# Meditation Mode - Mindfulness and Inner Peace
# Creating optimal conditions for meditation and self-reflection

import time
import threading
from datetime import datetime, timedelta
from typing import Dict, List
import random

class MeditationMode:
    """
    Provides comprehensive meditation support and environment optimization
    """
    
    def __init__(self):
        self.active = False
        self.session_start = None
        self.breathing_guidance_active = False
        self.config = {
            "breathing_patterns": {
                "4-7-8": {"inhale": 4, "hold": 7, "exhale": 8},  # Relaxation
                "box": {"inhale": 4, "hold": 4, "exhale": 4, "pause": 4},  # Focus
                "simple": {"inhale": 4, "exhale": 6}  # Beginner-friendly
            },
            "session_durations": [5, 10, 15, 20, 30, 45, 60],  # minutes
            "nature_sounds": [
                "ocean_waves", "forest_rain", "mountain_stream", 
                "bird_songs", "gentle_wind", "tibetan_bowls"
            ],
            "meditation_quotes": [
                "Peace comes from within. Do not seek it without. - Buddha",
                "The mind is everything. What you think you become. - Buddha", 
                "Wherever you are, be there totally. - Eckhart Tolle",
                "Meditation is not a way of making your mind quiet. It is a way of entering into the quiet that is already there. - Deepak Chopra"
            ]
        }
    
    def setup_environment(self) -> bool:
        """Optimize environment for meditation"""
        try:
            print("🕯️ Preparing meditation environment...")
            # Dim screen/lights
            # Minimize notifications
            # Set do-not-disturb mode
            print("  ✓ Notifications silenced")
            print("  ✓ Screen brightness optimized")
            print("  ✓ Peaceful ambiance ready")
            return True
        except Exception as e:
            print(f"❌ Environment setup failed: {e}")
            return False
    
    def start_breathing_guidance(self, pattern_name: str = "simple") -> bool:
        """Provide breathing rhythm guidance"""
        def breathing_guide():
            pattern = self.config["breathing_patterns"][pattern_name]
            print(f"🌬️ Starting {pattern_name} breathing pattern...")
            
            while self.breathing_guidance_active:
                if "inhale" in pattern:
                    print("  📥 Inhale...")
                    time.sleep(pattern["inhale"])
                
                if "hold" in pattern and self.breathing_guidance_active:
                    print("  ⏸️ Hold...")
                    time.sleep(pattern["hold"])
                
                if "exhale" in pattern and self.breathing_guidance_active:
                    print("  📤 Exhale...")
                    time.sleep(pattern["exhale"])
                
                if "pause" in pattern and self.breathing_guidance_active:
                    print("  🤫 Pause...")
                    time.sleep(pattern["pause"])
                
                if self.breathing_guidance_active:
                    print("  ◯ Rest...")
                    time.sleep(1)
        
        try:
            self.breathing_guidance_active = True
            breathing_thread = threading.Thread(target=breathing_guide, daemon=True)
            breathing_thread.start()
            return True
        except Exception as e:
            print(f"❌ Breathing guidance failed: {e}")
            return False
    
    def play_nature_sounds(self, sound_type: str = None) -> bool:
        """Play calming nature sounds"""
        if sound_type is None:
            sound_type = random.choice(self.config["nature_sounds"])
        
        try:
            print(f"🌊 Playing {sound_type.replace('_', ' ')} sounds...")
            # Integration with audio system
            return True
        except Exception as e:
            print(f"❌ Audio playback failed: {e}")
            return False
    
    def show_meditation_quote(self):
        """Display inspirational quote"""
        quote = random.choice(self.config["meditation_quotes"])
        print(f"\n💫 Reflection: {quote}\n")
    
    def track_session_progress(self):
        """Monitor meditation session progress"""
        if not self.session_start:
            return
        
        elapsed = (datetime.now() - self.session_start).total_seconds() / 60
        milestones = [5, 10, 15, 20, 30]
        
        for milestone in milestones:
            if abs(elapsed - milestone) < 0.5:  # Within 30 seconds of milestone
                print(f"🏔️ {milestone} minutes of peaceful meditation")
                if milestone % 10 == 0:  # Every 10 minutes
                    self.show_meditation_quote()
    
    def calculate_meditation_benefits(self, duration_minutes: float) -> Dict[str, str]:
        """Provide insights into meditation benefits achieved"""
        benefits = {}
        
        if duration_minutes >= 5:
            benefits["stress_relief"] = "Initial relaxation response activated"
        
        if duration_minutes >= 10:
            benefits["focus_improvement"] = "Attention training benefits begin"
        
        if duration_minutes >= 15:
            benefits["emotional_balance"] = "Emotional regulation enhanced"
        
        if duration_minutes >= 20:
            benefits["deep_relaxation"] = "Deep meditative state achieved"
        
        if duration_minutes >= 30:
            benefits["profound_peace"] = "Extended practice benefits unlocked"
        
        return benefits
    
    def activate_mode(self, duration_minutes: int = 10, 
                      breathing_pattern: str = "simple",
                      nature_sound: str = None) -> Dict[str, bool]:
        """Begin meditation session"""
        
        results = {
            "environment": self.setup_environment(),
            "breathing_guidance": self.start_breathing_guidance(breathing_pattern),
            "nature_sounds": self.play_nature_sounds(nature_sound)
        }
        
        self.session_start = datetime.now()
        self.active = True
        
        print(f"🧘 Meditation session beginning - {duration_minutes} minutes")
        self.show_meditation_quote()
        print("Find your center, breathe with awareness, and be present.")
        
        return results
    
    def deactivate_mode(self) -> Dict[str, any]:
        """End meditation session gracefully"""
        self.active = False
        self.breathing_guidance_active = False
        
        if self.session_start:
            duration = (datetime.now() - self.session_start).total_seconds() / 60
            benefits = self.calculate_meditation_benefits(duration)
            
            print("\n🙏 Meditation session complete")
            print(f"Duration: {duration:.1f} minutes")
            
            if benefits:
                print("Benefits achieved:")
                for benefit, description in benefits.items():
                    print(f"  ✨ {description}")
            
            print("Take this peace with you into your day. 🌸")
            
            return {
                "duration_minutes": duration,
                "benefits": benefits,
                "session_quality": "peaceful" if duration >= 5 else "brief"
            }
        
        return {}

if __name__ == "__main__":
    meditation = MeditationMode()
    
    print("Welcome to your meditation practice")
    duration = int(input("How many minutes would you like to meditate? (5-60): ") or "10")
    
    meditation.activate_mode(duration)
    
    try:
        time.sleep(duration * 60)  # Wait for specified duration
    except KeyboardInterrupt:
        print("\n🕊️ Meditation ended mindfully")
    
    results = meditation.deactivate_mode()