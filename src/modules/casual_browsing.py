# Casual Browsing Mode - Mindful Internet Usage
# Time tracking and gentle guidance for healthy browsing habits

import time
from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import json

class CasualBrowsingMode:
    """
    Monitor and guide internet usage with mindful browsing techniques
    """
    
    def __init__(self):
        self.active = False
        self.session_start = None
        self.site_usage = {}
        self.config = {
            "mindful_break_interval": 30,  # minutes
            "daily_time_limit": 180,  # minutes (3 hours)
            "mindful_sites": [
                "wikipedia.org",
                "coursera.org", 
                "khanacademy.org",
                "ted.com"
            ],
            "time_warning_sites": [
                "youtube.com",
                "reddit.com",
                "twitter.com",
                "facebook.com",
                "instagram.com"
            ]
        }
    
    def start_time_tracking(self) -> bool:
        """Begin monitoring browsing time and patterns"""
        try:
            self.session_start = datetime.now()
            print("⏱️ Starting mindful browsing session...")
            print("💡 Tip: Take breaks every 30 minutes for optimal digital wellness")
            return True
        except Exception as e:
            print(f"❌ Time tracking setup failed: {e}")
            return False
    
    def log_site_visit(self, domain: str, duration_minutes: float):
        """Track time spent on specific sites"""
        if domain not in self.site_usage:
            self.site_usage[domain] = 0
        self.site_usage[domain] += duration_minutes
        
        # Provide mindful feedback
        if domain in self.config["time_warning_sites"]:
            if self.site_usage[domain] > 15:  # More than 15 minutes
                self.show_mindful_reminder(domain)
    
    def show_mindful_reminder(self, domain: str):
        """Gentle reminder for mindful browsing"""
        total_time = self.site_usage[domain]
        print(f"🧘 Mindful moment: You've spent {total_time:.1f} minutes on {domain}")
        print("💭 Consider: Is this time serving your goals?")
    
    def get_usage_analytics(self) -> Dict[str, any]:
        """Provide insights into browsing patterns"""
        if not self.session_start:
            return {}
        
        session_duration = (datetime.now() - self.session_start).total_seconds() / 60
        
        analytics = {
            "session_duration_minutes": round(session_duration, 1),
            "sites_visited": len(self.site_usage),
            "top_sites": sorted(
                self.site_usage.items(), 
                key=lambda x: x[1], 
                reverse=True
            )[:5],
            "mindful_browsing_score": self.calculate_mindfulness_score()
        }
        
        return analytics
    
    def calculate_mindfulness_score(self) -> int:
        """Calculate a score based on mindful browsing habits"""
        if not self.site_usage:
            return 100
        
        mindful_time = sum(
            time for site, time in self.site_usage.items() 
            if site in self.config["mindful_sites"]
        )
        
        total_time = sum(self.site_usage.values())
        
        if total_time == 0:
            return 100
        
        mindfulness_ratio = mindful_time / total_time
        base_score = int(mindfulness_ratio * 100)
        
        # Bonus for shorter sessions
        if total_time < 60:  # Less than 1 hour
            base_score += 10
        
        return min(100, base_score)
    
    def setup_content_filtering(self) -> bool:
        """Setup gentle content filtering and suggestions"""
        print("🛡️ Content filtering guidelines active:")
        print("  • Promoting educational and positive content")
        print("  • Gentle nudges away from time-wasting sites")
        print("  • Mindful browsing suggestions")
        return True
    
    def activate_mode(self) -> Dict[str, bool]:
        """Start mindful browsing session"""
        results = {
            "time_tracking": self.start_time_tracking(),
            "content_filtering": self.setup_content_filtering()
        }
        
        self.active = True
        print("🌐 Casual Browsing Mode: Mindful internet exploration begins")
        return results
    
    def deactivate_mode(self) -> Dict[str, any]:
        """End session and provide analytics"""
        self.active = False
        analytics = self.get_usage_analytics()
        
        print("\n📊 Browsing Session Summary:")
        print(f"  Duration: {analytics.get('session_duration_minutes', 0):.1f} minutes")
        print(f"  Mindfulness Score: {analytics.get('mindful_browsing_score', 0)}/100")
        
        if analytics.get('top_sites'):
            print("  Top Sites:")
            for site, time in analytics['top_sites'][:3]:
                print(f"    • {site}: {time:.1f} minutes")
        
        return analytics

if __name__ == "__main__":
    browsing_mode = CasualBrowsingMode()
    browsing_mode.activate_mode()
    
    # Simulate some browsing
    browsing_mode.log_site_visit("youtube.com", 20)
    browsing_mode.log_site_visit("wikipedia.org", 15)
    
    input("Press Enter to end browsing session...")
    
    analytics = browsing_mode.deactivate_mode()