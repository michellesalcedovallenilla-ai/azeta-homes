import type { JwtPayload } from '../types/models';

// ── Base64url helpers (no Buffer in Workers) ──

function base64urlEncode(data: Uint8Array): string {
  const binString = Array.from(data, (b) => String.fromCharCode(b)).join('');
  return btoa(binString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64urlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binString = atob(padded);
  return Uint8Array.from(binString, (c) => c.charCodeAt(0));
}

function textToBase64url(text: string): string {
  return base64urlEncode(new TextEncoder().encode(text));
}

// ── Password Hashing (PBKDF2 via Web Crypto) ──

const PBKDF2_ITERATIONS = 100_000;
const SALT_LENGTH = 16; // 128 bits
const KEY_LENGTH = 32; // 256 bits

export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const saltHex = bufferToHex(salt.buffer as ArrayBuffer);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );

  return {
    hash: bufferToHex(derivedBits),
    salt: saltHex,
  };
}

export async function verifyPassword(
  password: string,
  storedHash: string,
  storedSalt: string,
): Promise<boolean> {
  const salt = hexToBuffer(storedSalt);

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );

  const computedHash = bufferToHex(derivedBits);

  // Timing-safe comparison
  return timingSafeEqual(computedHash, storedHash);
}

// ── JWT (HMAC-SHA256 via Web Crypto) ──

export async function signJwt(
  payload: Omit<JwtPayload, 'iat' | 'exp'>,
  secret: string,
  expiresInSeconds: number,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  const fullPayload: JwtPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const header = textToBase64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = textToBase64url(JSON.stringify(fullPayload));
  const signingInput = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(signingInput),
  );

  return `${signingInput}.${base64urlEncode(new Uint8Array(signature))}`;
}

export async function verifyJwt(token: string, secret: string): Promise<JwtPayload | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, sig] = parts;
  const signingInput = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const signatureBytes = base64urlDecode(sig);
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    new TextEncoder().encode(signingInput),
  );

  if (!valid) return null;

  try {
    const payload: JwtPayload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(body)),
    );

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}

// ── Refresh Tokens ──

export function generateRefreshToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return bufferToHex(bytes.buffer as ArrayBuffer);
}

export async function hashToken(token: string): Promise<string> {
  const data = new TextEncoder().encode(token);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hash);
}

// ── Helpers ──

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const hex: string[] = [];
  for (const b of bytes) {
    hex.push(b.toString(16).padStart(2, '0'));
  }
  return hex.join('');
}

function hexToBuffer(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
