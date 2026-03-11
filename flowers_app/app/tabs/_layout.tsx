import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";



export default function TabsLayout() {
  return (
    
    <Tabs screenOptions={{ tabBarStyle: {backgroundColor: "#ffffffff"},tabBarActiveTintColor: "black", headerTitleAlign: "center" }}>
      <Tabs.Screen
        name ="home"
        options={{
           title: "Home",
           tabBarIcon: () => (
           <Entypo name="home" size={27} color="black" />
            ),
         }}
      />
      <Tabs.Screen
       name ="loja" 
       options={{
         title: "Shop",
         tabBarIcon: () =>(
          <FontAwesome name="shopping-basket" size={27} color="black" />
        ),
        }}/>
      </Tabs>
  );

}