package br.com.leonardosr.api.content.service.impl;

import br.com.leonardosr.api.content.service.IMdxValidationService;
import br.com.leonardosr.api.repository.SiteProfileRepository;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.stereotype.Service;

@Service
public class MdxValidationService implements IMdxValidationService {
    private static final Pattern IMPORT_PATTERN = Pattern.compile("(?m)^\\s*import\\s+");
    private static final Pattern HTML_PATTERN = Pattern.compile("<([a-z][a-z0-9-]*)(\\s|>|/)", Pattern.CASE_INSENSITIVE);
    private static final Pattern JSX_PATTERN = Pattern.compile("<([A-Z][A-Za-z0-9]*)\\b");
    private static final Pattern IMAGE_PATTERN = Pattern.compile("!\\[[^]]*]\\((https?://[^)\\s]+)\\)");

    private final SiteProfileRepository siteProfileRepository;

    public MdxValidationService(SiteProfileRepository siteProfileRepository) {
        this.siteProfileRepository = siteProfileRepository;
    }

    @Override
    public List<String> validate(String mdx) {
        var errors = new ArrayList<String>();
        if (mdx == null || mdx.isBlank()) {
            errors.add("MDX não pode ser vazio");
            return errors;
        }
        if (IMPORT_PATTERN.matcher(mdx).find()) {
            errors.add("Imports diretos em MDX são proibidos");
        }
        if (HTML_PATTERN.matcher(mdx).find()) {
            errors.add("HTML bruto em MDX é proibido na v1");
        }

        var allowedComponents = allowedComponents();
        var jsx = JSX_PATTERN.matcher(mdx);
        while (jsx.find()) {
            var component = jsx.group(1);
            if (!allowedComponents.contains(component)) {
                errors.add("Componente MDX fora da allowlist: " + component);
            }
        }

        var allowedHosts = allowedImageHosts();
        var images = IMAGE_PATTERN.matcher(mdx);
        while (images.find()) {
            var url = images.group(1);
            var host = host(url);
            if (host == null) {
                errors.add("URL de imagem externa inválida: " + url);
            } else if (!allowedHosts.isEmpty() && !allowedHosts.contains(host)) {
                errors.add("Imagem externa fora da allowlist: " + url);
            }
        }
        return errors.stream().distinct().toList();
    }

    private List<String> allowedComponents() {
        return List.of();
    }

    private List<String> allowedImageHosts() {
        return siteProfileRepository.findAll().stream()
                .findFirst()
                .map(profile -> profile.getImageUrlAllowlist() == null
                        ? List.<String>of()
                        : Arrays.stream(profile.getImageUrlAllowlist().split(","))
                                .map(String::trim)
                                .filter(value -> !value.isBlank())
                                .toList())
                .orElse(List.of());
    }

    private String host(String url) {
        try {
            var host = URI.create(url).getHost();
            if (host == null || host.isBlank()) {
                return null;
            }
            return host;
        } catch (IllegalArgumentException exception) {
            return null;
        }
    }
}
