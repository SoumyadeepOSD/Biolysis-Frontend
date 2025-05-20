/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import EmailTemplate from "@/app/_components/email-template";

const API_KEY = process.env.RESEND_API_KEY!;
const resend = new Resend(API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON
    const { firstName, lastName, phoneNumber, email, message }: any = await request.json();

    if (!firstName || !lastName || !email || !message || !phoneNumber) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: 'developersuniverse24@gmail.dev',
      subject: 'Message from Biolysis-contact page',
      react: EmailTemplate({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        email:email,
        message:message
      }) as React.ReactElement, // Use the HTML string in the 'html' field
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: error.message || "Error sending email" }, { status: 500 });
    }

    return NextResponse.json({ data, status: 200 });

  } catch (error: any) {
    console.error("Error in email sending:", error);
    return NextResponse.json({ error: error.message || "Unknown error occurred" }, { status: 500 });
  }
}
