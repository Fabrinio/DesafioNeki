import { Text, View, TouchableOpacity, Image, Alert } from "react-native";
import { useState, useContext, useEffect } from "react";
import { styles } from "./styles";

import { DataContext } from "../../context/dataContext";
import { DesafioNekiApi } from "../../services/api/api";

export function CardSkills({ name, image, id }) {
  const { dataUser } = useContext(DataContext);
  const [refreshList, setRefreshList] = useState(false);

  const getCurrentDate = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date;
  };

  const handleSaveUserSkill = async () => {
    try {
      console.log("pele morreu");
      await DesafioNekiApi.post(
        "user_skill",
        {
          user: {
            userId: dataUser.id,
          },
          skill: {
            skillId: id,
          },
          knowledgeLevel: 0,
          createdAt: getCurrentDate(),
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } }
      );
      Alert.alert("Ai sim!",
        "Skill nova adicionada ao seu perfil! \nPor favor atualize a sua home para poder vê-la."
      );
      setRefreshList(true);
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!");
      console.log(error);
    }
  };

  useEffect(() => {
    setRefreshList(false);
  }, [refreshList]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleSaveUserSkill();
        }}
      >
        <Image style={styles.image} source={image} />
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
