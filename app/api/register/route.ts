import prisma from "@/prisma/prismaClient";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Something went wrong" });
  }

  const subscription = await prisma.subscription.create({
    data: {
      userId: user.id,
      typeId: "6512920218870968768bf4d9",
      status: "Completed",
      amount: 0,
      currency: "eur",
    },
  });

  if (!subscription) {
    return NextResponse.json({ message: "Base subscription failed" });
  }

  return NextResponse.json(user);
};
