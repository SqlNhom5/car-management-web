package com.vehicle.marketplace.configuration;

import com.vehicle.marketplace.model.request.IntrospectRequest;
import com.vehicle.marketplace.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Objects;

@Component
public class CustomJwtDecoder implements JwtDecoder {
    @Value("${jwt.secret}")
    private String signerKey;
    @Autowired
    private AuthenticationService authenticationService;
    private NimbusJwtDecoder nimbusJwtDecoder = null;

    @Override
    public Jwt decode(String token) throws JwtException {
        try{
            // trước hết kiểm tra token còn hiệu lực không
            var response = authenticationService.introspect(IntrospectRequest.builder()
                            .token(token).build());
            if(!response.isValid()){
                throw new JwtException("Invalid token");
            }
        }
        catch (Exception e){
            throw new JwtException(e.getMessage());
        }

        if(Objects.isNull(nimbusJwtDecoder)){
            SecretKeySpec secretKeySpec = new SecretKeySpec(signerKey.getBytes(), "HS512");
            nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(secretKeySpec)
                    .macAlgorithm(MacAlgorithm.HS512)
                    .build();
        }
        return nimbusJwtDecoder.decode(token);
    }

}
