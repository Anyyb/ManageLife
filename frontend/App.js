import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import UserProvider from './context/userProvider'
import Etusivu from './screens/etusivu';
import Tehtavalista from './screens/tehtavalista';
import Kuluseuranta from './screens/kuluseuranta';

//tämä on sovelluksen juuri tänne vain ne asetukset mitä tarvitsee sovellus arkkitehtuurin juureen

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const Stack1Navigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="E" component={Etusivu}/>
  </Stack.Navigator>
);

const Stack2Navigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="T" component={Tehtavalista} />
  </Stack.Navigator>
);

const Stack3Navigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="K" component={Kuluseuranta} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Etusivu" screenOptions={{ headerShown: true }}  >
      <Drawer.Screen name="Etusivu" component={Stack1Navigation}/>
      <Drawer.Screen name="Tehtävälista" component={Stack2Navigation }/>
      <Drawer.Screen name="Kuluseuranta" component={Stack3Navigation }/>
      </Drawer.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
