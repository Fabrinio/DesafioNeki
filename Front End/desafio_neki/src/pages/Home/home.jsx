import React, { useContext, useState, useEffect } from "react";
import { Container, ButtonExit, Logotype, Image } from "./styled";
import LogoNeki from "../../assets/Logo-Neki.png";
import Button from "../../components/Button/button";

import { Link } from "react-router-dom";
import { CardSkill } from "../../components/CardSkill/cardskill";
import { ModalSkill } from "../../components/Modal/modal";
import { DataContext } from "../../Context/dataContext";

export function Home() {
  const { dataUser } = useContext(DataContext);
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    await SkillsApi.get(`/user/${userData.id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
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
  }, []);

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
        <ModalSkill />
        <ButtonExit>
          <Link to="/">
            <Button Text="Sair" />
          </Link>
        </ButtonExit>
      </Container>

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

      <CardSkill />
    </>
  );
}
