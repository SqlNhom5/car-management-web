package com.vehicle.marketplace.controller;

import com.vehicle.marketplace.Entity.ForgotPassword;
import com.vehicle.marketplace.Entity.UserEntity;
import com.vehicle.marketplace.model.dto.DataMailDTO;
import com.vehicle.marketplace.model.request.ChangePasswordRequest;
import com.vehicle.marketplace.repository.ForgotPasswordRepository;
import com.vehicle.marketplace.repository.UserRepository;
import com.vehicle.marketplace.service.MailService;
import com.vehicle.marketplace.utils.Const;
import com.vehicle.marketplace.utils.DataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/forgotPassword")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class ForgotPasswordController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/verifyMail/{email}")
    public ResponseEntity<String> verifyMail(@PathVariable String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Please enter an valid email address"));

        ForgotPassword fpold = user.getForgotPassword();
        if(fpold != null) {
            forgotPasswordRepository.deleteById(fpold.getFpid());
        }

        String otp = DataUtil.generateTempPwd(6);

        ForgotPassword fp = ForgotPassword.builder()
                .otp(Integer.parseInt(otp))
                .expirationTime(new Date(System.currentTimeMillis() + 100*1000))
                .user(user)
                .build();

        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(email);
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);

            Map<String, Object> props = new HashMap<>();
            props.put("name", user.getFirstName());
            props.put("username", user.getUsername());
            props.put("password", otp);
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
        } catch (Exception exp){
            exp.printStackTrace();
        }

        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok("Email sent for verification successful");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(()-> new UsernameNotFoundException("Please enter an valid email address"));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(()-> new RuntimeException("Invalid OTP for Email !"));

        if(fp.getExpirationTime().before(Date.from(Instant.now()))){
            return new ResponseEntity<>("OTP has expired", HttpStatus.EXPECTATION_FAILED);
        }
        return ResponseEntity.ok("OTP verified");

    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest changePassword,
                                                 @PathVariable String email) {
        if(!Objects.equals(changePassword.getPassword(), changePassword.getConfirmPassword())){
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.getPassword());

        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password changed successfully");
    }
}
