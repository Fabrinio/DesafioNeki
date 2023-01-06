import React from "react";
import { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/dataContext";
import {DesafioNekiApi} from "../../Service/api"


export function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { packageUserData } = useContext(DataContext);

  const Navigation = useNavigate();

  const handleLogin = async () => {
    var tokenJwt = null;
    try {
      const returned = await DesafioNekiApi.post("auth/login", {
        userLogin: login,
        userPassword: password,
      }); 

      if (returned.status === 200) {
        tokenJwt = returned.data;
        console.log("Retorno Token:" + JSON.stringify(tokenJwt));

        packageUserData(tokenJwt["jwt-token"]);

        Navigation("/home");
      }
    } catch (error) {}
  };

  const [showPassword, setShowPassword] = useState(false);

  const PasswordView = () => {
    if (showPassword != true) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <Container>
      <Content>
        <Words>Login</Words>
        {/* falta definir os sets */}
        <Input type="text" placeholder="Digite seu login" onChange={setLogin} />

        <InputPassword>
          <Input
            id="password"
            type={showPassword == true ? "login" : "password"}
            placeholder="Digite sua Senha"
            onChange={setPassword}
          />
        </InputPassword>
        <Button Text="Mostrar Senha" onClick={PasswordView}></Button>

        {/* falta fazer funcionar */}
          <Button Text="Entrar" onClick={() => handleLogin()} />

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
