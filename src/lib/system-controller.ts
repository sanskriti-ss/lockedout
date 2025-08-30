// System Controller - Handles all system-level integrations
// Controls brightness, volume, notifications, overlays, etc.

import { nativeIntegration } from './native-integration';

export interface MoodScores {
    stress: number;      // 0-100
    engagement: number;  // 0-100
    interest: number;    // 0-100
    excitement: number;  // 0-100
    focus: number;       // 0-100
    relaxation: number;  // 0-100
}

export interface SystemState {
    brightness: number;  // 0-100
    volume: number;      // 0-100
    colorFilter: 'none' | 'warm' | 'cool' | 'dark';
    notifications: boolean;
    overlay: 'none' | 'breathing' | 'pomodoro' | 'notes';
    musicType: 'none' | 'lofi' | 'upbeat' | 'ambient' | 'white-noise';
}

export class SystemController {
    private currentState: SystemState;
    private isActive: boolean = false;
    private overlayElement: HTMLElement | null = null;
    private breathingAnimation: any = null;

    constructor() {
        this.currentState = {
            brightness: 50,
            volume: 30,
            colorFilter: 'none',
            notifications: true,
            overlay: 'none',
            musicType: 'none'
        };
    }

    // Initialize system permissions and setup
    async initialize(): Promise<boolean> {
        try {
            console.log('🔧 Initializing System Controller...');

            // Initialize native integration
            const nativeSuccess = await nativeIntegration.initialize();
            if (!nativeSuccess) {
                console.warn('⚠️ Native integration failed, continuing with limited functionality');
            }

            // Create overlay container
            this.createOverlayContainer();

            // Set initial system state
            await this.applySystemState(this.currentState);

            this.isActive = true;
            console.log('✅ System Controller initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ System Controller initialization failed:', error);
            return false;
        }
    }

    // Request system permissions (deprecated - now handled by native integration)
    private async requestPermissions(): Promise<void> {
        // This method is now deprecated as permissions are handled by native integration
        console.log('ℹ️ Permissions now handled by native integration');
    }

