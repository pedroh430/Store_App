import ProductCard from "@/components/ProductCard";
import { Button } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, FlatList } from "react-native";
import { items } from "@/types/items";

export default function HomeScreen() {
   


  return (

    <FlatList 
     
      data={items}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.conteine}
      style={styles.background}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ProductCard item={item} />}
    />


    
  );
}


const styles = StyleSheet.create({


  row:{
    gap: 12,
    padding: 12,

  },

  conteine: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  paddingBottom: 20,
  padding: 16,
  gap: 16,
  
  

  
},

 background:{
   flex: 1,
   backgroundColor: "#f134863c"
 }



})