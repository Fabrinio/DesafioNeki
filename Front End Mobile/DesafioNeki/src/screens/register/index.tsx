import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { DesafioNekiApi } from "../../services/api/api";

import { Ionicons } from "@expo/vector-icons";

export function Register({ navigation }) {
  const [login, setLogin] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  // verifica se a senhas digitadas estão e iguais, e faz o registro
  const handleRegistration = async () => {
    console.log(`Login: ${login} Senha: ${password}`);

    if (password == passwordConfirm) {
      try {
        console.log("vc pensa que o flamengo eh time");

        const returned = await DesafioNekiApi.post("/auth/registration", {
          userLogin: login,
          userPassword: password,
        });

        console.log("Mengo " + JSON.stringify(returned));

        if (returned.status === 200) {
          alert("Usuário cadastrado com sucesso! (* ^ ω ^)");
          navigation.navigate("Login");
        }
      } catch (error) {}
    } else {
      Alert.alert("Ops...", "As senhas não coincidem! (μ_μ)");
    }
  };

  return (
    <View style={styles.generalContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Sing-Up</Text>

        <TextInput
          placeholder="Insira um nome de login"
          style={styles.input}
          onChangeText={(value) => {
            setLogin(value);
          }}
        />

        <TextInput
          placeholder="Insira sua senha"
          secureTextEntry={hidePass}
          onChangeText={(value) => {
            setPassword(value);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirme sua senha"
          secureTextEntry={true}
          onChangeText={(value) => {
            setPasswordConfirm(value);
          }}
          style={styles.input}
        />

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

        {/* button de criar a conta */}
        <TouchableOpacity
          onPress={() => handleRegistration()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
