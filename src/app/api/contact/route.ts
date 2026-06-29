import { NextRequest, NextResponse } from "next/server";

/* ═══════════════════════════════════════════════════════════════
   Contact Form API — receives form data, validates, and stores
   In production, this would send emails / notify managers
   ═══════════════════════════════════════════════════════════════ */

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  eventType?: string;
  message?: string;
  source?: string;
}

// In-memory store for demo (replace with DB in production)
const submissions: (ContactFormData & { id: string; createdAt: string })[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Имя обязательно для заполнения" },
        { status: 400 }
      );
    }
    if (!body.phone || !body.phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Телефон обязателен для заполнения" },
        { status: 400 }
      );
    }

    // Basic phone validation (Russian format)
    const phoneClean = body.phone.replace(/[\s\-\(\)]/g, "");
    if (!/^(\+7|7|8)\d{10}$/.test(phoneClean)) {
      return NextResponse.json(
        { success: false, error: "Введите корректный номер телефона" },
        { status: 400 }
      );
    }

    // Email validation if provided
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Введите корректный email" },
        { status: 400 }
      );
    }

    // Create submission
    const submission = {
      ...body,
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    };

    submissions.push(submission);

    // In production: send email notification, push to CRM, etc.
    console.log("[Contact API] New submission:", {
      id: submission.id,
      name: submission.name,
      phone: submission.phone,
      eventType: submission.eventType,
      source: submission.source,
    });

    return NextResponse.json({
      success: true,
      message: "Заявка принята. Мы свяжемся с вами в течение 30 минут.",
      id: submission.id,
    });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { success: false, error: "Произошла ошибка. Попробуйте ещё раз." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    total: submissions.length,
    recent: submissions.slice(-5).reverse(),
  });
}
