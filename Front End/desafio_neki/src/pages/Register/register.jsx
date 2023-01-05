import React from "react";
import { Container, Content, Words } from "./styled";
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";
import { Link } from "react-router-dom";

export function Register() {
     
    return(
        <Container>
         <Content>
            <Words>Sing-Up</Words>
            <Input placeholder="Insira um nome de login"/>
            <Input placeholder="Insira sua senha"/>
            <Input placeholder="Confirme sua senha"/>
            <Link to="/">
            <Button Text="Criar conta"/>
            </Link>
        </Content>
        </Container>
       
     )
}