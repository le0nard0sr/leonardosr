import { compile } from "@mdx-js/mdx";

export async function validateMdx(
  source: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    await compile(source, { outputFormat: "function-body" });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
