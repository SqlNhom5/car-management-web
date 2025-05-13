package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.request.AppointmentUpdateRequest;
import com.vehicle.marketplace.model.request.CustomerAppointmentRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.AppointmentResponse;
import com.vehicle.marketplace.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class AppointmentController {

    AppointmentService appointmentService;

    @GetMapping
    ApiResponse<Page<AppointmentResponse>> getAll(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "5") int size) {
        return ApiResponse.<Page<AppointmentResponse>>builder()
                .result(appointmentService.getAll(PageRequest.of(page, size)))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<AppointmentResponse> getById(@PathVariable Integer id) {
        return ApiResponse.<AppointmentResponse>builder()
                .result(appointmentService.getById(id))
                .build();
    }

    @PostMapping
    ApiResponse<AppointmentResponse> create(@RequestBody AppointmentRequest request) {
        return ApiResponse.<AppointmentResponse>builder()
                .result(appointmentService.create(request))
                .build();
    }

    @PutMapping("/{id}")
    ApiResponse<AppointmentResponse> update(@PathVariable Integer id, @RequestBody AppointmentUpdateRequest request) {
        return ApiResponse.<AppointmentResponse>builder()
                .result(appointmentService.update(id, request.getStatus()))

                .build();
    }

    @DeleteMapping("/{id}")
    ApiResponse<String> delete(@PathVariable Integer id) {
        appointmentService.delete(id);
        return ApiResponse.<String>builder().result("Deleted successfully").build();
    }


    @PostMapping("/customer")
    ApiResponse<String> createAppointment(@RequestBody CustomerAppointmentRequest request) {
        String username = getCurrentUsername();
        return ApiResponse.<String>builder()
                .result(appointmentService.createAppointment(username, request))
                .build();
    }

    private String getCurrentUsername() {
        var context = SecurityContextHolder.getContext();
        var authentication = context.getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }
        return authentication.getName();
    }
}

