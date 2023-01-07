import React, { useContext, useState, useEffect } from "react";
import { Container, ButtonExit, Logotype, Image, BemVindo } from "./styled";
import LogoNeki from "../../assets/Logo-Neki.png";
import Button from "../../components/Button/button";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { CardSkill } from "../../components/CardSkill/cardskill";
import { ModalSkill } from "../../components/Modal/modal";
import { DataContext } from "../../Context/dataContext";
import { DesafioNekiApi } from "../../Service/api";

export function Home() {

  const {packageUserData} = useContext(DataContext);
  const { dataUser } = useContext(DataContext);
  const [user, setUser] = useState(null);

  const [updateUseEffect, setUpdateUseEffect] = useState(false);
  const Navigation = useNavigate();

  const Logout = () => {
    localStorage.removeItem("login_key");
    Navigation("/");
  }

  const FunctionUpdateUseEffect = ()  =>{
    if(updateUseEffect == true){
      setUpdateUseEffect(false);
    }else{
      setUpdateUseEffect(true);  
    }
  
  }

  const getUserData = async () => {
    await DesafioNekiApi.get(`/user/${dataUser.id}`, {
      headers: { Authorization: `Bearer ${dataUser.token}` },
    })
      .then((resp) => {
        console.log(resp.data.user_skill);
      })
      .catch((error) => {
        console.log("Erro no GET USER   " + JSON.stringify(error));
      });
  };

  useEffect(() => {
    getUserData();
    packageUserData(localStorage.getItem("login_key"));
  }, [updateUseEffect]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Container>
        <Logotype>
          <Image
            src="https://neki-it.com.br/wp-content/uploads/2022/01/Logo-Neki.png"
            alt="logo Neki"
          />
          <h2>NekiSkills</h2>
        </Logotype>
        
        <ButtonExit>
          
            <Button Text="Sair" onClick={Logout} />
          
        </ButtonExit>
      </Container>
      
      <BemVindo>Seja bem vindo, {dataUser.userLogin}. Aqui estão suas skills.</BemVindo>

      <ModalSkill />

      <div>
        <ul>
          {user?.map((skill) => (
            <>
              {/* <p key={skills.id}> {skill.userSkills.skills.skillName}</p>*/}
              <li key={skills.userId}>{skills.skill.skillName}</li>
            </>
          ))}
        </ul>
      </div>

      <Button Text="Atualizar pagina" onClick={FunctionUpdateUseEffect}></Button>

      <CardSkill />
    </>
  );
}
