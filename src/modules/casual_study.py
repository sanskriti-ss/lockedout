# Casual Study Mode - Relaxed Learning Environment
# Gentle productivity enhancement without aggressive blocking

import time
from typing import Dict, List
import threading

class CasualStudyMode:
    """
    Provides a comfortable, non-intrusive study environment
    """
    
    def __init__(self):
        self.active = False
        self.timer_thread = None
        self.config = {
            "break_interval": 25,  # minutes
            "ambient_sounds": True,
            "gentle_reminders": True,
            "focus_suggestions": [
                "Take a deep breath and center yourself",
                "Remember your learning goals", 
                "Stay curious and engaged",
                "It's okay to take breaks when needed"
            ]
        }
    
    def start_ambient_sounds(self) -> bool:
        """Start gentle background sounds for focus"""
        try:
            print("🎶 Starting ambient study sounds...")
            # Integration with audio system or web audio API
            return True
        except Exception as e:
            print(f"❌ Audio setup failed: {e}")
            return False
    
    def setup_gentle_reminders(self) -> bool:
        """Setup non-intrusive break reminders"""
        def reminder_loop():
            while self.active:
                time.sleep(self.config["break_interval"] * 60)  # Convert to seconds
                if self.active:
                    self.show_gentle_reminder()
        
        try:
            self.timer_thread = threading.Thread(target=reminder_loop, daemon=True)
            self.timer_thread.start()
            print(f"⏰ Break reminders set for every {self.config['break_interval']} minutes")
            return True
        except Exception as e:
            print(f"❌ Reminder setup failed: {e}")
            return False
    
    def show_gentle_reminder(self):
        """Display a soft, non-disruptive reminder"""
        import random
        suggestion = random.choice(self.config["focus_suggestions"])
        print(f"💡 Gentle reminder: {suggestion}")
        # Could integrate with system notifications or web notifications
    
    def activate_mode(self) -> Dict[str, bool]:
        """Activate casual study environment"""
        results = {
            "ambient_sounds": self.start_ambient_sounds(),
            "reminders": self.setup_gentle_reminders()
        }
        
        self.active = True
        print("📚 Casual Study Mode activated - Happy learning!")
        return results
    
    def deactivate_mode(self) -> bool:
        """Gently wind down the study session"""
        self.active = False
        print("🌟 Study session complete. Great work!")
        return True

if __name__ == "__main__":
    study_mode = CasualStudyMode()
    study_mode.activate_mode()
    
    # Keep running until user stops
    try:
        input("Press Enter to end casual study session...")
    except KeyboardInterrupt:
        pass
    
    study_mode.deactivate_mode()