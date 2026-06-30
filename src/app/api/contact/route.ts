import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  eventType?: string;
  date?: string;
  guests?: number;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Поле «Имя» обязательно для заполнения" },
        { status: 400 }
      );
    }

    if (!body.phone || typeof body.phone !== "string" || body.phone.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Поле «Телефон» обязательно для заполнения" },
        { status: 400 }
      );
    }

    // Log the contact form data (no email service configured yet)
    console.log("📬 New contact form submission:", {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      eventType: body.eventType?.trim() || null,
      date: body.date?.trim() || null,
      guests: body.guests ?? null,
      message: body.message?.trim() || null,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Заявка принята",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Неверный формат запроса" },
      { status: 400 }
    );
  }
}
