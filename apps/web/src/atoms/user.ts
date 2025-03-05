import { atom } from 'jotai';
import { atomWithStorage } from "jotai/utils";

export const userNameAtom = atom('');

export type SubscriptionPlan = "Basic" | "Pro";

// Atom to track subscription status
export const subscriptionPlanAtom = atomWithStorage<SubscriptionPlan>("user-subscription-plan", "Basic");

// Atom for payment amount (3500 CRC)
export const paymentAmountAtom = atomWithStorage<number>("payment-amount", 3500);