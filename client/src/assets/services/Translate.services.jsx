import { useState } from 'react';
import axios from 'axios';

export const useTranslation = () => {
  const [translating, setTranslating] = useState(false);
  
  // For production, you would use Google Translate API or another service
  // This is a mock implementation that shows how it would work
  
  const translateSymptom = async (text, targetLanguage) => {
    if (!text || targetLanguage === 'en') return text;
    
    setTranslating(true);
    
    try {
      // Mock translation - in production, replace with actual API call
      // Example using Google Translate API:
      // const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {
      //   q: text,
      //   target: targetLanguage,
      //   key: 'YOUR_API_KEY'
      // });
      // return response.data.data.translations[0].translatedText;
      
      // For demo purposes, return mock translations
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockTranslations = {
        ur: {
          "Headache": "سر درد",
          "Fever": "بخار",
          "Cough": "کھانسی",
          "Fatigue": "تھکن",
          "Nausea": "متلی",
          "Dizziness": "چکر آنا",
          "Chest Pain": "سینے میں درد",
          "Shortness of Breath": "سانس لینے میں دشواری",
          "Abdominal Pain": "پیٹ میں درد",
          "Back Pain": "کمر درد"
        },
        ko: {
          "Headache": "두통",
          "Fever": "발열",
          "Cough": "기침",
          "Fatigue": "피로",
          "Nausea": "메스꺼움",
          "Dizziness": "현기증",
          "Chest Pain": "흉통",
          "Shortness of Breath": "호흡 곤란",
          "Abdominal Pain": "복통",
          "Back Pain": "요통"
        }
      };
      
      // Return mock translation or original if not found
      return mockTranslations[targetLanguage]?.[text] || text;
      
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    } finally {
      setTranslating(false);
    }
  };
  
  const translateSymptomsList = async (symptoms, targetLanguage) => {
    if (targetLanguage === 'en') return symptoms;
    
    setTranslating(true);
    
    try {
      const translatedSymptoms = await Promise.all(
        symptoms.map(async (symptom) => {
          const translatedName = await translateSymptom(symptom.name, targetLanguage);
          const translatedDescription = symptom.description 
            ? await translateSymptom(symptom.description, targetLanguage)
            : symptom.description;
            
          return {
            ...symptom,
            name: translatedName,
            description: translatedDescription,
            originalName: symptom.name,
            originalDescription: symptom.description
          };
        })
      );
      
      return translatedSymptoms;
    } catch (error) {
      console.error('Symptoms translation error:', error);
      return symptoms;
    } finally {
      setTranslating(false);
    }
  };
  
  return {
    translating,
    translateSymptom,
    translateSymptomsList
  };
};