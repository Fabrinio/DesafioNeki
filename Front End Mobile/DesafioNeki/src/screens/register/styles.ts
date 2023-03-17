import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  // container geral
  generalContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
    backgroundColor: "#211f1f",
    color: "",
  },
  container: {
    backgroundColor: "#2d939c",
    padding: 20,
    width: 380,
    height: 500,
    borderRadius: 10,
  },
  // mensagem do sing up
  header: {
    paddingTop: 50,
    paddingBottom: 40,
    fontSize: 50,
    textAlign: "center",
    color: "whitesmoke",
  },
  // styles dos inputs
  input: {
    padding: 10,
    backgroundColor: "#f0f2f5",
    color: "gray",
    width: 350,
    height: 50,
    fontSize: 18,
    marginTop: 8,
    borderRadius: 7,
  },
  //button de criar a conta
  button: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#233653",
    color: "white",
    width: 350,
    height: 50,
    marginTop: 20,
    borderRadius: 7,
  },
  // texto do botão
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
  // olhinho da senha
  eyevisible: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    right: 55,
    paddingTop: 245,
    paddingLeft: 25,
    width: 50,
  },
});
