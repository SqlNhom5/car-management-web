package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.Entity.AppointmentEntity;
import com.vehicle.marketplace.Entity.CarEntity;
import com.vehicle.marketplace.Entity.CustomerEntity;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.Enum.AppointmentStatus;
import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.Entity.*;
import com.vehicle.marketplace.Enum.AppointmentStatus;
import com.vehicle.marketplace.Enum.ErrorCode;
import com.vehicle.marketplace.exception.AppException;
import com.vehicle.marketplace.model.request.AppointmentRequest;
import com.vehicle.marketplace.model.request.CustomerAppointmentRequest;
import com.vehicle.marketplace.model.response.AppointmentResponse;
import com.vehicle.marketplace.repository.AppointmentRepository;
import com.vehicle.marketplace.repository.CarRepository;
import com.vehicle.marketplace.repository.CustomerRepository;
import com.vehicle.marketplace.repository.UserRepository;
import com.vehicle.marketplace.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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
    public AppointmentResponse update(Integer id, String status) {
        AppointmentEntity entity = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        entity.setStatus(AppointmentStatus.valueOf(status));
        return toResponse(appointmentRepository.save(entity));
    }

    @Override
    public void delete(Integer id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    @Transactional
    public String createAppointment(String username, CustomerAppointmentRequest request) {
        CustomerEntity customer = getCustomerFromUsername(username);
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow( () -> new AppException(ErrorCode.USER_NOT_EXISTED));
        customer.setFullName(request.getFullName());
        if (appointmentRepository.existsByCustomerIdAndCarCarId(customer.getId(), request.getCarId())) {
            throw new AppException(ErrorCode.CAR_EXISTED);
        }
        CarEntity car = carRepository.findById(request.getCarId())
                .orElseThrow(() -> new IllegalArgumentException("Car not found"));
        AppointmentEntity appointment = AppointmentEntity.builder()
                .customer(customer)
                .appointmentDate(request.getAppointmentDate())
                .car(car)
                .phone(request.getPhone())
                .user(user)
                .notes(request.getNotes())
                .status(AppointmentStatus.Pending)
                .mail(request.getMail())
                .createdAt(LocalDateTime.now())
                .build();


        appointmentRepository.save(appointment);
        return "add appointment successfully";
    }

    private CustomerEntity getCustomerFromUsername(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        boolean isCustomer = user.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("USER"));
        if (!isCustomer) {
            throw new IllegalStateException("Only customers can manage favorites");
        }
        return customerRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Customer profile not found for this user"));
    }

    @Override
    public AppointmentResponse getById(Integer id) {
        return appointmentRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }


    @Override
    @Transactional(readOnly = true)
    public Page<AppointmentResponse> getAll(Pageable pageable) {
        return appointmentRepository.findAll(pageable)
                .map(this::toResponse);
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
                .mail(entity.getMail())
                .phone(entity.getPhone())
                .build();
    }
}
