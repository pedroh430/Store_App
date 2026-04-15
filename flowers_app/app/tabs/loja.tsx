import { View, Text, FlatList, Image,TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Stack,} from "expo-router";
import { useCart } from "@/types/cartContent";
import {useState} from 'react';


export default function LojaScreen(){
    const {cart, removeFromCart, getTotal} = useCart();  
    const [text, setText] = useState('');



    if(cart.length ===0){
        return(
            <View style={styles.empty}>
                <Text style={styles.emptyText}>Seu cariinho esta vazio</Text>

            </View>
        )
    }
    return(
        <>
         <Stack.Screen options={{headerTitle:"Loja"}}/>

         <View style={styles.container}>
         <FlatList
         data={cart}
         keyExtractor={item => String(item.id)}
         renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.img} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>R$ {item.price.toFixed(2)} x {item.quantity}</Text>
              <Text style={styles.subtotal}>
                Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
              </Text>
              <TouchableOpacity style={styles.buttonremove} onPress={() => removeFromCart(item.id)}>
                <Text style={styles.remove}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>                                                               
          )}
         />
          <View style={styles.container2}>
             <TextInput
                style={styles.input}
                placeholder="Type here..."
                onChangeText={newText => setText(newText)}
                defaultValue={text}
              />
              <Text>You typed: {text}</Text>
           </View>
      <View style={styles.total}>
        <Text style={styles.totalText}>Total: R$ {getTotal().toFixed(2)}</Text>
      </View>
     </View>
  

        
        
        
        </>
    );

    
}; 


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#888" },
  card: { flexDirection: "row", marginBottom: 16, backgroundColor: "#fff", borderRadius: 10, padding: 10 },
  img: { width: 70, height: 70, borderRadius: 8 },
  info: { marginLeft: 12, justifyContent: "center" },
  name: { fontWeight: "bold", fontSize: 15 },
  subtotal: { color: "#555" },
  remove: { color: "white", marginTop: 4,textAlign:"center", },
  total: { padding: 16, borderTopWidth: 1, borderColor: "#eee",  },
  totalText: { fontSize: 18, fontWeight: "bold", textAlign: "right" },
  buttonremove:{backgroundColor:"red", borderRadius:10,}
  
});