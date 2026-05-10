-- Garante que a senha foi armazenada com scram-sha-256 (padrão PG17).
-- Necessário quando o volume é recriado a partir de um dump md5.
ALTER USER leonardosr WITH PASSWORD 'leonardosr';
