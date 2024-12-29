package com.kubera.leez.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtProvider {
    @Value("${secret-key}")
    private String secretKey;

    // 이메일을 받아서 JWT 만들거임
    public String create(String email) {
        // 만료시간
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        
        String jwt = Jwts.builder()
            .signWith(SignatureAlgorithm.HS256, secretKey)  // 알고리즘 사용 방식 : HS256
            .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)   // 주체(email) 생성시간-만료시간 세팅
            .compact();

            return jwt;
    }

    // 검증 
    public String validate(String jwt) {
        Claims claims = null;

        try {
            // 
            claims = Jwts.parser().setSigningKey(secretKey)
                .parseClaimsJws(jwt).getBody();
        } catch (Exception exception) {
            // TODO: handle exception
            exception.printStackTrace();
            return null;
        }

        return claims.getSubject();
    }
}
