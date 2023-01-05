package com.desafioneki.core.permissions;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import com.desafioneki.domain.model.User;



public class AuthUser extends User {
	private static final long serialVersionUID = 1L;

	  private Integer userId;
	  private String login;

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Integer getUserId() {
		return userId;
	}

	public String getLogin() {
		return login;
	}
	
	public AuthUser(
		    User usuario,
		    Collection<? extends GrantedAuthority> authorities
		  ) {
		    super(usuario.getLogin(), usuario.getPassword(), authorities);
		    this.userId = usuario.getId();
		    this.login = usuario.getLogin();
		  }
}
