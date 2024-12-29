package com.kubera.leez.common;

public class ResponseMessage {
        // HTTP status 200
        String SUCCESS = "SU";
    
        // HTTP status 400
        String VALIDATION_FAILED = "Validationg Failed";
        String DUPLICATE_EMAIL = "Duplicate Email";
        String DUPLICATE_NICKNAME = "Duplicate Nickname";
        String NOT_EXISTED_USER = "This user does not exist";
        String NOT_EXSITED_BOARD = "This board does not exist";
    
        // HTTP status 401
        String SIGN_IN_FAIL = "Login information mismatch";
        String AUTHORIZATION_FAIL = "Authorization Failed";
        
        // HTTP status 403
        String NO_PERMISSION = "Do not have permission";
        
        // HTTP status 500
        String DATABASE_ERROR = "Database error";
}
