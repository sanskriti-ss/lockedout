// Native Integration Helper
// Handles system-level permissions and controls

export interface SystemPermissions {
    notifications: boolean;
    screenWakeLock: boolean;
    clipboard: boolean;
    fullscreen: boolean;
}

export interface SystemCapabilities {
    brightnessControl: boolean;
    volumeControl: boolean;
    colorFilter: boolean;
    overlaySupport: boolean;
}

export class NativeIntegration {
    private permissions: SystemPermissions = {
        notifications: false,
        screenWakeLock: false,
        clipboard: false,
        fullscreen: false
    };

    private capabilities: SystemCapabilities = {
        brightnessControl: false,
        volumeControl: false,
        colorFilter: true, // CSS-based, always available
        overlaySupport: true // DOM-based, always available
    };

    private wakeLock: any = null;
    private lastBrightness: number = 50;

    // Initialize and check system capabilities
    async initialize(): Promise<boolean> {
        try {
            console.log('🔧 Initializing Native Integration...');

            // Check and request permissions
            await this.checkPermissions();

            // Detect system capabilities
            this.detectCapabilities();

            console.log('✅ Native Integration initialized');
            console.log('📋 Permissions:', this.permissions);
            console.log('⚡ Capabilities:', this.capabilities);

            return true;
        } catch (error) {
            console.error('❌ Native Integration initialization failed:', error);
            return false;
        }
    }

