package com.candiflow.backend.repository;

import com.candiflow.backend.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long>{
    
}