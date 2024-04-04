package com.app.ecommerce.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomError> handleSecurityException(Exception e){
        CustomError customError = new CustomError();
        if (e instanceof BadCredentialsException){
            customError.setMessage("AUTHENTICATION FAILURE");
            customError.setStatus(HttpStatus.UNAUTHORIZED.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.UNAUTHORIZED);

        }
        if (e instanceof AccessDeniedException){
            customError.setMessage("UNAUTHORIZED ACCESS");
            customError.setStatus(HttpStatus.FORBIDDEN.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.FORBIDDEN);
        }
        if (e instanceof SignatureException){
            customError.setMessage("JWT SIGNATURE NOT VALID");
            customError.setStatus(HttpStatus.FORBIDDEN.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.FORBIDDEN);
        }
        if (e instanceof ExpiredJwtException){
            customError.setMessage("JWT TOKEN EXPIRED");
            customError.setStatus(HttpStatus.FORBIDDEN.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.FORBIDDEN);
        }
        if (e instanceof MethodArgumentNotValidException){
            customError.setMessage(((MethodArgumentNotValidException) e).getBindingResult().getFieldError().getDefaultMessage());
            customError.setStatus(HttpStatus.BAD_REQUEST.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.BAD_REQUEST);
        }
        if (e instanceof UserNotFoundException){
            customError.setMessage(e.getMessage());
            customError.setStatus(HttpStatus.NOT_FOUND.value());
            customError.setTimestamp(System.currentTimeMillis());
            return new ResponseEntity<>(customError,HttpStatus.BAD_REQUEST);
        }
        return null;
    }


//    @ExceptionHandler(Exception.class)
//    public ProblemDetail handleSecurityException(Exception e){
//        ProblemDetail problemDetail = null;
//        if (e instanceof BadCredentialsException){
//            problemDetail = ProblemDetail.forStatusAndDetail(
//                    HttpStatusCode.valueOf(HttpStatus.UNAUTHORIZED.value()),
//                    e.getMessage());
//            problemDetail.setProperty("Access_Denied_Reason","Authentication Failure");
//        }
//        if (e instanceof AccessDeniedException){
//            problemDetail = ProblemDetail.forStatusAndDetail(
//                    HttpStatusCode.valueOf(HttpStatus.FORBIDDEN.value()),
//                    e.getMessage());
//            problemDetail.setProperty("Access_Denied_Reason","Unauthorized");
//        }
//        if (e instanceof SignatureException){
//            problemDetail = ProblemDetail.forStatusAndDetail(
//                    HttpStatusCode.valueOf(HttpStatus.FORBIDDEN.value()),
//                    e.getMessage());
//            problemDetail.setProperty("Access_Denied_Reason","JWT Signature not valid");
//        }
//        if (e instanceof ExpiredJwtException){
//            problemDetail = ProblemDetail.forStatusAndDetail(
//                    HttpStatusCode.valueOf(HttpStatus.FORBIDDEN.value()),
//                    e.getMessage());
//            problemDetail.setProperty("Access_Denied_Reason","JWT Token Expired");
//        }
//        if (e instanceof MethodArgumentNotValidException){
//            problemDetail = ProblemDetail.forStatusAndDetail(
//                    HttpStatusCode.valueOf(HttpStatus.BAD_REQUEST.value()),
//                    e.getMessage());
//        }
//
//        return problemDetail;
//    }

}
