package com.smartcampus.resource.controller;

import com.smartcampus.resource.dto.ResourceRequestDTO;
import com.smartcampus.resource.dto.ResourceResponseDTO;
import com.smartcampus.resource.service.ResourceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/resources")
public class ResourceAdminController {

    private final ResourceService resourceService;

    public ResourceAdminController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @PostMapping
    public ResponseEntity<ResourceResponseDTO> createResource(@Valid @RequestBody ResourceRequestDTO requestDTO) {
        ResourceResponseDTO createdResource = resourceService.createResource(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResourceResponseDTO> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequestDTO requestDTO) {

        ResourceResponseDTO updatedResource = resourceService.updateResource(id, requestDTO);
        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}