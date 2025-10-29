// utils/validation.ts

/**
 * Vérifie si une adresse email est valide.
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

/**
 * Vérifie si un numéro de téléphone est valide (8 à 15 chiffres, sans espaces).
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = phone.trim().replace(/\s+/g, "");
  const regex = /^[0-9]{8,15}$/;
  return regex.test(cleaned);
};
