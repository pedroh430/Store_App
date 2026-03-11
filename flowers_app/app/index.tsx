import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function StartScreen() {
  const router = useRouter();

  

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Bem-vindo ao App!</Text>
     
      <TouchableOpacity style={styles.button} onPress={() => router.replace ("/tabs")}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
       <Text style={styles.subtitle}>“Organize, personalize e monte cestas com facilidade.”</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: "bold",
  },
  button: {
    marginTop: 50,
    backgroundColor: "#e56a9bff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    fontSize:20,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
    position: "absolute",
    bottom:50,
    color:"#0000009e"
  }
});
