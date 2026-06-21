import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import ProfileClient from "./client";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <ProfileClient initialUser={session?.user || null} />
  );
}
