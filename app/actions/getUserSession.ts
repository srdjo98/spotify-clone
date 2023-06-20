import { Session, getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  return session as Session;
};
