package com.vehicle.marketplace.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String password;
    private String confirmPassword;
}
