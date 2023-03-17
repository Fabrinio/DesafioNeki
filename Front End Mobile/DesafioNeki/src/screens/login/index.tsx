import React, { useState, useContext, useEffect } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import { DesafioNekiApi } from "../../services/api/api";
import { DataContext } from "../../context/dataContext";
import {
  storeLocalData,
  retrieveLocalData,
} from "../../services/LocalStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";

export function Login({ navigation }) {
  
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { packageUserData } = useContext(DataContext);
  const [hidePass, setHidePass] = useState(true);
  const [loged, setLoged] = useState(false);

  // navigation para o registo
  const goRegister = () => {
    navigation.navigate("Register");
  };


  // handle de login com API
  const handleLogin = async () => {
    console.log(`Login: ${login} Senha: ${password}`);
    try {
      const { data } = await DesafioNekiApi.post<{ "jwt-token": string }>(
        "auth/login",
        {
          userLogin: login,
          userPassword: password,
        }
      );

      console.log("Retorno do jwt: " + JSON.stringify(data));

      await AsyncStorage.setItem("@login_key", data["jwt-token"]);

      console.log("Pacote de dados do usuário: " + packageUserData);

      packageUserData(await AsyncStorage.getItem("@login_key"));

      navigation.navigate("Home");

      if (loged == true) {
        storeLocalData("@login_key", data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Ops..","Usuário ou senha incorretas! Não foi possível realizar o login!");
    }
  };

  // salvando o jwt para permitir esta logado
  const verifyLogin = async () => {
    try {
      const res = JSON.parse(await retrieveLocalData("@login_key"));

      if (res == null) {
        return;
      }

      packageUserData(res["jwt-token"]);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <View style={styles.generalContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Bem Vindo ao NekiSkills</Text>

        <TextInput
          placeholder="Digite seu login"
          style={styles.input}
          onChangeText={(value) => {
            setLogin(value);
          }}
        />

        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={hidePass}
          style={styles.input}
          onChangeText={(value) => {
            setPassword(value);
          }}
        />

        {/* caixa de seleção */}
        <View>
          <Checkbox.Item
            label="Deseja permanecer logado?"
            status={loged ? "checked" : "unchecked"}
            onPress={() => {
              setLoged(!loged);
            }}
            color="#233653"
            uncheckedColor="whitesmoke"
            labelStyle={{ color: "whitesmoke" }}
          />
        </View>

        {/* olhinho da senha */}
        <TouchableOpacity
          style={styles.eyevisible}
          onPress={() => setHidePass(!hidePass)}
        >
          {hidePass ? (
            <>
              <Ionicons name="eye-off-outline" size={24} color="#233653" />
            </>
          ) : (
            <>
              <Ionicons name="eye-outline" size={24} color="#233653" />
            </>
          )}
        </TouchableOpacity>

        {/* botão de login */}
        <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* botão para ir para o registo */}
        <TouchableOpacity>
          <Text style={styles.register} onPress={() => goRegister()}>
            Não tem uma conta ainda? Registre-se aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
