type OtpRecord = {
  otp: string;
  expiresAt: number;
};

const otpStore = new Map<string, OtpRecord>();

export function saveOtp(email: string, otp: string, ttlMs = 5 * 60 * 1000) {
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + ttlMs,
  });
}

export function getOtp(email: string) {
  const record = otpStore.get(email);

  if (!record) return null;

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return null;
  }

  return record.otp;
}

export function clearOtp(email: string) {
  otpStore.delete(email);
}