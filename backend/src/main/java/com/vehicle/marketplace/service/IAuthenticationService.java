package com.vehicle.marketplace.service;

import com.nimbusds.jose.JOSEException;
import com.vehicle.marketplace.model.request.AuthenticationRequest;
import com.vehicle.marketplace.model.request.IntrospectRequest;
import com.vehicle.marketplace.model.request.LogoutRequest;
import com.vehicle.marketplace.model.request.RefreshTokenRequest;
import com.vehicle.marketplace.model.response.AuthenticationResponse;
import com.vehicle.marketplace.model.response.IntrospectResponse;

import java.text.ParseException;

public interface IAuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);
    IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;
    void logout(LogoutRequest request) throws ParseException, JOSEException;
    AuthenticationResponse refreshToken(RefreshTokenRequest request) throws ParseException, JOSEException;
}
