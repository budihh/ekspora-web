"use server";

import { db } from "@/db";
import { adminUsers } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function updateAdminProfile(name: string, email: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    // Check if email is already taken by another user
    const existingUser = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    if (existingUser.length > 0 && existingUser[0].email !== session.user.email) {
      throw new Error("Email is already in use by another account.");
    }

    await db.update(adminUsers)
      .set({ name, email })
      .where(eq(adminUsers.email, session.user.email));

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { success: false, error: error.message || "Failed to update profile" };
  }
}

export async function updateAdminPassword(currentPassword: string, newPassword: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    const userRecords = await db.select().from(adminUsers).where(eq(adminUsers.email, session.user.email));
    const user = userRecords[0];

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new Error("Incorrect current password.");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await db.update(adminUsers)
      .set({ passwordHash: newPasswordHash })
      .where(eq(adminUsers.email, session.user.email));

    return { success: true };
  } catch (error: any) {
    console.error("Failed to update password:", error);
    return { success: false, error: error.message || "Failed to update password" };
  }
}
