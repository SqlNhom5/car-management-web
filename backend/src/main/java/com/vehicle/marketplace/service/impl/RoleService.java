package com.vehicle.marketplace.service.impl;


import com.vehicle.marketplace.mapper.RoleMapper;
import com.vehicle.marketplace.model.request.RoleRequest;
import com.vehicle.marketplace.model.response.RoleResponse;
import com.vehicle.marketplace.repository.RoleRepository;
import com.vehicle.marketplace.service.IRoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleService implements IRoleService {

    RoleRepository roleRepository;
    RoleMapper roleMapper;


    public RoleResponse createRole(RoleRequest roleRequest) {
        var role = roleMapper.toRole(roleRequest);
        roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAllRoles() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void deleteRole(String id) {
        roleRepository.deleteById(id);
    }


}
