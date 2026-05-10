package br.com.leonardosr.api.config;

import br.com.leonardosr.api.domain.*;
import br.com.leonardosr.api.repository.*;
import br.com.leonardosr.api.search.service.ISearchService;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@ConditionalOnProperty(name = "app.seed.enabled", havingValue = "true", matchIfMissing = true)
public class M2SeedData {
    @Bean
    CommandLineRunner seedRunner(SeedService seedService) {
        return args -> seedService.seed();
    }

    @org.springframework.stereotype.Service
    static class SeedService {
        private final AppUserRepository userRepository;
        private final SiteProfileRepository siteProfileRepository;
        private final SeoSettingRepository seoSettingRepository;
        private final TagRepository tagRepository;
        private final TechnologyRepository technologyRepository;
        private final ProjectRepository projectRepository;
        private final ContentRepository contentRepository;
        private final SeriesRepository seriesRepository;
        private final SeriesContentRepository seriesContentRepository;
        private final ExperienceRepository experienceRepository;
        private final ISearchService searchService;
        private final String adminEmail;
        private final String adminPasswordHash;
        private final String siteUrl;
        private final String mediaCdnBaseUrl;

        SeedService(
                AppUserRepository userRepository,
                SiteProfileRepository siteProfileRepository,
                SeoSettingRepository seoSettingRepository,
                TagRepository tagRepository,
                TechnologyRepository technologyRepository,
                ProjectRepository projectRepository,
                ContentRepository contentRepository,
                SeriesRepository seriesRepository,
                SeriesContentRepository seriesContentRepository,
                ExperienceRepository experienceRepository,
                ISearchService searchService,
                @Value("${app.admin.initial-email}") String adminEmail,
                @Value("${app.admin.initial-password-hash}") String adminPasswordHash,
                @Value("${app.site.url}") String siteUrl,
                @Value("${app.site.media-cdn-base-url}") String mediaCdnBaseUrl) {
            this.userRepository = userRepository;
            this.siteProfileRepository = siteProfileRepository;
            this.seoSettingRepository = seoSettingRepository;
            this.tagRepository = tagRepository;
            this.technologyRepository = technologyRepository;
            this.projectRepository = projectRepository;
            this.contentRepository = contentRepository;
            this.seriesRepository = seriesRepository;
            this.seriesContentRepository = seriesContentRepository;
            this.experienceRepository = experienceRepository;
            this.searchService = searchService;
            this.adminEmail = adminEmail;
            this.adminPasswordHash = adminPasswordHash;
            this.siteUrl = siteUrl;
            this.mediaCdnBaseUrl = mediaCdnBaseUrl;
        }

        @Transactional
        public void seed() {
            seedAdmin();
            seedProfile();
            seedSeo();
            var tags = seedTags();
            var technologies = seedTechnologies();
            var projects = seedProjects(technologies);
            var contents = seedContents(tags, technologies, projects);
            seedSeries(contents);
            seedExperience(technologies);
            projects.forEach(project -> searchService.refreshProjectVector(project.getId()));
            contents.forEach(content -> searchService.refreshContentVector(content.getId()));
        }

        private void seedAdmin() {
            if (userRepository.existsByEmail(adminEmail)) {
                return;
            }
            var user = new AppUser();
            user.setName("Administrador");
            user.setEmail(adminEmail);
            user.setPasswordHash(adminPasswordHash);
            user.setRole(UserRole.ADMIN);
            userRepository.save(user);
        }

        private void seedProfile() {
            if (siteProfileRepository.count() > 0) {
                return;
            }
            var profile = new SiteProfile();
            profile.setDisplayName("Leonardo Silva Ribeiro");
            profile.setProfessionalTitle("Analista de TI · React · Next.js · Spring Boot");
            profile.setHeadline("Arquitetura e desenvolvimento web moderno com clareza técnica.");
            profile.setShortBio("Portfólio profissional e hub de conteúdos técnicos.");
            profile.setFullBio("Perfil inicial criado pelo seed do M2. Ajustes editoriais entram pelo admin no M6.");
            profile.setLocationLabel("Brasil");
            profile.setGithubUrl("https://github.com/leonardosr");
            profile.setLinkedinUrl("https://www.linkedin.com/");
            profile.setContactEmailAlias("contato@leonardosr.com.br");
            profile.setPrivacyEmailAlias("privacidade@leonardosr.com.br");
            profile.setImageUrlAllowlist("images.unsplash.com,raw.githubusercontent.com");
            siteProfileRepository.save(profile);
        }