    // Create overlay container for breathing exercises, pomodoro, etc.
    private createOverlayContainer(): void {
        const overlay = document.createElement('div');
        overlay.id = 'lockedout-overlay';
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.8);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(10px);
    `;
        document.body.appendChild(overlay);
        this.overlayElement = overlay;
    }

    // Main method to process mood scores and apply adaptive changes
    async processMoodScores(scores: MoodScores): Promise<void> {
        if (!this.isActive) return;

        console.log('🧠 Processing mood scores:', scores);

        // Process each quality and apply appropriate actions
        await this.processStress(scores.stress);
        await this.processEngagement(scores.engagement);
        await this.processInterest(scores.interest);
        await this.processExcitement(scores.excitement);
        await this.processFocus(scores.focus);
        await this.processRelaxation(scores.relaxation);

        // Apply the final system state
        await this.applySystemState(this.currentState);
    }

    // Process Stress levels
    private async processStress(score: number): Promise<void> {
        if (score < 30) { // Low stress
            this.currentState.musicType = 'lofi';
            this.currentState.brightness = Math.max(this.currentState.brightness, 70);
            this.currentState.volume = Math.max(this.currentState.volume, 40);
        } else if (score > 70) { // High stress
            this.currentState.overlay = 'breathing';
            this.currentState.notifications = false;
            this.currentState.brightness = Math.min(this.currentState.brightness, 40);
            this.currentState.volume = Math.min(this.currentState.volume, 20);
        } else { // Medium stress
            this.currentState.brightness = Math.min(this.currentState.brightness, 60);
            this.currentState.volume = Math.min(this.currentState.volume, 30);
        }
    }

    // Process Engagement levels
    private async processEngagement(score: number): Promise<void> {
        if (score < 30) { // Low engagement
            this.showNotification('Micro Goal', 'Try setting a small, achievable goal for the next 10 minutes');
        } else if (score > 70) { // High engagement
            // Suggest pause after 60 minutes of focused work
            this.showNotification('Break Reminder', 'You\'ve been highly engaged for a while. Consider a short break.');
        }
    }

    // Process Interest levels
    private async processInterest(score: number): Promise<void> {
        if (score < 30) { // Low interest
            this.currentState.brightness = Math.max(this.currentState.brightness, 80);
            this.currentState.overlay = 'none';
            // Auto-cycle visual stimuli could be implemented here
        } else if (score > 70) { // High interest
            this.currentState.overlay = 'notes';
            this.showNotification('Insight Capture', 'Your interest is high! Consider jotting down your thoughts.');
        }
    }

    // Process Excitement levels
    private async processExcitement(score: number): Promise<void> {
        if (score < 30) { // Low excitement
            this.currentState.musicType = 'upbeat';
            this.currentState.volume = Math.max(this.currentState.volume, 50);
        } else if (score > 70) { // High excitement
            this.currentState.musicType = 'white-noise';
            this.currentState.volume = Math.min(this.currentState.volume, 25);
            this.currentState.colorFilter = 'dark';
        } else { // Medium excitement
            this.currentState.musicType = 'ambient';
            this.currentState.volume = 35;
        }
    }

    // Process Focus levels
    private async processFocus(score: number): Promise<void> {
        if (score < 30) { // Low focus
            this.showNotification('Distraction Block', 'Focus is low. Consider blocking distracting websites.');
            // Website blocking would be handled by teammate's module
        } else if (score > 70) { // High focus
            this.currentState.overlay = 'pomodoro';
            this.showNotification('Micro Break', 'You\'re highly focused! Take a 2-minute micro break.');
        } else { // Medium focus
            this.currentState.overlay = 'pomodoro';
        }
    }

    // Process Relaxation levels
    private async processRelaxation(score: number): Promise<void> {
        if (score < 30) { // Low relaxation
            this.currentState.overlay = 'breathing';
            this.showNotification('Social Connection', 'Relaxation is low. Consider messaging a friend.');
        } else if (score > 70) { // High relaxation
            this.currentState.colorFilter = 'warm';
            this.currentState.musicType = 'ambient';
            this.showNotification('Rest Suggestion', 'You\'re very relaxed. Consider a short nap or white noise.');
        } else { // Medium relaxation
            this.currentState.colorFilter = 'warm';
            this.currentState.musicType = 'ambient';
        }
    }

    // Apply system state changes
    private async applySystemState(state: SystemState): Promise<void> {
        try {
            // Apply brightness (simulated - would need native integration)
            await this.setBrightness(state.brightness);

            // Apply volume (simulated - would need native integration)
            await this.setVolume(state.volume);

            // Apply color filter
            this.applyColorFilter(state.colorFilter);

            // Apply overlay
            this.applyOverlay(state.overlay);

            // Apply music type (would integrate with teammate's Spotify module)
            this.applyMusicType(state.musicType);

            console.log('✅ System state applied:', state);
        } catch (error) {
            console.error('❌ Failed to apply system state:', error);
        }
    }

    // Set screen brightness
    private async setBrightness(level: number): Promise<void> {
        await nativeIntegration.setBrightness(level);
    }

    // Set system volume
    private async setVolume(level: number): Promise<void> {
        await nativeIntegration.setVolume(level);
    }

    // Apply color filter
    private applyColorFilter(filter: 'none' | 'warm' | 'cool' | 'dark'): void {
        nativeIntegration.applyColorFilter(filter);
    }

    // Apply overlay
    private applyOverlay(type: 'none' | 'breathing' | 'pomodoro' | 'notes'): void {
        if (!this.overlayElement) return;

        if (type === 'none') {
            this.overlayElement.style.display = 'none';
            return;
        }

        this.overlayElement.style.display = 'flex';

        switch (type) {
            case 'breathing':
                this.showBreathingOverlay();
                break;
            case 'pomodoro':
                this.showPomodoroOverlay();
                break;
            case 'notes':
                this.showNotesOverlay();
                break;
        }
    }

    // Show breathing exercise overlay
    private showBreathingOverlay(): void {
        if (!this.overlayElement) return;

        this.overlayElement.innerHTML = `
      <div class="breathing-container" style="text-align: center; color: white;">
        <div class="breathing-circle" style="
          width: 200px;
          height: 200px;
          border: 3px solid white;
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          animation: breathe 4s ease-in-out infinite;
        ">Breathe</div>
        <h2 style="margin-bottom: 10px;">4-7-8 Breathing</h2>
        <p>Inhale for 4, hold for 7, exhale for 8</p>
        <button onclick="this.parentElement.parentElement.style.display='none'" 
                style="margin-top: 20px; padding: 10px 20px; background: white; color: black; border: none; border-radius: 5px; cursor: pointer;">
          Close
        </button>
      </div>
      <style>
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      </style>
    `;
    }

    // Show pomodoro timer overlay
    private showPomodoroOverlay(): void {
        if (!this.overlayElement) return;

        this.overlayElement.innerHTML = `
      <div class="pomodoro-container" style="text-align: center; color: white;">
        <h2 style="margin-bottom: 20px;">Pomodoro Timer</h2>
        <div class="timer" style="font-size: 48px; font-weight: bold; margin-bottom: 20px;">25:00</div>
        <div class="controls" style="display: flex; gap: 10px; justify-content: center;">
          <button onclick="this.parentElement.parentElement.style.display='none'" 
                  style="padding: 10px 20px; background: white; color: black; border: none; border-radius: 5px; cursor: pointer;">
            Close
          </button>
        </div>
      </div>
    `;
    }

    // Show notes overlay
    private showNotesOverlay(): void {
        if (!this.overlayElement) return;

        this.overlayElement.innerHTML = `
      <div class="notes-container" style="text-align: center; color: white; max-width: 500px;">
        <h2 style="margin-bottom: 20px;">Quick Notes</h2>
        <textarea placeholder="Capture your thoughts here..." 
                  style="width: 100%; height: 200px; padding: 15px; border: none; border-radius: 5px; font-size: 16px; resize: vertical;"></textarea>
        <div style="margin-top: 15px;">
          <button onclick="this.parentElement.parentElement.style.display='none'" 
                  style="padding: 10px 20px; background: white; color: black; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">
            Save & Close
          </button>
          <button onclick="this.parentElement.parentElement.style.display='none'" 
                  style="padding: 10px 20px; background: transparent; color: white; border: 1px solid white; border-radius: 5px; cursor: pointer;">
            Close
          </button>
        </div>
      </div>
    `;
    }

    // Apply music type (would integrate with teammate's Spotify module)
    private applyMusicType(type: 'none' | 'lofi' | 'upbeat' | 'ambient' | 'white-noise'): void {
        // This would integrate with the Spotify controller
        console.log(`🎵 Music type set to: ${type}`);
    }

    // Show notification
    private async showNotification(title: string, message: string): Promise<void> {
        await nativeIntegration.showNotification(title, message);
    }

    // Cleanup
    destroy(): void {
        this.isActive = false;
        if (this.overlayElement) {
            this.overlayElement.remove();
        }
        // Cleanup native integration
        nativeIntegration.destroy();
        console.log('🧹 System Controller cleaned up');
    }
}

// Export singleton instance
export const systemController = new SystemController(); 