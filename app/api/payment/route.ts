import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export const POST = async (request: Request) => {
  const user = await getUserSession();
  const body = await request.json();
  const { amount, currency } = body;

  const userObj = await prisma.user.findUnique({
    where: {
      email: user?.user?.email!,
    },
  });

  if (userObj === null || !userObj) {
    return NextResponse.json({
      message: "User not found",
    });
  }

  const existingSubscription = await prisma.subscription.findUnique({
    where: {
      userId: userObj?.id,
    },
    include: {
      subscriptionType: true,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    currency,
    amount: amount * 100,
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    stripePromise: process.env.STRIPE_PUBLISHABLE_KEY,
    isExistingSubscription:
      existingSubscription?.subscriptionType.title !== "Free",
  });
};