        private void seedSeo() {
            if (seoSettingRepository.count() > 0) {
                return;
            }
            var seo = new SeoSetting();
            seo.setDefaultTitle("LeonardoSR");
            seo.setDefaultDescription("Site pessoal, portfólio e hub de conteúdos técnicos de Leonardo Silva Ribeiro.");
            seo.setDefaultLocale("pt_BR");
            seo.setDefaultAuthorName("Leonardo Silva Ribeiro");
            seo.setSiteUrl(siteUrl);
            seo.setMediaCdnBaseUrl(mediaCdnBaseUrl);
            seo.setRobotsPolicy("disallow_admin");
            seoSettingRepository.save(seo);
        }

        private List<Tag> seedTags() {
            return List.of(
                    tag("React", "react"),
                    tag("Next.js", "nextjs"),
                    tag("Spring Boot", "spring-boot"),
                    tag("Java", "java"),
                    tag("TypeScript", "typescript"),
                    tag("PostgreSQL", "postgresql"),
                    tag("Docker", "docker"),
                    tag("API REST", "api-rest"),
                    tag("OAuth2", "oauth2"),
                    tag("JWT", "jwt"),
                    tag("Keycloak", "keycloak"),
                    tag("SEO", "seo"),
                    tag("Acessibilidade", "acessibilidade"),
                    tag("Frontend", "frontend"),
                    tag("Backend", "backend"));
        }

        private Tag tag(String name, String slug) {
            return tagRepository.findBySlug(slug).orElseGet(() -> {
                var tag = new Tag();
                tag.setName(name);
                tag.setSlug(slug);
                tag.setDescription("Conteúdos sobre " + name + ".");
                return tagRepository.save(tag);
            });
        }

        private List<Technology> seedTechnologies() {
            return List.of(
                    technology("React", "react", "Frontend"),
                    technology("Next.js", "nextjs", "Frontend"),
                    technology("TypeScript", "typescript", "Frontend"),
                    technology("Spring Boot", "spring-boot", "Backend"),
                    technology("Java", "java", "Backend"),
                    technology("PostgreSQL", "postgresql", "Banco"),
                    technology("Docker", "docker", "DevOps"));
        }

        private Technology technology(String name, String slug, String category) {
            return technologyRepository.findBySlug(slug).orElseGet(() -> {
                var technology = new Technology();
                technology.setName(name);
                technology.setSlug(slug);
                technology.setCategory(category);
                technology.setDescription("Tecnologia usada no ecossistema do site.");
                technology.setLevel("principal");
                return technologyRepository.save(technology);
            });
        }

        private List<Project> seedProjects(List<Technology> technologies) {
            if (!projectRepository.findAll().isEmpty()) {
                return projectRepository.findAll();
            }
            var site = project("leonardosr-com-br", "leonardosr.com.br", "Site pessoal com Next.js e Spring Boot.");
            site.getTechnologies().addAll(technologies);
            var api = project("api-conteudos-spring-boot", "API de conteúdos com Spring Boot", "Backend editorial versionado com PostgreSQL.");
            api.getTechnologies().addAll(technologies.stream().filter(t -> !"React".equals(t.getName())).toList());
            var arch = project("arquitetura-next-spring-postgresql", "Arquitetura Next.js + Spring Boot + PostgreSQL", "Estudo de arquitetura da plataforma.");
            arch.getTechnologies().addAll(technologies);
            return projectRepository.saveAll(List.of(site, api, arch));
        }

