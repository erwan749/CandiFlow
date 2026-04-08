package com.candiflow.backend.controller;

import com.candiflow.backend.model.Application;
import com.candiflow.backend.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    public ApplicationController(ApplicationService applicationService){ 
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();//retoune toute les offre dans la bdd
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplicationById(@PathVariable Long id) {
        return applicationService.getApplicationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());//retourne l'offre correspondant a l'id
    }

    @PostMapping
    public Application createApplication(@Valid @RequestBody Application application) { //creation d'une offre envoyer ainsi que la validation de c'est donner 
        return applicationService.saveApplication(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @Valid @RequestBody Application application) { //Validation des donner recu et modification de l'offre 
        return applicationService.getApplicationById(id)
                .map(existingApplication -> {
                    existingApplication.setCompanyName(application.getCompanyName());
                    existingApplication.setPosition(application.getPosition());
                    existingApplication.setApplicationType(application.getApplicationType());
                    existingApplication.setTechStack(application.getTechStack());
                    existingApplication.setSource(application.getSource());
                    existingApplication.setSendDate(application.getSendDate());
                    existingApplication.setResponseDate(application.getResponseDate());
                    existingApplication.setFollowUpDate(application.getFollowUpDate());
                    existingApplication.setLmLink(application.getLmLink());
                    existingApplication.setStatus(application.getStatus());
                    existingApplication.setNotes(application.getNotes());

                    Application updatedApplication = applicationService.saveApplication(existingApplication);
                    return ResponseEntity.ok(updatedApplication);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {//supprime l'offre correspondant a l'id reçu
        if (applicationService.getApplicationById(id).isPresent()) {
            applicationService.deleteApplication(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}
