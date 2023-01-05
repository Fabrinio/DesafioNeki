import React from "react";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import {
  Container,
  Content,
  Words,
  LabelSignup,
  Strong,
  Image,
  InputPassword,
} from "./styled";

import { Link } from "react-router-dom";

export function Login() {
  const passwordInput = document.getElementById("password");
  const eyeSvg = document.getElementById("eyeSvg");

  const showPassword = () => {
    passwordInput.setAttribute("type", "text");
    eyeSvg.setAttribute("src", "eye-off.svg");
  };

  const hidePassword = () => {
    passwordInput.setAttribute("type", "password");
    eyeSvg.setAttribute("src", "eye.svg");
  };

  const eyeClick = () => {
    const inputTypeIsPassword = passwordInput.type == "password";

    if (inputTypeIsPassword) {
      showPassword();
      console.log("teste senha on");
    } else {
      hidePassword();
     console.log("teste senhha offf")
    }
  };

  return (
    <Container>
      <Content>
        <Words>Login</Words>
        {/* falta definir os sets */}
        <Input type="email" placeholder="Digite seu E-mail" />
        <InputPassword>
          <Input id="password" type="password" placeholder="Digite sua Senha" />
          <Image
            id="eyeSvg"
            onClick={eyeClick}
            src="https://cdn-icons-png.flaticon.com/512/245/245428.png"
            width="20px"
            height="20px"
            alt="Botão para esconder e aparecer a senha"
          />
        </InputPassword>

        {/* falta fazer funcionar */}
        <Link to='/home'>
        <Button Text="Entrar" />
        </Link>

        <LabelSignup>
          Não tem uma conta?
          <Link to="/sing-up">
          <Strong> Registre-se</Strong>
          </Link>
        </LabelSignup>
      </Content>
    </Container>
  );
}
