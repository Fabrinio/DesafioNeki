import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { DesafioNekiApi } from "../../services/api/api";
import { DataContext } from "../../context/dataContext";

export const ModalUpdateSkills = ({
  isSelectedModal,
  setIsSelectedModal,
  idUserSkill,
  idSkill,
}) => {
  const { dataUser } = useContext(DataContext);
  const [knowledgeLevel, setKnowledgeLevel] = useState(0);
  
  const getCurrentDate = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date;
  };

  const handleUpdateUserSkill = async () => {
    try {
      if (knowledgeLevel >= 1 && knowledgeLevel <= 10) {
        await DesafioNekiApi.put(
          `user_skill/${idUserSkill}`,
          {
            user: {
              userId: dataUser.id,
            },
            skill: {
              skillId: idSkill,
            },
            knowledgeLevel: knowledgeLevel,
            updatedAt: getCurrentDate(),
          },
          { headers: { Authorization: `Bearer ${dataUser?.token}` } }
        );
        console.log("pele morreu");
        console.log(idSkill);
        alert(
          "Seu nível de conhecimento foi alterado com sucesso! \nPara ver, atualize sua página home."
        );
      } else {
       Alert.alert("Ops...",
          "O seu nível de conhecimento está fora dos limites. \nTente novamente."
        );
      }
      
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSelectedModal}
      onRequestClose={() => {
        setIsSelectedModal(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsSelectedModal(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContentView}>
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              marginLeft: 110,
              marginTop: 1,
            }}
          >
            Adicionando skill
          </Text>

          <TextInput
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={(text) => {
              const numericValue = parseInt(text, 10);
              setKnowledgeLevel(numericValue);
            }}
            placeholder="Digite o seu nível de conhecimento (de 1 a 10)"
          ></TextInput>
          <TouchableOpacity
            onPress={() => handleUpdateUserSkill()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Clique aqui para atualizar seu conhecimento
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
