/**
 * Strip HTML tags and dangerous content from text input.
 * Workers have no DOMParser, so we use regex-based stripping.
 */
export function sanitizeText(input: string): string {
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove HTML entities that could be used for XSS
    .replace(/&(?:#x?[0-9a-f]+|[a-z]+);/gi, '')
    // Remove null bytes
    .replace(/\0/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validate and sanitize a URL. Only allows https:// protocol.
 */
export function sanitizeUrl(input: string): string | null {
  try {
    const url = new URL(input);
    if (url.protocol !== 'https:') {
      return null;
    }
    // Prevent javascript: in any form
    if (url.href.toLowerCase().includes('javascript:')) {
      return null;
    }
    // Prevent data: URLs
    if (url.href.toLowerCase().startsWith('data:')) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}
