/**
 * Utility for Text-to-Speech conversion.
 */

const getVoiceLangCode = (lang) => {
  switch (lang) {
    case 'ta':
      return 'ta-IN';
    case 'hi':
      return 'hi-IN';
    case 'en':
    default:
      return 'en-US';
  }
};

export const speak = (text, lang = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn("Text-to-Speech is not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getVoiceLangCode(lang);
  
  // Optional: Select a specific voice if available for the language
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.lang === utterance.lang || voice.lang.startsWith(lang));
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
