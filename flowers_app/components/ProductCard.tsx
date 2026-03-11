import { Image, StyleSheet, Text, View } from "react-native";



export default function ProductCard({item}) {



  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.img}/>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:"#e56a9bff",
    padding: 10,
    borderRadius: 30,
    marginBottom: 15,
    alignItems:"center",
    elevation: 3,
    width: "48%",
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 12,
    color: "#000000ff",
    marginTop: 5,
    fontWeight: "bold"
  },
});
