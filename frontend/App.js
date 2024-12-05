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
const navigationStyles = {
  headerStyle: { backgroundColor:'lightgrey'},
  headerTitleStyle: {fontWeight: 'bold'},
  headerTintColor: 'black',
  headerTitleAlign:'center',
 }
const Stack1Navigation = () => (
  <Stack.Navigator initialRouteName="Etusivu" screenOptions={navigationStyles}>
    <Stack.Screen name="Etusivu" component={Etusivu} initialParams={{ info: 'route params toimii' }}/>
  </Stack.Navigator>
);

const Stack2Navigation = () => (
  <Stack.Navigator screenOptions={navigationStyles}>
    <Stack.Screen name="Tehtävälista" component={Tehtavalista} />
  </Stack.Navigator>
);

const Stack3Navigation = () => (
  <Stack.Navigator screenOptions={navigationStyles}>
    <Stack.Screen name="Kuluseuranta" component={Kuluseuranta} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="E" component={Stack1Navigation}options={{ drawerLabel: 'Etusivu' }} />
      <Drawer.Screen name="T" component={Stack2Navigation }options={{ drawerLabel: 'Tehtävälista' }}/>
      <Drawer.Screen name="K" component={Stack3Navigation }options={{ drawerLabel: 'Kuluseuranta' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
