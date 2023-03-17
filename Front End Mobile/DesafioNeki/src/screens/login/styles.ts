import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //container geral
  generalContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
    backgroundColor: "#211f1f",
    color: "",
  },
  //container onde azul onde estão as coisas
  container: {
    backgroundColor: "#2d939c",
    padding: 20,
    width: 380,
    height: 500,
    borderRadius: 10,
  },
  //mensagem de bem vindo
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    fontSize: 50,
    textAlign: "center",
    color: "whitesmoke",
  },
  //input
  input: {
    padding: 10,
    backgroundColor: "#f0f2f5",
    color: "gray",
    width: 350,
    height: 50,
    fontSize: 18,
    marginTop: 4,
    borderRadius: 7,
  },
  //button de entrar
  button: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#233653",
    color: "white",
    width: 350,
    height: 50,
    marginTop: 10,
    borderRadius: 7,
  },
  //texto dos buttons
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  //texto que leva para a pagina de registo
  register: {
    marginTop: 20,
    fontSize: 21,
    textAlign: "center",
    color: "white",
  },
  //olhinho da senha
  eyevisible: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    right: 55,
    paddingTop: 280,
    paddingLeft: 25,
    width: 50,
  },
});
