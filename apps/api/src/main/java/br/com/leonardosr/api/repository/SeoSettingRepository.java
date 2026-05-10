package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.SeoSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeoSettingRepository extends JpaRepository<SeoSetting, Long> {}
