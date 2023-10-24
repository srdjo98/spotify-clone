import { getUserSession } from "@/app/actions/getUserSession";
import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const GET = async () => {
  const user = await getUserSession();

  const profile = await prisma.user.findUnique({
    where: {
      email: user?.user?.email!,
    },
    include: {
      subscription: {
        include: {
          subscriptionType: true,
        },
      },
    },
  });

  return NextResponse.json(profile);
};
