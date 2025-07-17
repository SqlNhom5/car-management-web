package com.vehicle.marketplace.utils;

import java.util.Random;

public class DataUtil {
    public static String generateTempPwd(int length){
        String number="0123456789";
        char otp[]= new char[length];
        Random getOtpNum = new Random();

        for(int i=0;i<length;i++){
            otp[i]=number.charAt(getOtpNum.nextInt(number.length()));
        }

        String otpCode="";
        for(int i=0; i < otp.length;i++){
            otpCode+=otp[i];
        }
        return otpCode;
    }
}
