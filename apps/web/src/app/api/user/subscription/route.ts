import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/user/subscription:
 *   get:
 *     summary: Get user's subscription expiration date
 *     description: Retrieves the user's subscription expiration date in a human-readable format
 *     responses:
 *       200:
 *         description: Successfully retrieved subscription date
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 next_payment_date:
 *                   type: string
 *                   format: date
 *                   example: "2024-03-25"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found or no subscription
 *       500:
 *         description: Internal server error
 */

export async function GET() {
  // Mock response for development
  return NextResponse.json({
    next_payment_date: "2024-12-31",
    isPro: true,
    message: "Mock subscription data"
  });
}
