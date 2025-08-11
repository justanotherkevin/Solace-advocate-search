/**
 * Formats a 10-digit phone number string into (XXX) XXX-XXXX format
 * @param phoneNumber The phone number string to format
 * @returns Formatted phone number string or original if not valid
 */
export const formatPhoneNumber = (phoneNumber: number): string => {
  // Remove any non-digit characters
  const cleaned = phoneNumber.toString().replace(/\D/g, "");

  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  // Return original when failed to match
  return cleaned;
};
