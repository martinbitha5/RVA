/** Temporary storage for a flight alert a guest wants to add before logging in. */

export interface PendingAlert {
  flightId: string;
  flightNumber: string;
}

const KEY = 'fih_pending_alert';

export function savePendingAlert(alert: PendingAlert): void {
  try { sessionStorage.setItem(KEY, JSON.stringify(alert)); } catch { /* private browsing */ }
}

export function getPendingAlert(): PendingAlert | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PendingAlert) : null;
  } catch {
    return null;
  }
}

export function clearPendingAlert(): void {
  try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
}
