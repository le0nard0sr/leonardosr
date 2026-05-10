# ADR-012 — Topologia de domínios e autenticação administrativa

## Status

Aceita

## Contexto

O admin será protegido por cookie de sessão e CSRF. A topologia precisa ser definida antes da implementação de autenticação para evitar mudanças caras em CORS, cookies e deploy.

## Decisão

Adotar a topologia preferencial:

- `leonardosr.com.br` para frontend Next.js e `/admin`.
- `api.leonardosr.com.br` para backend Spring Boot.
- `storybook.leonardosr.com.br` para Storybook publicado.

Para autenticação administrativa futura:

- Cookie de sessão `Secure`, `HttpOnly`, `Path=/`.
- `SameSite=Lax` por padrão.
- Cookie host-only por padrão, sem atributo `Domain`.
- CORS restrito a `https://leonardosr.com.br` com credentials habilitado.
- CSRF token explícito enviado pelo backend e usado pelo frontend em mutações administrativas.
- Logout invalida sessão no servidor via Spring Session.

## Consequências

- Frontend e backend são cross-origin, mas same-site sob `leonardosr.com.br`.
- A configuração de CORS e CSRF deve ser implementada antes do admin real.
- Qualquer mudança para reverse proxy same-origin deve atualizar este ADR antes da implementação de auth.
