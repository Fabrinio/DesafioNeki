package com.desafioneki.domain.service.security;


import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.desafioneki.domain.model.User;
import com.desafioneki.domain.repository.UserRepository;

// O UserDetailService e usado para recuperar os detalhes do usuario que esta tentando se autenticar
// na aplicacao. Isso e feito atraves do metodo loadUserByUsername.
// Se o usuario nao for encontrado e disparada uma excecao do tipo UsernameNotFoundException

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository userRepo;

  /*  @Override
  public UserDetails loadUserByUsername(String email)
    throws UsernameNotFoundException {
    Optional<Usuario> userRes = userRepo.findByEmail(email);
    if (userRes.isEmpty()) throw new UsernameNotFoundException(
      "Não foi possível encontrar usuário com o email = " + email
    );

    Usuario user = userRes.get();
    return new org.springframework.security.core.userdetails.User(
      email,
      user.getPassword(),
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    ); // Define, de forma estatica, o perfil do usuario encontrado
  } */

  @Transactional(readOnly = true)
  @Override
  public UserDetails loadUserByUsername(String username)
    throws UsernameNotFoundException {
    User usuario = userRepo
      .findByLogin(username)
      .orElseThrow(() ->
        new UsernameNotFoundException(
          "Usuário não encontrado com login informado"
        )
      );

    return new AuthUser(usuario, getAuthorities(usuario));
  }

}

