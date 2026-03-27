import { Image, StyleSheet, Text, View } from "react-native";
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
    backgroundColor:"#e56a9bff",
    padding: 5,
    gap:2,
    borderRadius: 30,
    marginBottom: -5,
    alignItems:"center",
    elevation: 3,
    width: "48%",
    
  },
  img: {
    width: 250,
    height: 80,
    borderRadius: 80,
    resizeMode: "contain",
    borderCurve:"circular",
    
  },
  name: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
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
    backgroundColor: "white",
    width: "100%",
    borderRadius: 30,
    marginTop: 10
    
  },
    
  }
);
