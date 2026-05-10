CREATE TABLE media_asset (
    id BIGSERIAL PRIMARY KEY,
    storage_key VARCHAR(512) NOT NULL UNIQUE,
    public_url VARCHAR(1024),
    status VARCHAR(32) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(128) NOT NULL,
    size_bytes BIGINT NOT NULL,
    width INTEGER,
    height INTEGER,
    blur_data_url TEXT,
    checksum VARCHAR(128),
    alt_text VARCHAR(255) NOT NULL,
    created_by BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE app_user (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(160) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE media_asset
    ADD CONSTRAINT fk_media_asset_created_by
    FOREIGN KEY (created_by) REFERENCES app_user(id) ON DELETE SET NULL;

CREATE TABLE site_profile (
    id BIGSERIAL PRIMARY KEY,
    display_name VARCHAR(160) NOT NULL,
    professional_title VARCHAR(220) NOT NULL,
    headline VARCHAR(260) NOT NULL,
    short_bio TEXT NOT NULL,
    full_bio TEXT NOT NULL,
    location_label VARCHAR(160),
    linkedin_url VARCHAR(512),
    github_url VARCHAR(512),
    twitter_url VARCHAR(512),
    youtube_url VARCHAR(512),
    contact_email_alias VARCHAR(255),
    privacy_email_alias VARCHAR(255),
    curriculum_media_id BIGINT REFERENCES media_asset(id) ON DELETE RESTRICT,
    image_url_allowlist TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE seo_setting (
    id BIGSERIAL PRIMARY KEY,
    default_title VARCHAR(180) NOT NULL,
    default_description VARCHAR(320) NOT NULL,
    default_og_image_id BIGINT REFERENCES media_asset(id) ON DELETE RESTRICT,
    default_locale VARCHAR(16) NOT NULL,
    default_author_name VARCHAR(160) NOT NULL,
    site_url VARCHAR(512) NOT NULL,
    media_cdn_base_url VARCHAR(512) NOT NULL,
    twitter_handle VARCHAR(80),
    robots_policy VARCHAR(32) NOT NULL,
    google_verification VARCHAR(255),
    bing_verification VARCHAR(255),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tag (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    slug VARCHAR(140) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE technology (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    slug VARCHAR(140) NOT NULL UNIQUE,
    category VARCHAR(80) NOT NULL,
    description TEXT,
    level VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE project (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(180) NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    problem TEXT,
    solution TEXT,
    architecture TEXT,
    results TEXT,
    repository_url VARCHAR(512),
    demo_url VARCHAR(512),
    cover_image_id BIGINT REFERENCES media_asset(id) ON DELETE RESTRICT,
    status VARCHAR(32) NOT NULL,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    seo_title VARCHAR(180),
    seo_description VARCHAR(320),
    search_vector TSVECTOR
);

CREATE TABLE content (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(180) NOT NULL UNIQUE,
    title VARCHAR(220) NOT NULL,
    summary TEXT NOT NULL,
    body TEXT NOT NULL,
    type VARCHAR(40) NOT NULL,
    type_specific_fields JSONB,
    status VARCHAR(32) NOT NULL,
    scheduled_at TIMESTAMPTZ,
    cover_image_id BIGINT REFERENCES media_asset(id) ON DELETE RESTRICT,
    youtube_url VARCHAR(512),
    youtube_video_id VARCHAR(80),
    video_duration VARCHAR(80),
    reading_time INTEGER,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    seo_title VARCHAR(180),
    seo_description VARCHAR(320),
    canonical_url VARCHAR(512),
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    project_id BIGINT REFERENCES project(id) ON DELETE SET NULL,
    search_vector TSVECTOR
);

CREATE TABLE series (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(180) NOT NULL UNIQUE,
    title VARCHAR(220) NOT NULL,
    description TEXT NOT NULL,
    cover_image_id BIGINT REFERENCES media_asset(id) ON DELETE RESTRICT,
    status VARCHAR(32) NOT NULL,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    seo_title VARCHAR(180),
    seo_description VARCHAR(320)
);

CREATE TABLE experience (
    id BIGSERIAL PRIMARY KEY,
    role VARCHAR(180) NOT NULL,
    organization VARCHAR(180) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    current BOOLEAN NOT NULL DEFAULT FALSE,
    summary TEXT NOT NULL,
    description TEXT,
    status VARCHAR(32) NOT NULL,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE contact_message (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(160),
    email VARCHAR(255),
    subject VARCHAR(180) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) NOT NULL,
    ip_anonymized VARCHAR(80),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    read_at TIMESTAMPTZ,
    anonymized_at TIMESTAMPTZ
);

CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES app_user(id) ON DELETE SET NULL,
    action VARCHAR(120) NOT NULL,
    entity_type VARCHAR(120) NOT NULL,
    entity_id BIGINT,
    changes JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE content_tag (
    content_id BIGINT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tag(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, tag_id)
);

CREATE TABLE content_technology (
    content_id BIGINT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    technology_id BIGINT NOT NULL REFERENCES technology(id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, technology_id)
);

CREATE TABLE project_technology (
    project_id BIGINT NOT NULL REFERENCES project(id) ON DELETE CASCADE,
    technology_id BIGINT NOT NULL REFERENCES technology(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

CREATE TABLE experience_technology (
    experience_id BIGINT NOT NULL REFERENCES experience(id) ON DELETE CASCADE,
    technology_id BIGINT NOT NULL REFERENCES technology(id) ON DELETE CASCADE,
    PRIMARY KEY (experience_id, technology_id)
);

CREATE TABLE content_related (
    content_id BIGINT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    related_content_id BIGINT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (content_id, related_content_id)
);

CREATE TABLE series_content (
    series_id BIGINT NOT NULL REFERENCES series(id) ON DELETE CASCADE,
    content_id BIGINT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (series_id, content_id),
    UNIQUE (series_id, sort_order)
);

CREATE INDEX idx_content_public ON content (status, published_at DESC);
CREATE INDEX idx_project_public ON project (status, published_at DESC);
CREATE INDEX idx_series_public ON series (status, published_at DESC);
CREATE INDEX idx_experience_public ON experience (status, published_at DESC);
CREATE INDEX idx_content_type ON content (type);
CREATE INDEX idx_content_search_vector ON content USING GIN (search_vector);
CREATE INDEX idx_project_search_vector ON project USING GIN (search_vector);
