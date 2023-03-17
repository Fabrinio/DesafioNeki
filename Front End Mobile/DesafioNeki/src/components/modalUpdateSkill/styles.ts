import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  modalContentView: {
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#2d939c",
    backgroundColor: "#2d939c",
    paddingHorizontal: 14,
    paddingVertical: 20,
    height: "55%",
    marginTop: "auto",
  },
  input: {
    padding: 10,
    backgroundColor: "#f0f2f5",
    color: "gray",
    width: 350,
    height: 50,
    fontSize: 18,
    marginTop: 100,
    borderRadius: 7,
    alignSelf: "center",
  },
  button: {
    paddingTop: 10,
    padding: 10,
    backgroundColor: "#233653",
    color: "white",
    width: 350,
    height: 80,
    marginTop: 10,
    borderRadius: 7,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
    marginTop: 5
  },
});