        private Project project(String slug, String name, String summary) {
            var project = new Project();
            project.setSlug(slug);
            project.setName(name);
            project.setSummary(summary);
            project.setDescription(summary + " Projeto demonstrativo inicial do M2.");
            project.setRepositoryUrl("https://github.com/");
            project.setStatus(PublicationStatus.PUBLISHED);
            project.setFeatured(true);
            return project;
        }

        private List<Content> seedContents(List<Tag> tags, List<Technology> technologies, List<Project> projects) {
            if (!contentRepository.findAll().isEmpty()) {
                return contentRepository.findAll();
            }
            var article = content("react-puro-ou-nextjs", "React puro ou Next.js: quando usar cada um?", ContentType.ARTICLE);
            article.getTags().addAll(tags.subList(0, 2));
            article.getTechnologies().addAll(technologies.subList(0, 3));

            var lab = content("laboratorio-api-rest-spring", "Laboratório: API REST com Spring Boot", ContentType.LAB);
            lab.setTypeSpecificFields(Map.of(
                    "demonstrationUrl", siteUrl + "/laboratorio/api-rest-spring",
                    "sourceCodeUrl", "https://github.com/",
                    "isDidactic", true,
                    "difficultyLevel", "INTERMEDIATE"));
            lab.getTags().add(tags.get(2));
            lab.getTechnologies().addAll(technologies.subList(3, technologies.size()));

            var architecture = content("arquitetura-next-spring-postgresql", "Arquitetura com Next.js, Spring Boot e PostgreSQL", ContentType.ARCHITECTURE);
            architecture.setTypeSpecificFields(Map.of(
                    "components", List.of(Map.of("name", "Next.js", "role", "Frontend"), Map.of("name", "Spring Boot", "role", "API")),
                    "flow", "Frontend consome API pública e administrativa conforme topologia do PRD.",
                    "advantages", List.of("Separação clara", "SEO forte"),
                    "risks", List.of("Operação distribuída"),
                    "whenToUse", "Portfólios e plataformas editoriais com conteúdo técnico."));
            architecture.getTags().addAll(tags);
            architecture.getTechnologies().addAll(technologies);
            architecture.setProject(projects.get(0));

            return contentRepository.saveAll(List.of(article, lab, architecture));
        }

        private Content content(String slug, String title, ContentType type) {
            var content = new Content();
            content.setSlug(slug);
            content.setTitle(title);
            content.setSummary("Conteúdo demonstrativo inicial para validar API, busca e filtros.");
            content.setBody("# " + title + "\n\nConteúdo inicial em MDX seguro para o Marco 2.");
            content.setType(type);
            content.setStatus(PublicationStatus.PUBLISHED);
            content.setReadingTime(4);
            content.setFeatured(true);
            return content;
        }

        private void seedSeries(List<Content> contents) {
            if (!seriesRepository.findAll().isEmpty()) {
                return;
            }
            var series = new Series();
            series.setSlug("arquitetura-de-aplicacoes-web");
            series.setTitle("Arquitetura de aplicações web");
            series.setDescription("Série inicial sobre arquitetura moderna com Next.js, Spring Boot e PostgreSQL.");
            series.setStatus(PublicationStatus.PUBLISHED);
            var saved = seriesRepository.save(series);
            seriesContentRepository.save(new SeriesContent(saved, contents.get(0), 1));
        }

        private void seedExperience(List<Technology> technologies) {
            if (!experienceRepository.findAll().isEmpty()) {
                return;
            }
            var experience = new Experience();
            experience.setRole("Analista de TI");
            experience.setOrganization("Experiência profissional");
            experience.setStartDate(LocalDate.of(2020, 1, 1));
            experience.setCurrent(true);
            experience.setSummary("Atuação com desenvolvimento, integração e arquitetura de aplicações web.");
            experience.setDescription("Registro inicial para alimentar páginas públicas futuras.");
            experience.setStatus(PublicationStatus.PUBLISHED);
            experience.setSortOrder(1);
            experience.getTechnologies().addAll(technologies);
            experienceRepository.save(experience);
        }
    }
}
