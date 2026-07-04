import Wallet from "../models/Wallet.js";

/**
 * Get or create wallet
 */
export async function getWallet(userId) {
  let wallet = await Wallet.findOne({ userId });

  if (!wallet) {
    wallet = await Wallet.create({ userId });
  }

  return wallet;
}

/**
 * Add credits (UPI top-up system)
 */
export async function addCredits(userId, credits, amount = 0) {
  let wallet = await getWallet(userId);

  wallet.credits += credits;
  wallet.totalSpent += amount;

  if (amount > 0) {
    wallet.plan = "pro";
  }

  await wallet.save();

  return wallet;
}

/**
 * Deduct credits (AI usage)
 */
export async function useCredits(userId, cost) {
  let wallet = await getWallet(userId);

  if (wallet.credits < cost) {
    throw new Error("INSUFFICIENT_CREDITS");
  }

  wallet.credits -= cost;
  await wallet.save();

  return wallet;
}
