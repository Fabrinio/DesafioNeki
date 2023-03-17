import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  //container geral
  generalContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
    backgroundColor: "#211f1f",
    color: "",
  },
  // styles da header {logoneki, logotipoNeki e botão de logout}
  headerContainer: {
    backgroundColor: "#2d939c",
    padding: 20,
    width: 450,
    height: 200,
    borderRadius: 10,
  },
  image: {
    width: 95,
    height: 95,
    marginTop: 50,
    marginLeft: 30,
  },
  header: {
    marginTop: -75,
    paddingBottom: 40,
    fontSize: 45,
    textAlign: "center",
    color: "whitesmoke",
  }, 
  buttonLogout: {
    paddingTop: 10,
    padding: 10,
    alignSelf: "flex-end",
    backgroundColor: "#2d939c",
    color: "white",
    alignItems: "center",
    width: 50,
    height: 50,
    marginTop: -85,
    marginBottom: 30,
    marginRight: 15,
    borderRadius: 100,
  },
  //styles bem vindo para o user
  welcome: {
    marginTop: 27,
    paddingBottom: 10,
    fontSize: 37.5,
    textAlign: "center",
    color: "whitesmoke",
  },
  //button de add skill
  button: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#2d939c",
    color: "white",
    width: 300,
    height: 50,

    marginBottom: 30,
    marginTop: 20,
    borderRadius: 7,
  },
  //button de atualizar a screen home
  buttonUpdate: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#2d939c",
    color: "white",
    alignItems: "center",
    width: 50,
    height: 50,
    marginTop: 20,
    marginBottom: 30,
    marginLeft: 20,
    borderRadius: 100,
  },
  //estilo do texto de butões
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});
