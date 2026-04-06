import { Image, StyleSheet, Text, View, Button } from "react-native";
import {Item} from "../types/item"



export default function ProductCard({item}: {item: Item}) {
  



  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.img}/>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:"#ffffffff",
    padding: 5,
    gap:2,
    elevation:5,
    alignItems:"center",
    width: "48%",
    height: "100%",
    borderRadius: 20,
  },
  img: {
    width: 250,
    height: 80,
    borderRadius: 80,
    resizeMode: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
  price: {
    fontSize: 12,
    color: "#000000ff",
    marginTop: 5,
    fontWeight: "bold",
    textAlign:"center",
  },
  info:{
    backgroundColor: "#e56a9b1d",
    width: "100%",
    marginTop: 10,
    borderRadius: 20,
  },
    
  }
);
