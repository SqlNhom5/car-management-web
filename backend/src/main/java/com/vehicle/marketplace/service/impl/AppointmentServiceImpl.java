package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.Entity.AppointmentEntity;
import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.CustomerEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.Enum.AppointmentStatus;
import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.response.AppointmentResponse;
import com.vehicle.marketplace.repository.AppointmentRepository;
import com.vehicle.marketplace.repository.CarRepository;
import com.vehicle.marketplace.repository.CustomerRepository;
import com.vehicle.marketplace.repository.UserRepository;
import com.vehicle.marketplace.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    @Override
    public AppointmentResponse create(AppointmentRequest request) {
        AppointmentEntity entity = new AppointmentEntity();

        CustomerEntity customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        CarEntity car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found"));
        UserEntity user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        entity.setCustomer(customer);
        entity.setCar(car);
        entity.setUser(user);
        entity.setAppointmentDate(request.getAppointmentDate());
        entity.setNotes(request.getNotes());
        entity.setStatus(AppointmentStatus.Pending);

        return toResponse(appointmentRepository.save(entity));
    }

    @Override
    public AppointmentResponse update(Integer id, AppointmentRequest request) {
        AppointmentEntity entity = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        entity.setAppointmentDate(request.getAppointmentDate());
        entity.setNotes(request.getNotes());
        return toResponse(appointmentRepository.save(entity));
    }

    @Override
    public void delete(Integer id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public AppointmentResponse getById(Integer id) {
        return appointmentRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @Override
    public List<AppointmentResponse> getAll() {
        return appointmentRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private AppointmentResponse toResponse(AppointmentEntity entity) {
        return AppointmentResponse.builder()
                .appointmentId(entity.getAppointmentId())
                .customerId(entity.getCustomer().getId())
                .customerName(entity.getCustomer().getFullName()) 
                .carId(entity.getCar().getCarId())
                .carName(entity.getCar().getCarName()) 
                .userId(entity.getUser().getId())
                .username(entity.getUser().getUsername()) 
                .appointmentDate(entity.getAppointmentDate())
                .status(entity.getStatus())
                .notes(entity.getNotes())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
