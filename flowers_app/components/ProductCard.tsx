import {Image,StyleSheet,Text,View,TouchableOpacity,} from "react-native";
import { Item } from "../types/item";
import { useCart } from "@/types/cartContent";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ item }: { item: Item }) {
  const { addToCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imgUrl }} style={styles.img} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.price}>
          R$ {item.price.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(item)}
      >
        <View style={styles.buttonContent}>
          <Ionicons name="cart" size={18} color="#fff" />

          <Text style={styles.buttonText}>
            Adicionar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: 155,

    padding: 12,
    marginBottom: 18,

    borderRadius: 24,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.08,
    shadowRadius: 20,

    elevation: 5,
  },

  img: {
    width: "100%",
    height: 125,

    borderRadius: 16,
  },

  info: {
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",

    color: "#222",

    textAlign: "center",
  },

  price: {
    fontSize: 22,
    fontWeight: "700",

    color: "#8B4513",

    marginTop: 6,
  },

  button: {
    backgroundColor: "#ff5fa2df",

    width: "100%",

    paddingVertical: 10,

    borderRadius: 14,

    alignItems: "center",

    marginTop: 14,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});