package com.vehicle.marketplace.service.impl;

import com.vehicle.marketplace.model.dto.DataMailDTO;
import com.vehicle.marketplace.model.request.UserCreationRequest;
import com.vehicle.marketplace.service.ClientService;
import com.vehicle.marketplace.service.MailService;
import com.vehicle.marketplace.utils.Const;
import com.vehicle.marketplace.utils.DataUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private MailService mailService;

    @Override
    public Boolean create(UserCreationRequest request) {
        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(request.getEmail());
            dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);

            Map<String, Object> props = new HashMap<>();
            props.put("name", request.getFirstName());
            props.put("username", request.getUsername());
            props.put("password", DataUtil.generateTempPwd(6));
            dataMail.setProps(props);

            mailService.sendHtmlMail(dataMail, Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
            return true;
        } catch (Exception exp){
            exp.printStackTrace();
        }
        return false;
    }
}
