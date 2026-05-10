# ADR-007 — Storage de mídia

## Status

Aceita

## Contexto

O site precisa armazenar capas, PDFs, imagens internas e diagramas, usando MinIO local e storage compatível com S3/R2 em produção.

## Decisão

Isolar storage atrás de uma porta `StorageService`, com adapter noop para desenvolvimento/testes sem credenciais e adapter MinIO/S3-compatible para ambiente local/produtivo.

Cloudflare R2 não terá um adapter separado na v1. A decisão é usar o mesmo adapter S3-compatible com configuração por ambiente:

- local: `app.storage.provider=minio`, `app.storage.endpoint=http://minio:9000`, credenciais do MinIO e bucket local.
- produção R2: `app.storage.provider=minio`, endpoint S3 do bucket R2, access key/secret key da Cloudflare e bucket de produção.

O nome `MinioStorageService` representa o SDK usado no M2, não uma restrição de provider. Se o comportamento do R2 exigir particularidades futuras, um `R2StorageService` dedicado poderá ser extraído sem alterar a porta de domínio.

Uploads seguem o fluxo `PENDING -> ACTIVE -> DELETED`: o backend cria URL pré-assinada, confirma via HEAD no storage e remove fisicamente o objeto antes de marcar a mídia como `DELETED`.

`storage_key` é fonte de verdade; `public_url` é cache regenerável a partir de `storage_key` e `seo_setting.media_cdn_base_url`.

## Consequências

- O domínio não depende de URL pública como identificador.
- Mídia referenciada por entidade ativa é bloqueada com `409`.
- FKs para mídia usam `ON DELETE RESTRICT` como proteção de banco.
- O M2 evita duplicar adapters S3 equivalentes, mas documenta explicitamente a configuração R2.
- A porta `StorageService` preserva caminho claro para separar MinIO e R2 se aparecer divergência operacional.
