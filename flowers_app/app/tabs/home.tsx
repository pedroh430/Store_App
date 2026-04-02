import ProductCard from "@/components/ProductCard";
import { Button } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, FlatList } from "react-native";
import { items } from "@/types/items";



export default function HomeScreen() {



  return (
    <>
    
    
     <Stack.Screen options={{headerShown: false}}/>
      
     <FlatList 
     
      data={items}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.conteine}
      style={styles.background}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ProductCard item={item} />}
    />
    </>


    
  );
}


const styles = StyleSheet.create({


  row:{
    gap: 15,
    padding: 10,
  },


  conteine: {
  justifyContent: "space-between",
  paddingBottom: 40,
  padding: 20,  
},

 background:{
   flex: 1,
   backgroundColor: "#ffffffff"
 }



})