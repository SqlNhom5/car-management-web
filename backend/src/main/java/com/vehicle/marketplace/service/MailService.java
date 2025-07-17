package com.vehicle.marketplace.service;

import com.vehicle.marketplace.model.dto.DataMailDTO;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendHtmlMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
