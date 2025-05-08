package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.request.AppointmentUpdateRequest;
import com.vehicle.marketplace.model.response.ApiResponse;
import com.vehicle.marketplace.model.response.AppointmentResponse;
import com.vehicle.marketplace.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
    ApiResponse<List<AppointmentResponse>> getAll() {
        return ApiResponse.<List<AppointmentResponse>>builder()
                .result(appointmentService.getAll())
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
}

