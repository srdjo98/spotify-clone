import { getUserSession } from "@/app/actions/getUserSession";
import ConfirmationEmail from "@/app/emails/ConfirmationEmail";
import { transporter } from "@/app/mail/nodemailer";
import prisma from "@/prisma/prismaClient";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const user = await getUserSession();
  const body = await request.json();
  const { amount, currency, type } = body;

  const userObj = await prisma.user.findUnique({
    where: {
      email: user?.user?.email!,
    },
  });

  if (!userObj || userObj === null) {
    return NextResponse.json({
      message: "No user logged in",
    });
  }

  const htmlConfirmationTemplate = render(
    ConfirmationEmail({ name: userObj?.name, type, amount, currency })
  );

  const subscriptionType = await prisma.subscriptionType.findFirst({
    where: {
      title: type,
    },
  });

  const updateSubscription = await prisma.subscription.update({
    where: {
      userId: userObj.id,
    },
    data: {
      userId: userObj?.id,
      typeId: subscriptionType?.id!,
      status: "Complete",
      amount,
      currency,
    },
  });

  await transporter.sendMail({
    from: "srdjan@gmail.com",
    to: "zaricsrdjan10@gmail.com",
    subject: "Spotify - Confirmation Payment",
    html: htmlConfirmationTemplate,
  });

  return NextResponse.json(updateSubscription);
};
