import React, { useEffect, useState, useContext, useCallback } from "react";
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./styles";
import { DataContext } from "../../context/dataContext";
import { DesafioNekiApi } from "../../services/api/api";
import { CardUserSkill } from "../../components/userCardSkills";
import { clearStorage } from "../../services/LocalStorage";

import { ModalSkills } from "../../components/modal/index";

import LogoNeki from "../../assets/image/Logo-Neki.png";
import { FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

export function Home({ navigation }) {
  const { dataUser } = useContext(DataContext);

  const [isSelectedModal, setIsSelectedModal] = useState(false);
  const [user, setUser] = useState();
  const [refreshList, setRefreshList] = useState(false);

  //get userById na api
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

  //delete userSkill do user
  const DeleteSkill = async (id) => {
    DesafioNekiApi.delete(`/user_skill/${id}`, {
      headers: { Authorization: `Bearer ${dataUser?.token}` },
    })
      .then((resp) => {
        setRefreshList(true);
      })
      .catch((error) => {});
  };

  //logout
  const Logout = () => {
    clearStorage();
    navigation.navigate("Login");
  };

  useEffect(() => {
    getUserData();
    setRefreshList(false);
  }, [refreshList]);

  return (
    <View style={styles.generalContainer}>
      {/* header */}
      <View style={styles.headerContainer}>
        <Image source={LogoNeki} style={styles.image} />
        <Text style={styles.header}>NekiSkills</Text>
        <View>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={() => Logout()}
          >
            <SimpleLineIcons name="logout" size={28} color="whitesmoke" />
          </TouchableOpacity>
        </View>
      </View>

      {/* mensagem de bem vindo */}
      <Text style={styles.welcome}>
        Seja bem vindo, {dataUser?.userLogin}. Aqui estão suas skills.
      </Text>

      {/* botão para adicionar skill e atualizar a screen home */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsSelectedModal(true)}
        >
          <Text style={styles.buttonText}>Adicionar Skill</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonUpdate}
          onPress={() => setRefreshList(true)}
        >
          <FontAwesome name="refresh" size={24} color="whitesmoke" />
        </TouchableOpacity>
      </View>

      {/* flat list das userSkill */}
      <FlatList
        data={user}
        keyExtractor={(item) => item.userSkillId}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row" }}>
              <CardUserSkill
                name={item.skill.skillName}
                description={item.skill.skillDescription}
                image={item.skill.skillImage}
                version={item.skill.skillVersion}
                knowledgeLevel={item.knowledgeLevel}
                id={item.userSkillId}
                deleteUserSkill={DeleteSkill}
                idSkill={item.skill.skillId}
              />

              <View style={{ width: 30 }} />
            </View>
          );
        }}
      />

      <ModalSkills
        isSelectedModal={isSelectedModal}
        setIsSelectedModal={setIsSelectedModal}
      />
    </View>
  );
}
