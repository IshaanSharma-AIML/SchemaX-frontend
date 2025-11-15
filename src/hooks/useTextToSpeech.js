// Custom hook for text-to-speech functionality
// Provides speech synthesis capabilities using the Web Speech API
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for text-to-speech using Web Speech Synthesis API
 * @returns {Object} TTS state and controls
 */
export const useTextToSpeech = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [rate, setRate] = useState(1.0); // Speech rate (0.1 to 10)
    const [pitch, setPitch] = useState(1.0); // Pitch (0 to 2)
    const [volume, setVolume] = useState(1.0); // Volume (0 to 1)
    const [isSupported, setIsSupported] = useState(false); // Start as false to avoid hydration mismatch
    const utteranceRef = useRef(null);

    useEffect(() => {
        // Check support only on client side to avoid hydration mismatch
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            setIsSupported(true);
        } else {
            setIsSupported(false);
            return;
        }

        // Load available voices
        const loadVoices = () => {
            if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
            
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
            
            // Set default voice (prefer English voices)
            if (availableVoices.length > 0 && !selectedVoice) {
                const englishVoice = availableVoices.find(
                    voice => voice.lang.startsWith('en')
                ) || availableVoices[0];
                setSelectedVoice(englishVoice);
            }
        };

        loadVoices();
        
        // Some browsers load voices asynchronously
        if (typeof window !== 'undefined' && window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        // Cleanup on unmount
        return () => {
            if (typeof window !== 'undefined' && utteranceRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, [selectedVoice]);

    const speak = (text, options = {}) => {
        if (!isSupported || typeof window === 'undefined' || !('speechSynthesis' in window)) {
            console.warn('Speech synthesis is not supported in your browser.');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        // Create new utterance
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice
        if (options.voice || selectedVoice) {
            utterance.voice = options.voice || selectedVoice;
        }
        
        // Set speech parameters
        utterance.rate = options.rate || rate;
        utterance.pitch = options.pitch || pitch;
        utterance.volume = options.volume || volume;
        utterance.lang = options.lang || selectedVoice?.lang || 'en-US';

        // Event handlers
        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            if (options.onstart) options.onstart();
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            utteranceRef.current = null;
            if (options.onend) options.onend();
        };

        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            setIsSpeaking(false);
            setIsPaused(false);
            utteranceRef.current = null;
            if (options.onerror) options.onerror(event);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const pause = () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                window.speechSynthesis.pause();
                setIsPaused(true);
            }
        }
    };

    const resume = () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                setIsPaused(false);
            }
        }
    };

    const stop = () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        setIsPaused(false);
        utteranceRef.current = null;
    };

    const toggle = () => {
        if (isSpeaking) {
            if (isPaused) {
                resume();
            } else {
                pause();
            }
        }
    };

    return {
        isSupported,
        isSpeaking,
        isPaused,
        voices,
        selectedVoice,
        rate,
        pitch,
        volume,
        speak,
        pause,
        resume,
        stop,
        toggle,
        setSelectedVoice,
        setRate,
        setPitch,
        setVolume,
    };
};

