/**
 * Hash an IP address with a salt for privacy-preserving storage.
 * Uses SHA-256 via Web Crypto API. One-way: IP cannot be recovered.
 */
export async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const hex: string[] = [];
  for (const b of bytes) {
    hex.push(b.toString(16).padStart(2, '0'));
  }
  return hex.join('');
}
