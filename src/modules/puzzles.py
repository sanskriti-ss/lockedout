# Puzzles Mode - Brain Training and Cognitive Enhancement
# Comprehensive brain training system with progress tracking

import random
import time
from datetime import datetime, date
from typing import Dict, List, Tuple
import json

class PuzzlesMode:
    """
    Advanced brain training system with multiple cognitive exercises
    """
    
    def __init__(self):
        self.active = False
        self.session_start = None
        self.daily_progress = {}
        self.config = {
            "puzzle_types": {
                "memory": {
                    "name": "Memory Training",
                    "description": "Improve working memory and recall",
                    "difficulty_levels": ["easy", "medium", "hard", "expert"]
                },
                "logic": {
                    "name": "Logic Puzzles", 
                    "description": "Enhance reasoning and problem-solving",
                    "difficulty_levels": ["beginner", "intermediate", "advanced", "master"]
                },
                "attention": {
                    "name": "Attention Training",
                    "description": "Boost focus and concentration",
                    "difficulty_levels": ["basic", "standard", "challenging", "extreme"]
                },
                "processing": {
                    "name": "Processing Speed",
                    "description": "Increase mental agility and speed",
                    "difficulty_levels": ["slow", "medium", "fast", "lightning"]
                }
            },
            "achievements": {
                "first_session": "Brain Training Beginner",
                "daily_streak_7": "Week Warrior",
                "daily_streak_30": "Monthly Master",
                "perfect_score": "Perfection Achieved",
                "speed_demon": "Lightning Fast",
                "consistency": "Steady Progress"
            }
        }
    
    def generate_memory_puzzle(self, difficulty: str = "easy") -> Dict:
        """Generate a memory sequence puzzle"""
        sequence_lengths = {"easy": 4, "medium": 6, "hard": 8, "expert": 12}
        length = sequence_lengths.get(difficulty, 4)
        
        sequence = [random.randint(1, 9) for _ in range(length)]
        
        return {
            "type": "memory_sequence",
            "difficulty": difficulty,
            "sequence": sequence,
            "instructions": f"Memorize this {length}-digit sequence",
            "time_limit": length * 1.5  # seconds
        }
    
    def generate_logic_puzzle(self, difficulty: str = "beginner") -> Dict:
        """Generate a logic reasoning puzzle"""
        puzzles = {
            "beginner": {
                "question": "If A > B and B > C, what is the relationship between A and C?",
                "options": ["A > C", "A < C", "A = C", "Cannot determine"],
                "correct": 0
            },
            "intermediate": {
                "question": "Complete the pattern: 2, 6, 12, 20, 30, ?",
                "options": ["42", "40", "38", "44"],
                "correct": 0  # 42 (differences: 4,6,8,10,12)
            }
        }
        
        return puzzles.get(difficulty, puzzles["beginner"])
    
    def generate_attention_puzzle(self, difficulty: str = "basic") -> Dict:
        """Generate an attention/focus exercise"""
        grid_sizes = {"basic": 3, "standard": 4, "challenging": 5, "extreme": 6}
        grid_size = grid_sizes.get(difficulty, 3)
        
        # Generate grid with one different item
        grid = [["O" for _ in range(grid_size)] for _ in range(grid_size)]
        target_row = random.randint(0, grid_size - 1)
        target_col = random.randint(0, grid_size - 1)
        grid[target_row][target_col] = "X"
        
        return {
            "type": "find_different",
            "difficulty": difficulty,
            "grid": grid,
            "target": (target_row, target_col),
            "instructions": "Find the X among the O's",
            "time_limit": 10 + grid_size  # Adjust based on grid size
        }
    
    def generate_processing_speed_puzzle(self, difficulty: str = "slow") -> Dict:
        """Generate a processing speed challenge"""
        num_counts = {"slow": 10, "medium": 20, "fast": 35, "lightning": 50}
        count = num_counts.get(difficulty, 10)
        
        # Simple arithmetic challenge
        problems = []
        for _ in range(count):
            a = random.randint(1, 20)
            b = random.randint(1, 20)
            op = random.choice(["+", "-", "*"])
            
            if op == "+":
                answer = a + b
            elif op == "-":
                answer = a - b
            else:  # multiplication
                answer = a * b
                
            problems.append({
                "question": f"{a} {op} {b}",
                "answer": answer
            })
        
        return {
            "type": "arithmetic_speed",
            "difficulty": difficulty,
            "problems": problems,
            "instructions": f"Solve {count} problems as quickly as possible",
            "time_limit": count * 1.5  # seconds per problem
        }
    
    def get_daily_challenge(self) -> Dict:
        """Generate today's special challenge"""
        today = date.today().isoformat()
        random.seed(today)  # Same challenge for everyone on the same day
        
        puzzle_type = random.choice(list(self.config["puzzle_types"].keys()))
        difficulty = random.choice(self.config["puzzle_types"][puzzle_type]["difficulty_levels"])
        
        if puzzle_type == "memory":
            puzzle = self.generate_memory_puzzle(difficulty)
        elif puzzle_type == "logic":
            puzzle = self.generate_logic_puzzle(difficulty)
        elif puzzle_type == "attention":
            puzzle = self.generate_attention_puzzle(difficulty)
        else:
            puzzle = self.generate_processing_speed_puzzle(difficulty)
        
        puzzle["is_daily_challenge"] = True
        puzzle["bonus_points"] = 50
        
        return puzzle
    
    def calculate_score(self, puzzle: Dict, time_taken: float, accuracy: float) -> int:
        """Calculate performance score"""
        base_score = int(accuracy * 100)
        
        # Time bonus (faster = better)
        if time_taken < puzzle.get("time_limit", 30):
            time_bonus = int(((puzzle.get("time_limit", 30) - time_taken) / puzzle.get("time_limit", 30)) * 20)
            base_score += time_bonus
        
        # Difficulty bonus
        difficulty_bonuses = {
            "easy": 0, "medium": 10, "hard": 20, "expert": 30,
            "beginner": 0, "intermediate": 10, "advanced": 20, "master": 30,
            "basic": 0, "standard": 10, "challenging": 20, "extreme": 30,
            "slow": 0, "fast": 15, "lightning": 25
        }
        
        difficulty = puzzle.get("difficulty", "easy")
        base_score += difficulty_bonuses.get(difficulty, 0)
        
        # Daily challenge bonus
        if puzzle.get("is_daily_challenge", False):
            base_score += puzzle.get("bonus_points", 0)
        
        return min(200, base_score)  # Cap at 200 points
    
    def track_progress(self, puzzle_type: str, score: int):
        """Track user progress and achievements"""
        today = date.today().isoformat()
        
        if today not in self.daily_progress:
            self.daily_progress[today] = {}
        
        if puzzle_type not in self.daily_progress[today]:
            self.daily_progress[today][puzzle_type] = []
        
        self.daily_progress[today][puzzle_type].append({
            "score": score,
            "timestamp": datetime.now().isoformat()
        })
        
        # Check for achievements
        self.check_achievements()
    
    def check_achievements(self) -> List[str]:
        """Check and return any newly earned achievements"""
        earned_achievements = []
        
        # Daily streak achievement
        consecutive_days = self.get_consecutive_days()
        if consecutive_days == 7:
            earned_achievements.append("Week Warrior")
        elif consecutive_days == 30:
            earned_achievements.append("Monthly Master")
        
        # Perfect score achievement
        today_scores = self.get_today_scores()
        if any(score >= 150 for score in today_scores):
            earned_achievements.append("Perfection Achieved")
        
        return earned_achievements
    
    def get_consecutive_days(self) -> int:
        """Calculate consecutive days of brain training"""
        # Simplified implementation
        return len(self.daily_progress)
    
    def get_today_scores(self) -> List[int]:
        """Get all scores from today"""
        today = date.today().isoformat()
        scores = []
        
        if today in self.daily_progress:
            for puzzle_type, sessions in self.daily_progress[today].items():
                scores.extend([session["score"] for session in sessions])
        
        return scores
    
    def get_analytics(self) -> Dict:
        """Provide comprehensive brain training analytics"""
        total_sessions = sum(
            len(sessions) for day_data in self.daily_progress.values()
            for sessions in day_data.values()
        )
        
        all_scores = []
        for day_data in self.daily_progress.values():
            for sessions in day_data.values():
                all_scores.extend([session["score"] for session in sessions])
        
        return {
            "total_sessions": total_sessions,
            "average_score": sum(all_scores) / len(all_scores) if all_scores else 0,
            "best_score": max(all_scores) if all_scores else 0,
            "consecutive_days": self.get_consecutive_days(),
            "favorite_puzzle_type": self.get_most_played_type(),
            "improvement_trend": self.calculate_improvement_trend()
        }
    
    def get_most_played_type(self) -> str:
        """Find the most frequently played puzzle type"""
        type_counts = {}
        
        for day_data in self.daily_progress.values():
            for puzzle_type, sessions in day_data.items():
                type_counts[puzzle_type] = type_counts.get(puzzle_type, 0) + len(sessions)
        
        return max(type_counts.items(), key=lambda x: x[1])[0] if type_counts else "memory"
    
    def calculate_improvement_trend(self) -> str:
        """Calculate if user is improving over time"""
        # Simplified trend calculation
        recent_scores = self.get_today_scores()
        if not recent_scores:
            return "No data"
        
        avg_recent = sum(recent_scores) / len(recent_scores)
        return "Improving" if avg_recent > 70 else "Steady" if avg_recent > 50 else "Developing"
    
    def activate_mode(self) -> Dict[str, bool]:
        """Start brain training session"""
        self.session_start = datetime.now()
        self.active = True
        
        print("🧠 Brain Training Mode: Cognitive enhancement begins!")
        print("💡 Tip: Consistency is key to cognitive improvement")
        print("🎯 Today's goal: Challenge yourself while having fun")
        
        # Show daily challenge
        daily_challenge = self.get_daily_challenge()
        print(f"\n🌟 Today's Challenge: {daily_challenge['type']} ({daily_challenge['difficulty']})")
        
        return {"session_started": True, "daily_challenge_ready": True}
    
    def deactivate_mode(self) -> Dict[str, any]:
        """End brain training session"""
        self.active = False
        analytics = self.get_analytics()
        
        if self.session_start:
            duration = (datetime.now() - self.session_start).total_seconds() / 60
            
            print(f"\n🏆 Brain Training Session Complete!")
            print(f"   Duration: {duration:.1f} minutes")
            print(f"   Sessions today: {len(self.get_today_scores())}")
            print(f"   Average score: {analytics['average_score']:.1f}")
            print(f"   Improvement trend: {analytics['improvement_trend']}")
            
            # Show any new achievements
            new_achievements = self.check_achievements()
            if new_achievements:
                print("\n🎉 New Achievements:")
                for achievement in new_achievements:
                    print(f"   🏅 {achievement}")
        
        return analytics

if __name__ == "__main__":
    brain_training = PuzzlesMode()
    brain_training.activate_mode()
    
    # Demo a quick puzzle
    memory_puzzle = brain_training.generate_memory_puzzle("medium")
    print(f"\nSample puzzle: {memory_puzzle['instructions']}")
    print(f"Sequence: {memory_puzzle['sequence']}")
    
    input("\nPress Enter to end brain training session...")
    
    # Simulate completing a puzzle
    brain_training.track_progress("memory", 85)
    brain_training.deactivate_mode()