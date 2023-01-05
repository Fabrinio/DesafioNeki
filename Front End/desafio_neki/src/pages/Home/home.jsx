import React from "react";
import { Container, ButtonExit, Logotype, Image } from "./styled";
import LogoNeki from "../../assets/Logo-Neki.png";
import Button from "../../components/Button/button";

import { Link } from "react-router-dom";

export function Home(){

    return(
        <>
        <Container> 
            <Logotype>
            <Image src="https://neki-it.com.br/wp-content/uploads/2022/01/Logo-Neki.png" alt="logo Neki" />  
            <h2>NekiSkills</h2>
            </Logotype>
             
             <ButtonExit>
             <Link to="/">
                <Button Text="Sair"/>
            </Link>
        </ButtonExit>
            
        </Container>
        
        </>
    )
}