package br.com.leonardosr.api.repository;

import br.com.leonardosr.api.domain.MediaAsset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaAssetRepository extends JpaRepository<MediaAsset, Long> {}
