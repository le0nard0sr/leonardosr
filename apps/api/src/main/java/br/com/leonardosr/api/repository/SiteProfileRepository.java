package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.SiteProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteProfileRepository extends JpaRepository<SiteProfile, Long> {}
