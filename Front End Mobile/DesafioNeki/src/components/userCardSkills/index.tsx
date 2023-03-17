import React, { useState, useContext } from "react";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { ModalUpdateSkills } from "../modalUpdateSkill";

export const CardUserSkill = ({
  name,
  version,
  description,
  image,
  knowledgeLevel,
  deleteUserSkill,
  id,
  idSkill,
}) => {

  const [isSelectedModal, setIsSelectedModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.logoview}>
        <Image style={{ height: 80, width: 80 }} source={{ uri: image }} />
      </View>
      <View
        style={{ justifyContent: "center", alignContent: "center", width: 150 }}
      >
        <Text style={{ color: "white", marginBottom: 8 }}>{name}</Text>
        <Text style={{ color: "white", marginBottom: 8 }}>
          Version: {version}
        </Text>
        <Text style={{ color: "white", marginBottom: 8 }}>{description}</Text>
        <Text style={{ color: "white" }}>
          Nível de conhecimento: {knowledgeLevel}
        </Text>
      </View>
      <View>
        <MaterialCommunityIcons
          name="delete-forever-outline"
          style={{ alignSelf: "flex-end", marginTop: 15, marginLeft: 50 }}
          size={30}
          color="white"
          onPress={() => deleteUserSkill(id)}
        />
        <Feather
          name="edit"
          onPress={() => setIsSelectedModal(true)}
          style={{ alignSelf: "flex-end", marginTop: 20 }}
          size={28}
          color="white"
        />
      </View>

      <ModalUpdateSkills
        idSkill={idSkill}
        idUserSkill={id}
        isSelectedModal={isSelectedModal}
        setIsSelectedModal={setIsSelectedModal}
      />
    </View>
  );
};
