import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  eventType?: string;
  date?: string;
  guests?: number;
  message?: string;
  source?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    /* ─── Validate required fields ─── */
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

    const submissionData = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      eventType: body.eventType?.trim() || null,
      date: body.date?.trim() || null,
      guests: body.guests ?? null,
      message: body.message?.trim() || null,
      source: body.source || "website",
      submittedAt: new Date().toISOString(),
    };

    /* ─── Send email via Resend ─── */
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        const eventTypeMap: Record<string, string> = {
          wedding: "Свадьба",
          corporate: "Корпоратив",
          banquet: "Банкет",
          furshet: "Фуршет",
          coffee: "Кофе-брейк",
          other: "Другое",
        };

        const { data, error } = await resend.emails.send({
          from: "Интерфуд Кейтеринг <onboarding@resend.dev>",
          to: ["info@interfood-catering.ru"],
          subject: `Новая заявка с сайта — ${submissionData.name}`,
          html: `
            <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #FEFDFB; border-radius: 16px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #B8955A 0%, #8B6F4E 100%); padding: 2rem; text-align: center;">
                <h1 style="color: #fff; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.8rem; font-weight: 400; margin: 0; letter-spacing: 0.1em;">ИНТЕРФУД КЕЙТЕРИНГ</h1>
                <p style="color: rgba(255,255,255,0.8); font-size: 0.8rem; margin: 0.5rem 0 0; letter-spacing: 0.15em; text-transform: uppercase;">Новая заявка</p>
              </div>
              <div style="padding: 2rem;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase; width: 140px;">Имя</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A; font-weight: 500;">${submissionData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Телефон</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A;"><a href="tel:${submissionData.phone}" style="color: #B8955A; text-decoration: none;">${submissionData.phone}</a></td>
                  </tr>
                  ${submissionData.email ? `<tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Email</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A;"><a href="mailto:${submissionData.email}" style="color: #B8955A; text-decoration: none;">${submissionData.email}</a></td>
                  </tr>` : ""}
                  ${submissionData.eventType ? `<tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Тип мероприятия</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A;">${eventTypeMap[submissionData.eventType] || submissionData.eventType}</td>
                  </tr>` : ""}
                  ${submissionData.date ? `<tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Дата</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A;">${submissionData.date}</td>
                  </tr>` : ""}
                  ${submissionData.guests ? `<tr>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Гости</td>
                    <td style="padding: 0.75rem 0; border-bottom: 1px solid #F0EDE7; font-size: 0.95rem; color: #1A1A1A;">${submissionData.guests} человек</td>
                  </tr>` : ""}
                  ${submissionData.message ? `<tr>
                    <td style="padding: 0.75rem 0; font-size: 0.75rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Сообщение</td>
                    <td style="padding: 0.75rem 0; font-size: 0.95rem; color: #1A1A1A; line-height: 1.6;">${submissionData.message}</td>
                  </tr>` : ""}
                </table>
                <div style="margin-top: 2rem; padding: 1rem; background: #FAFAF8; border-radius: 8px; text-align: center;">
                  <p style="font-size: 0.75rem; color: #888; margin: 0;">Получено: ${new Date(submissionData.submittedAt).toLocaleString("ru-RU")} | Источник: ${submissionData.source}</p>
                </div>
              </div>
            </div>
          `,
        });

        if (error) {
          console.error("Resend API error:", error);
          // Fall through to log-only mode
        } else {
          console.log("✅ Email sent successfully via Resend:", data?.id);
        }
      } catch (emailError) {
        console.error("Failed to send email:", emailError);
        // Continue — don't fail the request if email fails
      }
    } else {
      console.log("⚠️ RESEND_API_KEY not set — logging submission only");
    }

    /* ─── Always log the submission ─── */
    console.log("📬 Contact form submission:", JSON.stringify(submissionData, null, 2));

    return NextResponse.json({
      success: true,
      message: "Заявка принята! Мы свяжемся с вами в течение 30 минут.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Неверный формат запроса" },
      { status: 400 }
    );
  }
}
