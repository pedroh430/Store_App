import ProductCard from "@/components/ProductCard";
import { router, Stack } from "expo-router";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { Item } from "@/types/item";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import Feather from "@expo/vector-icons/build/Feather";

const API_URL ="http://192.168.10.194:8080"

export default function HomeScreen() {
  const [products, setProducts] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/Products`);
      if (!response.ok) throw new Error(`Erro: ${response.status}`);
      const data = await response.json();
      console.log("Dados:", JSON.stringify(data));
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error}</Text>;

  return (
    
    <View style={styles.background}>
      <Stack.Screen options={{ headerShown: false }} />
      <FlatList
        data={products}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.conteine}
        keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push("/addProduct")}>
        <Feather name="plus" size={30} color={"#fff"}> </Feather>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  row: {
    gap: 10,
    padding: 10,
  },
  conteine: {
    justifyContent: "center",
    paddingBottom: 40,
    padding: 20,
    paddingTop:12,
  },
  background: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#e56a9b",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  }
});