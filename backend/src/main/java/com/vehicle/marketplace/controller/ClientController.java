package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.service.ClientService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<Boolean> create(
            @RequestBody @Valid UserCreationRequest request
            ) {
        return ResponseEntity.ok(clientService.create(request));
    }
}
