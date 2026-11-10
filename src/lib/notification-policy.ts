import { z } from "zod";

// Provisioning is deliberately pending until the store connects a real push provider.
export const DEFAULT_REMINDER_POLICY = {
  inactivityDays: 14,
  minimumIntervalDays: 14,
} as const;

export const reminderPolicySchema = z.object({
  inactivityDays: z.number().int().min(1).max(365),
  minimumIntervalDays: z.number().int().min(7).max(365),
});

export interface ReminderState {
  optedIn: boolean;
  lastSeenAt: string;
  lastSentAt: string | null;
}

export function isReminderDue(
  state: ReminderState,
  now: Date,
  policy: z.infer<typeof reminderPolicySchema> = DEFAULT_REMINDER_POLICY,
) {
  const parsed = reminderPolicySchema.safeParse(policy);
  if (!state.optedIn || !parsed.success) return false;
  const seen = Date.parse(state.lastSeenAt);
  const sent = state.lastSentAt === null ? null : Date.parse(state.lastSentAt);
  if (!Number.isFinite(seen) || (sent !== null && !Number.isFinite(sent))) return false;
  const day = 24 * 60 * 60 * 1000;
  return now.getTime() - seen >= parsed.data.inactivityDays * day &&
    (sent === null || now.getTime() - sent >= parsed.data.minimumIntervalDays * day);
}

export function buildReminderBody(name: string) {
  const firstName = name.trim().split(/\s+/)[0]?.slice(0, 60);
  return `${firstName ? `Oi, ${firstName}!` : "Oi!"} Estamos com saudades de você! ❤️ Volte para conferir nossos sabores.`;
}