"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
};

type ContactFormProps = {
  action: (
    previousState: ContactFormState,
    formData: FormData,
  ) => Promise<ContactFormState>;
};

const initialState: ContactFormState = { status: "idle" };

export function ContactForm({ action }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Field
        label="Nome"
        name="name"
        autoComplete="name"
        error={state.errors?.name}
      />
      <Field
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        required
        error={state.errors?.email}
      />
      <Field
        label="Assunto"
        name="subject"
        required
        error={state.errors?.subject}
      />
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          rows={7}
          className="mt-2 w-full rounded-[6px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-3 py-2 text-sm outline-none transition focus:border-[color:var(--accent)]"
        />
        {state.errors?.message ? (
          <ErrorText>{state.errors.message}</ErrorText>
        ) : null}
      </div>

      {state.message ? (
        <p
          role="status"
          className={
            state.status === "success"
              ? "text-sm text-[color:var(--accent)]"
              : "text-sm text-red-400"
          }
        >
          {state.message}
        </p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
};

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  error,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-[6px] border border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-3 text-sm outline-none transition focus:border-[color:var(--accent)]"
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </div>
  );
}

function ErrorText({ children }: { children: string }) {
  return <p className="mt-2 text-sm text-red-400">{children}</p>;
}
