"use server";

import prisma from "@repo/db";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
};

type SubmissionsResult =
  | { success: true; submissions: Submission[] }
  | { success: false; error: string };

export async function getSubmissions(password: string): Promise<SubmissionsResult> {
  if (password !== "1234") {
    return { success: false, error: "Invalid password." };
  }

  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      submissions: submissions.map((s) => ({
        ...s,
        createdAt: s.createdAt.toISOString(),
      })),
    };
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    return { success: false, error: "Failed to load submissions." };
  }
}
