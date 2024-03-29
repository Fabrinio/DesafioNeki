import React, { useContext, useState, useEffect } from "react";
import {
  ContainerHeader,
  ButtonExit,
  Logotype,
  Image,
  BemVindo,
  DivRefresh,
  DivModal,
  Span,
  SpanName,
  ContainerList,
  ContainerButtons,
  ContainerGridLevel,
  ContainerSpans,
} from "./styled";

import MyButton from "../../components/Button/button";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/dataContext";
import { DesafioNekiApi } from "../../Service/api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import MuiInput from "@mui/material/Input";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const getCurrentDate = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date;
  };

  const notifySkillRegistration = () =>
    toast.success("Skill Adicionada com Sucesso", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifyDeletedSkill = () =>
    toast.success("Skill Deletada com Sucesso", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  const notifySkillUpdate = () =>
    toast.success("Skill Atualizada com Sucesso", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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

  const FunctionUpdateUseEffect = () => {
    if (updateUseEffect == true) {
      setUpdateUseEffect(false);
    } else {
      setUpdateUseEffect(true);
    }
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
          createdAt: getCurrentDate(),
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } }
      );
      notifySkillRegistration();
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!");
    }
  };

  const handleChangeLevel = async (idUserSkill, idSkill) => {
    FunctionUpdateUseEffect();
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
          updatedAt: getCurrentDate(),
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
        notifySkillUpdate();
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
        notifyDeletedSkill();
      })
      .catch((error) => {});
  };

  return (
    <>
      <ContainerHeader>
        <Logotype>
          <Image
            src="https://neki-it.com.br/wp-content/uploads/2022/01/Logo-Neki.png"
            alt="logo Neki"
            width="120"
            height="120"
          />
          <h2 style={{ marginLeft: 15 }}>NekiSkills</h2>
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
      </ContainerHeader>

      <BemVindo>
        Seja bem vindo, {dataUser?.userLogin}. Aqui estão suas skills.
      </BemVindo>

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
                  <SpanName>{skill.skill.skillName}</SpanName>
                  <p>‎</p>
                </ContainerSpans>
                <ContainerGridLevel>
                  <Grid container spacing={10} alignItems="center">
                    <Grid item>
                      <Span>Nível:</Span>
                      
                      <Input
                        sx={{ color: "#fff" }}
                        key={skill.skill.skillName}
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
                  <p>‎</p>
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
