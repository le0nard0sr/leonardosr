# ADR-016 — Problem Details como padrão de erro da API

## Status

Aceita.

## Contexto

A API passou a ter tratamento global de exceções para evitar respostas inconsistentes entre validações, erros de domínio, erros de infraestrutura HTTP e falhas inesperadas. Como o contrato OpenAPI é fonte para clientes e para geração de tipos no frontend, o formato de erro precisa ser previsível e documentado.

## Decisão

Usar `org.springframework.http.ProblemDetail` como contrato padrão de erro da API, retornando `application/problem+json` para erros tratados.

O tratamento global fica centralizado em `GlobalExceptionHandler`, estendendo `ResponseEntityExceptionHandler` para reaproveitar os pontos oficiais do Spring MVC em erros de validação, leitura de corpo, método HTTP e media type.

Todo erro tratado deve incluir:

- `type`: URI estável da categoria do problema.
- `title`: título curto e humano.
- `status`: status HTTP.
- `detail`: mensagem resumida.
- `instance`: caminho da requisição.
- `code`: extensão com código estável para clientes.

Erros de validação devem incluir a extensão `errors`, com itens no formato:

```json
{
  "field": "email",
  "message": "deve ser um endereço de e-mail bem formado",
  "rejectedValue": "valor-invalido"
}
```

Valores rejeitados sensíveis, como senha, token, secret, key ou credential, não devem ser expostos. Erros inesperados devem registrar stack trace server-side, mas não devem expor stack trace, SQL, paths internos, nomes de classe ou detalhes sensíveis no corpo da resposta.

## Códigos iniciais

- `VALIDATION_ERROR`
- `MALFORMED_JSON`
- `METHOD_NOT_ALLOWED`
- `UNSUPPORTED_MEDIA_TYPE`
- `NOT_FOUND`
- `CONFLICT`
- `REQUEST_ERROR`
- `INTERNAL_ERROR`

## Consequências

- Frontend e integrações podem tratar erros por `code`, sem depender de texto.
- Formulários podem mapear validações por `errors[].field`.
- Novas exceções de negócio devem ser adaptadas ao padrão antes de expor contratos públicos ou administrativos.
- O OpenAPI deve manter schemas reutilizáveis para `ProblemDetail` e `FieldErrorDetail`.
- A decisão não exige criar hierarquia própria de exceções agora; isso pode ser revisto se a complexidade de domínio crescer.
