import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  ButtonExit,
  Logotype,
  Image,
  BemVindo,
  DivRefresh,
  DivModal,
  Span,
  ContainerList,
  ContainerButtons,
  ContainerGridLevel,
  ContainerSpans
} from "./styled";
import LogoNeki from "../../assets/Logo-Neki.png";
import MyButton from "../../components/Button/button";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { CardSkill } from "../../components/CardSkill/cardskill";
import { ModalSkill } from "../../components/Modal/modal";
import { DataContext } from "../../Context/dataContext";
import { DesafioNekiApi } from "../../Service/api";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Input = styled(MuiInput)`
  width: 42px;
`;

export function Home() {
  const { packageUserData } = useContext(DataContext);
  const { dataUser } = useContext(DataContext);
  const [user, setUser] = useState(null);
  const [getSkills, setGetSkills] = useState();

  const [levelKnowledge, setLevelKnowledge] = useState();
  const [skillSelected, setSkillSelected] = useState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [updateUseEffect, setUpdateUseEffect] = useState(false);
  const Navigation = useNavigate();

  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10) {
      setValue(10);
    }
  };

  const Logout = () => {
    localStorage.removeItem("login_key");
    Navigation("/");
  };

  const FunctionUpdateUseEffect = () => {
    if (updateUseEffect == true) {
      setUpdateUseEffect(false);
    } else {
      setUpdateUseEffect(true);
    }
  };

  const getUserData = async () => {
    await DesafioNekiApi.get(`/user/${dataUser.id}`, {
      headers: { Authorization: `Bearer ${dataUser.token}` },
    })
      .then((resp) => {
        console.log(resp.data.user_skills);
        setUser(resp.data.user_skills);
      })
      .catch((error) => {
        console.log("Erro no GET USER   " + JSON.stringify(error));
      });
  };

  const handleGetSkills = async () => {
    DesafioNekiApi.get(`/skill`, {
      headers: { Authorization: `Bearer ${dataUser?.token}` },
    })
      .then((res) => {
        setGetSkills(res.data);
        console.log("bbbb " + res.data);
      })
      .catch((error) => {});
  };

  const handleNameSkill = (event) => {
    setSkillSelected(event.target.value);
  };

  const handleKnowledgeLevel = (event) => {
    setLevelKnowledge(event.target.value);
  };

  useEffect(() => {
    packageUserData(localStorage.getItem("login_key"));
  }, [updateUseEffect]);

  useEffect(() => {
    getUserData();
    handleGetSkills();
  }, [dataUser]);

  const handleSaveUserSkill = async () => {
    FunctionUpdateUseEffect();
    try {
      console.log("pele morreu");
      await DesafioNekiApi.post(
        "/user_skill",
        {
          user: {
            userId: dataUser.id,
          },
          skill: {
            skillId: skillSelected,
          },
          knowledgeLevel: levelKnowledge,
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } }
      );
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!");
    }
  };

  const handleChangeLevel = async (idUserSkill, idSkill) => {
    try {
      await DesafioNekiApi.put(
        `/user_skill/${idUserSkill}`,
        {
          user: {
            userId: dataUser.id,
          },
          skill: {
            skillId: idSkill,
          },
          knowledgeLevel: value,
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } },
        console.log(
          "USER ID: " +
            dataUser.id +
            "SKILL ID: " +
            skillSelected +
            "LEVEL: " +
            value
        )
      ).then((resp) => {
        console.log("O seu nível foi alterado com sucesso.");
      });
    } catch (error) {
      console.log("Algo deu errado, tente novamente.");
    }
  };

  const DeleteSkill = async (id) => {
    FunctionUpdateUseEffect();
    DesafioNekiApi.delete(`/user_skill/${id}`, {
      headers: { Authorization: `Bearer ${dataUser?.token}` },
    })
      .then((resp) => {
        console.log("DELETADO COM SUCESSO DO BANCO" + id);
      })
      .catch((error) => {
        console.log("Erro no DELETE  " + JSON.stringify(error));
      });
  };

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

        <DivModal>
          <MyButton Text="Adicionar Skills" onClick={handleOpen} />
        </DivModal>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Skill
                </InputLabel>
                <NativeSelect
                  defaultValue={30}
                  inputProps={{
                    name: "SkillName",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleNameSkill}
                  value={skillSelected}
                >
                  {getSkills?.map((res) => (
                    <option value={res.skillId}>{res.skillName}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Nível de Conhecimento
                </InputLabel>
                <NativeSelect
                  inputProps={{
                    name: "Nível de Conhecimento",
                    id: "uncontrolled-native",
                  }}
                  onChange={handleKnowledgeLevel}
                  value={levelKnowledge}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <MyButton
              Text="Adicionar Skill"
              onClick={() => {
                handleSaveUserSkill();
              }}
            />
          </Box>
        </Modal>

        <ButtonExit>
          <MyButton Text="Sair" onClick={Logout} />
        </ButtonExit>
      </Container>

      <BemVindo>
        Seja bem vindo, {dataUser.userLogin}. Aqui estão suas skills.
      </BemVindo>

      <DivRefresh>
        <MyButton
          Text="Atualizar pagina"
          onClick={FunctionUpdateUseEffect}
        ></MyButton>
      </DivRefresh>

      <ContainerList>
        {user?.map((skill) => (
          <>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                backgroundColor: "#2d939c",
              }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={skill.skill.skillImage} />
                </ListItemAvatar>
                <ContainerSpans>
                <Span>{skill.skill.skillName}</Span>
                <Span> {"Nível " + skill.knowledgeLevel}</Span>
                </ContainerSpans>
                <ContainerGridLevel>
                  <Grid container spacing={10} alignItems="center">
                    <Grid item>
                      <Input
                        defaultValue={skill.knowledgeLevel}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                          step: 1,
                          min: 1,
                          max: 10,
                          type: "number",
                          "aria-labelledby": "input-slider",
                        }}
                      />
                    </Grid>
                  </Grid>
                </ContainerGridLevel>
                <ContainerButtons>
                  <MyButton
                    onClick={() => {
                      handleChangeLevel(skill.userSkillId, skill.skill.skillId);
                    }}
                    Text="Atualizar"
                  />

                  <MyButton
                    onClick={() => {
                      DeleteSkill(skill.userSkillId);
                    }}
                    Text="Deletar"
                  />
                </ContainerButtons>
              </ListItem>
            </List>
          </>
        ))}
      </ContainerList>
    </>
  );
}
