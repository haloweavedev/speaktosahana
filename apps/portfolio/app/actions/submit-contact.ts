"use server";

import prisma from "@repo/db";

type ContactResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<ContactResult> {
  const { name, email, phone, message } = data;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return { success: false, error: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        message: message.trim(),
      },
    });

    return { success: true, id: submission.id };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