    // Check and request system permissions
    private async checkPermissions(): Promise<void> {
        // Notification permissions
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                const permission = await Notification.requestPermission();
                this.permissions.notifications = permission === 'granted';
            } else {
                this.permissions.notifications = Notification.permission === 'granted';
            }
        }

        // Screen wake lock
        if ('wakeLock' in navigator) {
            try {
                this.wakeLock = await navigator.wakeLock.request('screen');
                this.permissions.screenWakeLock = true;
            } catch (error) {
                console.warn('⚠️ Screen wake lock not available:', error);
                this.permissions.screenWakeLock = false;
            }
        }

        // Clipboard permissions
        if ('clipboard' in navigator && 'writeText' in navigator.clipboard) {
            try {
                await navigator.clipboard.writeText('test');
                this.permissions.clipboard = true;
            } catch (error) {
                console.warn('⚠️ Clipboard access not available:', error);
                this.permissions.clipboard = false;
            }
        }

        // Fullscreen permissions
        if ('requestFullscreen' in document.documentElement) {
            this.permissions.fullscreen = true;
        }
    }

    // Detect system capabilities
    private detectCapabilities(): void {
        // Brightness control - would need native integration
        // For now, we'll simulate it with CSS
        this.capabilities.brightnessControl = true;

        // Volume control - would need native integration
        // For now, we'll simulate it
        this.capabilities.volumeControl = true;
    }

    // Set screen brightness (0-100)
    async setBrightness(level: number): Promise<boolean> {
        if (!this.capabilities.brightnessControl) {
            console.warn('⚠️ Brightness control not available');
            return false;
        }

        try {
            const normalizedLevel = Math.max(0, Math.min(100, level));

            // Only change brightness if it's significantly different (prevent flickering)
            if (Math.abs(normalizedLevel - this.lastBrightness) < 5) {
                return true; // Skip small changes
            }

            this.lastBrightness = normalizedLevel;

            // Create or update a brightness overlay that doesn't affect UI cards
            let brightnessOverlay = document.getElementById('brightness-overlay');
            if (!brightnessOverlay) {
                brightnessOverlay = document.createElement('div');
                brightnessOverlay.id = 'brightness-overlay';
                brightnessOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    pointer-events: none;
                    z-index: 9998;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(brightnessOverlay);
            }

            // Calculate overlay opacity based on brightness level
            let opacity = 0;
            if (normalizedLevel < 50) {
                // Darken the page
                opacity = (50 - normalizedLevel) / 100;
                brightnessOverlay.style.background = `rgba(0, 0, 0, ${opacity})`;
            } else if (normalizedLevel > 50) {
                // Brighten the page
                opacity = (normalizedLevel - 50) / 100;
                brightnessOverlay.style.background = `rgba(255, 255, 255, ${opacity})`;
            } else {
                // Normal brightness
                brightnessOverlay.style.background = 'transparent';
            }

            console.log(`💡 Full page brightness set to ${normalizedLevel}% (overlay opacity: ${opacity.toFixed(2)}) - Previous: ${this.lastBrightness}`);
            return true;
        } catch (error) {
            console.error('❌ Failed to set brightness:', error);
            return false;
        }
    }

    // Set system volume (0-100)
    async setVolume(level: number): Promise<boolean> {
        if (!this.capabilities.volumeControl) {
            console.warn('⚠️ Volume control not available');
            return false;
        }

        try {
            // Simulate volume control
            // In a real implementation, this would use native APIs
            const normalizedLevel = Math.max(0, Math.min(100, level));

            console.log(`🔊 Volume set to ${normalizedLevel}%`);
            return true;
        } catch (error) {
            console.error('❌ Failed to set volume:', error);
            return false;
        }
    }

    // Apply color filter
    applyColorFilter(filter: 'none' | 'warm' | 'cool' | 'dark'): boolean {
        if (!this.capabilities.colorFilter) {
            console.warn('⚠️ Color filter not available');
            return false;
        }

        try {
            const filters = {
                none: '',
                warm: 'sepia(0.3) hue-rotate(30deg) saturate(1.1)',
                cool: 'hue-rotate(180deg) saturate(1.2) brightness(0.9)',
                dark: 'brightness(0.7) contrast(1.2) saturate(0.8)'
            };

            document.documentElement.style.filter = filters[filter];
            console.log(`🎨 Color filter applied: ${filter}`);
            return true;
        } catch (error) {
            console.error('❌ Failed to apply color filter:', error);
            return false;
        }
    }

    // Show system notification
    async showNotification(title: string, message: string, options?: NotificationOptions): Promise<boolean> {
        if (!this.permissions.notifications) {
            console.warn('⚠️ Notification permission not granted');
            return false;
        }

        try {
            const notification = new Notification(title, {
                body: message,
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                tag: 'lockedout-notification',
                requireInteraction: false,
                ...options
            });

            // Auto-close after 5 seconds
            setTimeout(() => {
                notification.close();
            }, 5000);

            console.log(`📢 Notification sent: ${title}`);
            return true;
        } catch (error) {
            console.error('❌ Failed to show notification:', error);
            return false;
        }
    }

    // Request fullscreen
    async requestFullscreen(): Promise<boolean> {
        if (!this.permissions.fullscreen) {
            console.warn('⚠️ Fullscreen not available');
            return false;
        }

        try {
            await document.documentElement.requestFullscreen();
            console.log('🖥️ Fullscreen mode activated');
            return true;
        } catch (error) {
            console.error('❌ Failed to enter fullscreen:', error);
            return false;
        }
    }

    // Exit fullscreen
    async exitFullscreen(): Promise<boolean> {
        if (!this.permissions.fullscreen) {
            return false;
        }

        try {
            await document.exitFullscreen();
            console.log('🖥️ Fullscreen mode deactivated');
            return true;
        } catch (error) {
            console.error('❌ Failed to exit fullscreen:', error);
            return false;
        }
    }

    // Copy text to clipboard
    async copyToClipboard(text: string): Promise<boolean> {
        if (!this.permissions.clipboard) {
            console.warn('⚠️ Clipboard access not available');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            console.log('📋 Text copied to clipboard');
            return true;
        } catch (error) {
            console.error('❌ Failed to copy to clipboard:', error);
            return false;
        }
    }

    // Keep screen awake
    async keepScreenAwake(): Promise<boolean> {
        if (!this.permissions.screenWakeLock) {
            console.warn('⚠️ Screen wake lock not available');
            return false;
        }

        try {
            if (!this.wakeLock) {
                this.wakeLock = await navigator.wakeLock.request('screen');
            }
            console.log('👁️ Screen wake lock activated');
            return true;
        } catch (error) {
            console.error('❌ Failed to activate screen wake lock:', error);
            return false;
        }
    }

    // Release screen wake lock
    async releaseScreenWakeLock(): Promise<boolean> {
        if (!this.permissions.screenWakeLock || !this.wakeLock) {
            return false;
        }

        try {
            await this.wakeLock.release();
            this.wakeLock = null;
            console.log('👁️ Screen wake lock released');
            return true;
        } catch (error) {
            console.error('❌ Failed to release screen wake lock:', error);
            return false;
        }
    }

    // Get current permissions
    getPermissions(): SystemPermissions {
        return { ...this.permissions };
    }

    // Get current capabilities
    getCapabilities(): SystemCapabilities {
        return { ...this.capabilities };
    }

    // Check if a specific permission is granted
    hasPermission(permission: keyof SystemPermissions): boolean {
        return this.permissions[permission];
    }

    // Check if a specific capability is available
    hasCapability(capability: keyof SystemCapabilities): boolean {
        return this.capabilities[capability];
    }

    // Cleanup
    destroy(): void {
        if (this.wakeLock) {
            this.releaseScreenWakeLock();
        }

        // Remove brightness overlay
        const brightnessOverlay = document.getElementById('brightness-overlay');
        if (brightnessOverlay) {
            brightnessOverlay.remove();
        }

        // Reset any applied filters
        document.documentElement.style.filter = '';

        console.log('🧹 Native Integration cleaned up');
    }
}

// Export singleton instance
export const nativeIntegration = new NativeIntegration(); 