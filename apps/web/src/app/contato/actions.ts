"use server";

import type { ContactFormState } from "@/components/forms/contact-form";
import { ApiError } from "@/lib/api/client";
import { submitContact } from "@/lib/api/public";

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim() ?? "";
  const subject = formData.get("subject")?.toString().trim() ?? "";
  const message = formData.get("message")?.toString().trim() ?? "";
  const website = formData.get("website")?.toString().trim();

  const errors: ContactFormState["errors"] = {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "E-mail inválido.";
  }
  if (!subject) {
    errors.subject = "Assunto é obrigatório.";
  }
  if (!message || message.length < 10) {
    errors.message = "Mensagem deve ter pelo menos 10 caracteres.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  try {
    await submitContact({ name, email, subject, message, website });
    return {
      status: "success",
      message: "Mensagem enviada. Responderei em breve.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        status: "error",
        message: "Falha ao enviar. Tente novamente em instantes.",
      };
    }
    throw error;
  }
}
