/**
 * Geo-detection utilities for determining user region
 */

// SADC member countries (all 16 members)
export const SADC_COUNTRIES = [
  'AO', // Angola
  'BW', // Botswana
  'KM', // Comoros
  'CD', // Democratic Republic of the Congo
  'SZ', // Eswatini (Swaziland)
  'LS', // Lesotho
  'MG', // Madagascar
  'MW', // Malawi
  'MU', // Mauritius
  'MZ', // Mozambique
  'NA', // Namibia
  'SC', // Seychelles
  'ZA', // South Africa
  'TZ', // Tanzania
  'ZM', // Zambia
  'ZW', // Zimbabwe
];

export type UserRegion = 'SADC' | 'INTERNATIONAL';

/**
 * Detects user's region based on country code
 */
export function getUserRegion(countryCode: string): UserRegion {
  return SADC_COUNTRIES.includes(countryCode.toUpperCase()) ? 'SADC' : 'INTERNATIONAL';
}

/**
 * Fetches user's country code using IP geolocation
 * Uses ipapi.co free API (no key required for reasonable usage)
 */
export async function detectUserCountry(): Promise<string | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      throw new Error('Failed to fetch geolocation data');
    }
    const data = await response.json();
    return data.country_code || null;
  } catch (error) {
    console.error('Error detecting user country:', error);
    return null;
  }
}

/**
 * Detects user's region (SADC or INTERNATIONAL)
 * Defaults to INTERNATIONAL if detection fails
 */
export async function detectUserRegion(): Promise<UserRegion> {
  const countryCode = await detectUserCountry();
  if (!countryCode) {
    return 'INTERNATIONAL'; // Default to international if detection fails
  }
  return getUserRegion(countryCode);
}
