package com.mype.locator_api.repository;

import com.mype.locator_api.model.Mype;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MypeRepository extends JpaRepository<Mype, Long> {

    
}
