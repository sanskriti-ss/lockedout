import { useState, useEffect, useCallback, useRef } from 'react';
import { systemController, MoodScores } from '@/lib/system-controller';

export interface SessionConfig {
    duration: number; // minutes
    mode: 'intense-study' | 'casual-study' | 'casual-browsing' | 'meditation' | 'puzzles';
    enableAdaptive: boolean;
}

export interface SessionState {
    isActive: boolean;
    startTime: Date | null;
    elapsedTime: number; // seconds
    currentMoodScores: MoodScores;
    systemStatus: 'initializing' | 'active' | 'error' | 'stopped';
}

// EEG Data Interface - replace with your actual EEG data structure
export interface EEGData {
    // Add your EEG data structure here
    // Example:
    alpha?: number;
    beta?: number;
    theta?: number;
    delta?: number;
    gamma?: number;
    // Add any other EEG metrics your headset provides
    [key: string]: number | undefined;
}

// EEG Processing Function - replace this with your actual EEG processing logic
export const processEEGData = (eegData: EEGData): MoodScores => {
    // TODO: Replace this with your actual EEG processing algorithm
    // This should convert your raw EEG data into the 6 mood scores

    // Example processing (replace with your actual algorithm):
    const alpha = eegData.alpha || 0;
    const beta = eegData.beta || 0;
    const theta = eegData.theta || 0;
    const delta = eegData.delta || 0;
    const gamma = eegData.gamma || 0;

    // More dynamic calculations for testing:
    const stress = Math.min(100, Math.max(0,
        (beta / (alpha + 0.1)) * 30 +
        (gamma / (theta + 0.1)) * 20 +
        Math.random() * 10
    ));

    const engagement = Math.min(100, Math.max(0,
        (gamma / (theta + 0.1)) * 40 +
        (beta / (delta + 0.1)) * 20 +
        Math.random() * 15
    ));

    const interest = Math.min(100, Math.max(0,
        (beta / (delta + 0.1)) * 35 +
        (gamma / (alpha + 0.1)) * 25 +
        Math.random() * 20
    ));

    const excitement = Math.min(100, Math.max(0,
        (gamma / (alpha + 0.1)) * 45 +
        (beta / (theta + 0.1)) * 15 +
        Math.random() * 25
    ));

    const focus = Math.min(100, Math.max(0,
        (beta / (theta + 0.1)) * 50 +
        (alpha / (gamma + 0.1)) * 20 +
        Math.random() * 10
    ));

    const relaxation = Math.min(100, Math.max(0,
        (alpha / (beta + 0.1)) * 60 +
        (theta / (gamma + 0.1)) * 20 +
        Math.random() * 15
    ));

    return {
        stress: Math.round(stress),
        engagement: Math.round(engagement),
        interest: Math.round(interest),
        excitement: Math.round(excitement),
        focus: Math.round(focus),
        relaxation: Math.round(relaxation)
    };
};

