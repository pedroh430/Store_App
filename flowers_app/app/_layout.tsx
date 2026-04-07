import { CartProvider } from "@/types/cartContent";
import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";




export default function TabsLayout() {
  return(
   <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
      </Stack>
    </CartProvider>
      
    
    
    
    
  ) ;
  
    
  

    

   
   
  
    
}