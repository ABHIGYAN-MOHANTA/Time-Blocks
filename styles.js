import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D325A",
  },
  title: {
    backgroundColor: "#0E122B",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    paddingTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 42,
    marginVertical: 20,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  header: {
    backgroundColor: "#0E122B",
    textAlign: "center",
    fontVariant: "bold",
    color: "#ffffff",
    paddingBottom: 20,
  },
  subHeading: {
    fontSize: 16,
    marginHorizontal: 40,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  intervalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  timeLeftText: {
    fontSize: 16,
    marginBottom: 40,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  button: {
    flex: 1,
    backgroundColor: "#5E72E4",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 2,
  },
  button5: {
    marginRight: 10,
  },
  button10: {
    marginHorizontal: 10,
  },
  button25: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F6F6F6",
    textAlign: "center",
  },
  note: {
    fontSize: 14,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
});
