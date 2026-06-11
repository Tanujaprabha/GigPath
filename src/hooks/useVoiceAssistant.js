import { useState, useEffect, useRef, useCallback } from 'react';

export const useVoiceAssistant = ({ onResult, onError, language = 'en' }) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const retryCount = useRef(0);
  const isManuallyStopped = useRef(false);
  const MAX_RETRIES = 1;

  // Keep latest callbacks in refs so we don't recreate the SpeechRecognition instance constantly
  const onResultRef = useRef(onResult);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onResultRef.current = onResult;
    onErrorRef.current = onError;
  }, [onResult, onError]);

  useEffect(() => {
    console.log("[Voice Assistant] Initializing browser detection...");
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      if (isFirefox) {
        console.warn("[Voice Assistant] Firefox does not support SpeechRecognition. Please type your query.");
      } else {
        console.warn("[Voice Assistant] SpeechRecognition API not supported in this browser.");
      }
      Promise.resolve().then(() => setSupported(false));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Language will be set dynamically before starting

    recognition.onstart = () => {
      console.log("Voice Assistant: Microphone active, listening...");
      setIsListening(true);
      isManuallyStopped.current = false;
      retryCount.current = 0; // reset on successful start
    };

    recognition.onresult = (event) => {
      console.log("Voice Assistant: Speech recognized successfully.");
      const transcript = event.results[0][0].transcript;
      if (onResultRef.current) {
        onResultRef.current(transcript);
      }
      retryCount.current = 0; 
      setIsListening(false); 
    };

    recognition.onerror = async (event) => {
      console.error(`Voice Assistant: Speech recognition failed. Error: [${event.error}]`, event.message || "");
      
      let friendlyError;
      let shouldRetry;

      // Detect Brave for specific network error help
      let isBrave = false;
      if (navigator.brave && await navigator.brave.isBrave()) {
        isBrave = true;
      }

      switch(event.error) {
        case 'not-allowed':
          friendlyError = "Microphone access was denied. Please allow microphone permissions in your browser settings.";
          shouldRetry = false;
          break;
        case 'audio-capture':
          friendlyError = "No microphone detected. Please plug in or enable your microphone.";
          shouldRetry = false;
          break;
        case 'network':
          if (isBrave) {
             friendlyError = "Brave Shields blocks Speech Recognition. Please disable Shields for this site or use Chrome.";
          } else {
             friendlyError = "Network error while recognizing speech. (Check internet or secure context).";
          }
          shouldRetry = false; // Don't auto-retry on network error to avoid infinite loops which trigger browser blocks
          break;
        case 'no-speech':
          friendlyError = "We didn't catch that. Please speak a little louder.";
          shouldRetry = true;
          break;
        case 'aborted':
          friendlyError = ""; 
          shouldRetry = false;
          break;
        case 'language-not-supported':
          friendlyError = "The selected language is not supported by your browser.";
          shouldRetry = false;
          break;
        default:
          friendlyError = `Voice recognition error: ${event.error}`;
          shouldRetry = false;
      }

      if (shouldRetry && retryCount.current < MAX_RETRIES && !isManuallyStopped.current) {
        retryCount.current += 1;
        console.log(`Voice Assistant: Auto-retrying... Attempt ${retryCount.current} of ${MAX_RETRIES}`);
        
        // Auto-retry after a brief pause
        setTimeout(() => {
          if (!isManuallyStopped.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (err) {
              console.error("Voice Assistant: Retry failed to start.", err);
              setIsListening(false);
              if (onErrorRef.current) onErrorRef.current("Retry failed. Please click mic again.");
            }
          }
        }, 500);
      } else {
        setIsListening(false);
        if (onErrorRef.current && friendlyError) {
          onErrorRef.current(friendlyError);
        }
      }
    };

    recognition.onend = () => {
      console.log("Voice Assistant: Listening session ended.");
      // Stop listening state unless we are in the middle of an auto-retry
      if (!(!isManuallyStopped.current && retryCount.current > 0 && retryCount.current <= MAX_RETRIES)) {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
    
    // Cleanup: stop recognition if component unmounts
    return () => {
      isManuallyStopped.current = true;
      if (recognitionRef.current) {
         try {
           recognitionRef.current.abort();
         } catch {
           // ignore abort errors
         }
      }
    };
  }, []); // <--- EMPTY DEPENDENCY ARRAY IS CRUCIAL HERE

  const startListening = useCallback(async () => {
    console.log("[Voice Assistant] Attempting to start speech recognition...");
    if (!supported || !recognitionRef.current) {
      if (onErrorRef.current) onErrorRef.current('Speech Recognition is unsupported. Please use Chrome, Edge, or Brave.');
      return;
    }
    
    try {
      // Proactively check permissions if supported by browser
      if (navigator.permissions && navigator.permissions.query) {
        const perm = await navigator.permissions.query({ name: 'microphone' });
        console.log(`[Voice Assistant] Mic permission status: ${perm.state}`);
        if (perm.state === 'denied') {
          if (onErrorRef.current) onErrorRef.current('Microphone access is blocked in your browser settings. Please enable it.');
          return;
        }
      }
    } catch {
      console.log("Voice Assistant: Permissions query skipped or not supported.");
    }

    try {
      retryCount.current = 0;
      isManuallyStopped.current = false;
      
      const getVoiceLangCode = (lang) => {
        switch (lang) {
          case 'ta': return 'ta-IN';
          case 'hi': return 'hi-IN';
          case 'en': default: return 'en-US';
        }
      };
      
      if (recognitionRef.current) {
        recognitionRef.current.lang = getVoiceLangCode(language);
      }

      // Stop before starting if it's somehow already running or in a weird state
      if (isListening) {
         recognitionRef.current.stop();
      }
      recognitionRef.current.start();
    } catch (err) {
      console.error("Voice Assistant: Could not start recognition.", err);
      // If it throws an error like "recognition has already started", we can just ignore it or set isListening to true.
      setIsListening(true);
    }
  }, [supported, isListening, language]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      console.log("Voice Assistant: Manually stopped by user.");
      isManuallyStopped.current = true;
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return {
    isListening,
    supported,
    startListening,
    stopListening,
  };
};
