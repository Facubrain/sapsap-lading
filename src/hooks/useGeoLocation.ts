import { useState, useEffect } from 'react';
import { Language } from '@/contexts/LanguageContext';

interface GeoLocationData {
  country: string;
  countryCode: string;
  language: Language;
  loading: boolean;
  error: string | null;
}

// Mapeo de países a idiomas
const countryToLanguage: Record<string, Language> = {
  // Spanish speaking countries
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'PE': 'es', 'VE': 'es',
  'CL': 'es', 'EC': 'es', 'GT': 'es', 'CU': 'es', 'BO': 'es', 'DO': 'es',
  'HN': 'es', 'PY': 'es', 'SV': 'es', 'NI': 'es', 'CR': 'es', 'PA': 'es',
  'UY': 'es', 'GQ': 'es',
  
  // Portuguese speaking countries  
  'BR': 'pt', 'PT': 'pt', 'AO': 'pt', 'MZ': 'pt', 'GW': 'pt', 'CV': 'pt',
  'ST': 'pt', 'TL': 'pt',
  
  // French speaking countries
  'FR': 'fr', 'CA': 'fr', 'BE': 'fr', 'CH': 'fr', 'LU': 'fr', 'MC': 'fr',
  'SN': 'fr', 'ML': 'fr', 'BF': 'fr', 'NE': 'fr', 'CI': 'fr', 'GN': 'fr',
  'TD': 'fr', 'CF': 'fr', 'CG': 'fr', 'GA': 'fr', 'KM': 'fr', 'DJ': 'fr',
  'MG': 'fr', 'CM': 'fr', 'BI': 'fr', 'RW': 'fr', 'VU': 'fr', 'NC': 'fr',
  'PF': 'fr', 'WF': 'fr', 'PM': 'fr', 'RE': 'fr', 'YT': 'fr', 'GP': 'fr',
  'MQ': 'fr', 'GF': 'fr',
  
  // English speaking countries (fallback)
  'US': 'en', 'GB': 'en', 'AU': 'en', 'NZ': 'en', 'IE': 'en', 'ZA': 'en',
  'NG': 'en', 'KE': 'en', 'UG': 'en', 'GH': 'en', 'ZW': 'en', 'BW': 'en',
  'IN': 'en', 'PK': 'en', 'BD': 'en', 'LK': 'en', 'MM': 'en', 'MY': 'en',
  'SG': 'en', 'PH': 'en', 'HK': 'en', 'MT': 'en', 'CY': 'en'
};

export const useGeoLocation = (): GeoLocationData => {
  const [data, setData] = useState<GeoLocationData>({
    country: '',
    countryCode: '',
    language: 'es', // Default fallback
    loading: true,
    error: null
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try multiple IP geolocation services
        const services = [
          'https://ipapi.co/json/',
          'https://ip-api.com/json/',
          'https://ipinfo.io/json'
        ];

        let success = false;
        
        for (const service of services) {
          try {
            const response = await fetch(service);
            if (!response.ok) continue;
            
            const result = await response.json();
            
            // Handle different API response formats
            let countryCode = '';
            let country = '';
            
            if (result.country_code) {
              countryCode = result.country_code;
              country = result.country_name || result.country || '';
            } else if (result.countryCode) {
              countryCode = result.countryCode;
              country = result.country || '';
            } else if (result.country) {
              countryCode = result.country;
              country = result.country || '';
            }

            if (countryCode) {
              const detectedLanguage = countryToLanguage[countryCode] || 'en';
              
              setData({
                country,
                countryCode,
                language: detectedLanguage,
                loading: false,
                error: null
              });
              
              success = true;
              break;
            }
          } catch (serviceError) {
            console.warn(`Geolocation service failed:`, serviceError);
            continue;
          }
        }

        if (!success) {
          throw new Error('All geolocation services failed');
        }

      } catch (error) {
        console.warn('Geolocation detection failed, using browser language fallback:', error);
        
        // Fallback to browser language
        const browserLang = navigator.language.split('-')[0];
        const fallbackLanguage = (['es', 'en', 'fr', 'pt'].includes(browserLang as Language)) 
          ? browserLang as Language 
          : 'es';

        setData({
          country: 'Unknown',
          countryCode: 'XX',
          language: fallbackLanguage,
          loading: false,
          error: 'Could not detect location, using browser language'
        });
      }
    };

    detectLocation();
  }, []);

  return data;
};