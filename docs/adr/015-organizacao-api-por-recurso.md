# ADR-015 — Organização da API por recurso

## Status

Aceita.

## Contexto

A API do Marco 2 nasceu com controllers agregados, DTOs concentrados em um único arquivo e services concretos no mesmo pacote. Essa estrutura funcionava tecnicamente, mas dificultava leitura humana, navegação no IDE e evolução por funcionalidade.

## Decisão

Organizar a API Spring Boot principalmente por recurso/domínio, mantendo `domain` e `repository` globais enquanto as entidades seguem compartilhadas.

Cada recurso deve concentrar, quando aplicável:

- `controller`
- `dto`
- `service`
- `service.impl`
- subpacotes técnicos do próprio recurso, como `contact.email` e `media.storage`

Interfaces de services de aplicação devem usar prefixo `I`, por exemplo `ISiteProfileService`, com implementação concreta sem prefixo em `service.impl`, por exemplo `SiteProfileService`.

Exceções transversais ficam em `shared.exception`.

## Consequências

- A navegação por funcionalidade fica mais direta para manutenção e revisão.
- Novos endpoints devem nascer no pacote do respectivo recurso.
- DTOs devem ser arquivos próprios e nomeados explicitamente.
- Controllers agregadores só devem ser criados quando houver ganho claro de coesão.
- `domain` e `repository` podem ser fatiados no futuro mediante nova decisão, se o volume justificar.
