import { Tabs } from "expo-router";

// Icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    // set color for active tab to hex by 
      <Tabs screenOptions={{tabBarActiveTintColor: "#1875e2"}}> 
        <Tabs.Screen name="index"
        options={{ 
          title: 'Home',
          headerTitleAlign: 'center',
          tabBarIcon: ({color, focused})=> (
            focused ? <Ionicons name="home" size={24} color={color} /> : <Ionicons name="home-outline" size={24} color={color} />
          ) }} />
        <Tabs.Screen name="login" options={{ title: 'Login', headerTitleAlign: 'center', tabBarIcon: ({color})=> <MaterialIcons name="login" size={24} color={color} /> }} /> 
      </Tabs>
  )
}
