package com.desafioneki.domain.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafioneki.domain.dto.CredenciaisLoginDto;
import com.desafioneki.domain.model.User;
import com.desafioneki.domain.service.UserService;
import com.desafioneki.domain.service.security.JWTUtil;



@RestController
@RequestMapping("/auth")
public class AuthController {

	
	
	 // Injecting Dependencies
	  @Autowired
	  private UserService userService;

	  @Autowired
	  private JWTUtil jwtUtil;

	  @Autowired
	  private AuthenticationManager authManager;

	  @Autowired
	  private PasswordEncoder passwordEncoder;

	  // Registro de usuario
	  @PostMapping("/registro")
	  public Map<String, Object> registerHandler(@RequestBody User user) {
	    // Encriptando a senha usando o Bcrypt
	    String encodedPass = passwordEncoder.encode(user.getPassword());
	    user.setPassword(encodedPass);

	    user = userService.saveUser(user);

	    // Gerando o token JWT a partir do e-mail do Usuario
	    //String token = jwtUtil.generateToken(user.getEmail());

	    // Gerando o token JWT a partir dos dados do Usuario
	    User usuarioResumido = new User();
	    usuarioResumido.setLogin(user.getLogin());
	    usuarioResumido.setLast_login_date(user.getLast_login_date());
	    usuarioResumido.setId(user.getId());
	    String token = jwtUtil.generateTokenWithUserData(usuarioResumido);

	    // Retornando a resposta com o JWT
	    return Collections.singletonMap("jwt-token", token);
	  }

	  // Login de usuario
	  @PostMapping("/login")
	  public Map<String, Object> loginHandler(
	    @RequestBody CredenciaisLoginDto credenciaisLoginDto
	  ) {
	    try {
	      // Criando o token que sera usado no processo de autenticacao
	      UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
	        credenciaisLoginDto.getLogin(),
	        credenciaisLoginDto.getPassword()
	      );

	      	 
	      // Autenticando as credenciais de login
	      authManager.authenticate(authInputToken);

	      // Se o processo de autenticacao foi concluido com sucesso - etapa anterior,
	      // eh gerado o JWT
	      //String token = jwtUtil.generateToken(body.getEmail());

	      User user = userService.findByLogin(credenciaisLoginDto.getLogin());
	      User userResumido = new User();
	      userResumido.setLogin(user.getLogin());
	      userResumido.setLast_login_date(user.getLast_login_date());
	      userResumido.setId(user.getId());
	      // Gerando o token JWT a partir dos dados do Usuario
	      String token = jwtUtil.generateTokenWithUserData(userResumido);

	      // Responde com o JWT
	      return Collections.singletonMap("jwt-token", token);
	    } catch (AuthenticationException authExc) {
	      throw new RuntimeException("Credenciais Invalidas");
	    }
	  }
}