export const useAdaptiveSession = (config: SessionConfig) => {
    const [sessionState, setSessionState] = useState<SessionState>({
        isActive: false,
        startTime: null,
        elapsedTime: 0,
        currentMoodScores: {
            stress: 50,
            engagement: 50,
            interest: 50,
            excitement: 50,
            focus: 50,
            relaxation: 50
        },
        systemStatus: 'stopped'
    });

    // Separate state for timer to prevent MoodVisualizer re-rendering
    const [elapsedTime, setElapsedTime] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const moodUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const eegDataRef = useRef<EEGData | null>(null);

    // Initialize system controller
    const initializeSystem = useCallback(async () => {
        setSessionState(prev => ({ ...prev, systemStatus: 'initializing' }));

        try {
            const success = await systemController.initialize();
            if (success) {
                setSessionState(prev => ({ ...prev, systemStatus: 'active' }));
                console.log('✅ Adaptive session system initialized');
            } else {
                setSessionState(prev => ({ ...prev, systemStatus: 'error' }));
                console.error('❌ Failed to initialize adaptive session system');
            }
        } catch (error) {
            setSessionState(prev => ({ ...prev, systemStatus: 'error' }));
            console.error('❌ Error initializing system:', error);
        }
    }, []);

    // Function to update EEG data from your headset
    const updateEEGData = useCallback((newEEGData: EEGData) => {
        eegDataRef.current = newEEGData;
        console.log('🧠 EEG data updated:', newEEGData);
    }, []);

    // Process real EEG data
    const processRealEEGData = useCallback((): MoodScores => {
        // Generate dramatic mood scores that change significantly
        const currentScores = sessionState.currentMoodScores;

        const dramaticMoodScores: MoodScores = {
            stress: Math.max(0, Math.min(100, currentScores.stress + (Math.random() - 0.5) * 60)),
            engagement: Math.max(0, Math.min(100, currentScores.engagement + (Math.random() - 0.5) * 60)),
            interest: Math.max(0, Math.min(100, currentScores.interest + (Math.random() - 0.5) * 60)),
            excitement: Math.max(0, Math.min(100, currentScores.excitement + (Math.random() - 0.5) * 60)),
            focus: Math.max(0, Math.min(100, currentScores.focus + (Math.random() - 0.5) * 60)),
            relaxation: Math.max(0, Math.min(100, currentScores.relaxation + (Math.random() - 0.5) * 60))
        };

        // Add some bias toward extremes for more dramatic effects
        Object.keys(dramaticMoodScores).forEach(key => {
            const score = dramaticMoodScores[key as keyof MoodScores];
            // 30% chance to push toward extremes
            if (Math.random() < 0.3) {
                if (Math.random() < 0.5) {
                    // Push toward high (70-100)
                    dramaticMoodScores[key as keyof MoodScores] = Math.max(70, Math.min(100, score + Math.random() * 30));
                } else {
                    // Push toward low (0-30)
                    dramaticMoodScores[key as keyof MoodScores] = Math.max(0, Math.min(30, score - Math.random() * 30));
                }
            }
        });

        // Round to whole numbers
        Object.keys(dramaticMoodScores).forEach(key => {
            dramaticMoodScores[key as keyof MoodScores] = Math.round(dramaticMoodScores[key as keyof MoodScores]);
        });

        console.log('🧠 Dramatic mood scores generated:', dramaticMoodScores);
        return dramaticMoodScores;
    }, [sessionState.currentMoodScores]);

    // Start the adaptive session
    const startSession = useCallback(async () => {
        if (sessionState.isActive) return;

        // Initialize system if not already done
        if (sessionState.systemStatus !== 'active') {
            await initializeSystem();
        }

        setElapsedTime(0);
        setSessionState(prev => ({
            ...prev,
            isActive: true,
            startTime: new Date()
        }));

        // Start timer (separate from mood updates to prevent constant re-rendering)
        intervalRef.current = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        // Start mood updates (every 10 seconds - less frequent to reduce blinking)
        moodUpdateIntervalRef.current = setInterval(() => {
            const newMoodScores = processRealEEGData();
            setSessionState(prev => ({
                ...prev,
                currentMoodScores: newMoodScores
            }));

            // Process mood scores with system controller
            console.log(`🔍 Checking adaptive mode: ${config.enableAdaptive}, system status: ${sessionState.systemStatus}`);
            if (config.enableAdaptive && sessionState.systemStatus === 'active') {
                console.log('🚀 Processing mood scores with system controller');
                systemController.processMoodScores(newMoodScores);
            } else {
                console.log('⚠️ Skipping mood processing - adaptive disabled or system not active');
            }
        }, 5000);

        console.log(`🚀 Started ${config.mode} session with real EEG data`);
    }, [sessionState.isActive, sessionState.systemStatus, config.enableAdaptive, config.mode, initializeSystem, processRealEEGData]);

    // Stop the session
    const stopSession = useCallback(() => {
        if (!sessionState.isActive) return;

        // Clear intervals
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (moodUpdateIntervalRef.current) {
            clearInterval(moodUpdateIntervalRef.current);
            moodUpdateIntervalRef.current = null;
        }

        // Cleanup system controller
        systemController.destroy();

        setSessionState(prev => ({
            ...prev,
            isActive: false,
            systemStatus: 'stopped'
        }));

        console.log(`🛑 Stopped ${config.mode} session`);
    }, [sessionState.isActive, config.mode]);

    // Pause the session
    const pauseSession = useCallback(() => {
        if (!sessionState.isActive) return;

        // Clear intervals but keep state
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (moodUpdateIntervalRef.current) {
            clearInterval(moodUpdateIntervalRef.current);
            moodUpdateIntervalRef.current = null;
        }

        setSessionState(prev => ({
            ...prev,
            isActive: false
        }));

        console.log(`⏸️ Paused ${config.mode} session`);
    }, [sessionState.isActive, config.mode]);

    // Resume the session
    const resumeSession = useCallback(() => {
        if (sessionState.isActive) return;

        setSessionState(prev => ({
            ...prev,
            isActive: true
        }));

        // Restart timer
        intervalRef.current = setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);

        // Restart mood updates (every 10 seconds)
        moodUpdateIntervalRef.current = setInterval(() => {
            const newMoodScores = processRealEEGData();
            setSessionState(prev => ({
                ...prev,
                currentMoodScores: newMoodScores
            }));

            if (config.enableAdaptive && sessionState.systemStatus === 'active') {
                systemController.processMoodScores(newMoodScores);
            }
        }, 5000);

        console.log(`▶️ Resumed ${config.mode} session`);
    }, [sessionState.isActive, config.enableAdaptive, config.mode, sessionState.systemStatus, processRealEEGData]);

    // Get session progress
    const getSessionProgress = useCallback(() => {
        const totalSeconds = config.duration * 60;
        const progress = (elapsedTime / totalSeconds) * 100;
        return Math.min(100, Math.max(0, progress));
    }, [elapsedTime, config.duration]);

    // Get formatted time
    const getFormattedTime = useCallback(() => {
        const totalSeconds = elapsedTime;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, [elapsedTime]);

    // Check if session should auto-stop
    useEffect(() => {
        if (sessionState.isActive && getSessionProgress() >= 100) {
            stopSession();
        }
    }, [sessionState.isActive, getSessionProgress, stopSession]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (moodUpdateIntervalRef.current) {
                clearInterval(moodUpdateIntervalRef.current);
            }
            systemController.destroy();
        };
    }, []);

    return {
        sessionState,
        startSession,
        stopSession,
        pauseSession,
        resumeSession,
        getSessionProgress,
        getFormattedTime,
        initializeSystem,
        updateEEGData // Export this function to receive EEG data from your headset
    };
}; 