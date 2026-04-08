package com.candiflow.backend.service;

import com.candiflow.backend.model.Application;
import com.candiflow.backend.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

     private final ApplicationRepository applicationRepository;
     public ApplicationService(ApplicationRepository applicationRepository){
        this.applicationRepository = applicationRepository;
     }

     public List<Application> getAllApplications(){
        return applicationRepository.findAll();
     }

     public Optional<Application> getApplicationById(Long id){
        return applicationRepository.findById(id);
     }

     public Application saveApplication(Application application){
        return applicationRepository.save(application);
     }

     public void deleteApplication(Long id){
        applicationRepository.deleteById(id);
     }
}