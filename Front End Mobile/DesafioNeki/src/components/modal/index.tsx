import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { DesafioNekiApi } from "../../services/api/api";
import { DataContext } from "../../context/dataContext";
import { CardSkills } from "../cardSkills";

export const ModalSkills = ({ isSelectedModal, setIsSelectedModal }) => {
  const { dataUser } = useContext(DataContext);
  const [getSkills, setGetSkills] = useState();

  const handleGetSkills = async () => {
    DesafioNekiApi.get(`skill`, {
      headers: {
        Authorization: `Bearer ${dataUser?.token}`,
      },
    })

      .then((res) => {
        setGetSkills(res.data);

        console.log("bbbb " + res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetSkills();
  }, []);

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
        <View style={{ width: "100%", marginBottom: 20, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 25,
              color: "white",
              marginLeft: 85,
              marginTop: 1,
            }}
          >
            Escolha uma skill nova
          </Text>
        </View>
        <FlatList
          data={getSkills}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <>
                <CardSkills
                  id={item.skillId}
                  name={item.skillName}
                  image={{ uri: item.skillImage }}
                />

                <View style={{ width: 30 }} />
              </>
            );
          }}
        />
      </View>
    </Modal>
  );
};
