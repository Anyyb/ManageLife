import { useContext,useEffect, useState } from 'react';
import { StyleSheet,View,Text, Pressable, Button, TextInput, FlatList } from 'react-native';
import UserContext from '../context/userContext';


const Kuluseuranta=({navigation}) => {
const {user} = useContext(UserContext);
const [salary, setSalary] = useState('');
const [balance, setBalance] = useState(0);
const [expense, setExpense] = useState('');
const [description, setDescription] = useState('');
const [expenses, setExpenses] = useState([]);

const [wishlistItem, setWishlistItem] = useState('');
const [wishlistValue, setWishlistValue] = useState('');
const [wishlist, setWishlist] = useState([]);
const [savingAmount, setSavingAmount] = useState('');

useEffect(() => {
  navigation.setOptions({
  headerRight: () => (
    navigation.canGoBack() ? (
    <Pressable style={styles.buttonGoback} onPress={() => navigation.goBack()}>
      <Text style={{color:'white'}}>Back</Text>
    </Pressable>
     ) : null
),
});
}, [navigation]);


const handleAddSalary = () => {
  const num = parseFloat(salary);
  if (!isNaN(num)) {
    setBalance(balance + num);
    setSalary('');
  }
};

const handleAddExpense = () => {
  const num = parseFloat(expense);
  if (!isNaN(num) && description.trim() !== '') {
    setBalance(balance - num);
    setExpenses([...expenses, { id: Date.now().toString(), amount: num, desc: description }]);
    setExpense('');
    setDescription('');
  }
};

const handleAddWishlistItem = () => {
  const value = parseFloat(wishlistValue);
  if (!isNaN(value) && wishlistItem.trim() !== '') {
    setWishlist([
      ...wishlist,
      { id: Date.now().toString(), item: wishlistItem, value: value, saved: 0 },
    ]);
    setWishlistItem('');
    setWishlistValue('');
  }
};

const handleAddSaving = (id) => {
  const num = parseFloat(savingAmount);
  if (!isNaN(num)) {
    setBalance(balance - num);
    setWishlist(
      wishlist.map((wish) =>
        wish.id === id ? { ...wish, saved: wish.saved + num } : wish
      )
    );
    setSavingAmount('');
  }
};


return(
  <View style={styles.container}>
  <Text style={styles.title}>Kulunseuranta</Text>
  <Text>Kirjautuneena: {user ? user.name : 'Ei kirjautunut'}</Text>
  
  <View style={styles.tuloLomake}>
  {/* Kuukausipalkan syöttökenttä */}
  <TextInput
    style={styles.input}
    placeholder="Syötä tulo..."
    keyboardType="numeric"
    value={salary}
    onChangeText={(text) => setSalary(text)}
  />
  <Pressable style={styles.buttonAdd} onPress={handleAddSalary}>
          <Text style={styles.buttonText}>Lisää tulo..</Text>
        </Pressable>
    
</View>
  {/* Kulun syöttökenttä */}
  <TextInput
    style={styles.input}
    placeholder="Syötä meno..."
    keyboardType="numeric"
    value={expense}
    onChangeText={(text) => setExpense(text)}
  />
  <TextInput
    style={styles.input}
    placeholder="Mikä meno? (esim. Kauppa)"
    value={description}
    onChangeText={(text) => setDescription(text)}
  />
  <Pressable style={styles.buttonAdd} onPres={handleAddExpense}>
          <Text style={styles.buttonText}>Lisää meno..</Text>
        </Pressable>

  {/* Näytetään saldo */}
  <Text style={styles.balance}>Saldo: {balance.toFixed(2)} €</Text>

  {/* Kulujen lista */}
  <Text style={styles.listTitle}>Menot:</Text>
  <FlatList
    data={expenses}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <Text style={styles.expenseItem}>
        - {item.desc}: {item.amount.toFixed(2)} €
      </Text>
    )}
  />

  {/* Toivelistan lisäys */}
  <TextInput
    style={styles.input}
    placeholder="Syötä toive (esim. Thaimaan matka)"
    value={wishlistItem}
    onChangeText={(text) => setWishlistItem(text)}
  />
  <TextInput
    style={styles.input}
    placeholder="Syötä toiveen arvo..."
    keyboardType="numeric"
    value={wishlistValue}
    onChangeText={(text) => setWishlistValue(text)}
  />
  <Pressable style={styles.buttonAdd} onPress={handleAddWishlistItem}>
          <Text style={styles.buttonText}>Lisää toive..</Text>
        </Pressable>

  {/* Toivelistan näyttö */}
  <Text style={styles.listTitle}>Toivelista:</Text>
  <FlatList
    data={wishlist}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.wishlistItem}>
        <Text>
          {item.item}: {item.value.toFixed(2)} € (Säästetty: {item.saved.toFixed(2)} €)
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Lisää säästö..."
          keyboardType="numeric"
          value={savingAmount}
          onChangeText={(text) => setSavingAmount(text)}
        />
        <Pressable style={styles.buttonAdd} onPress={handleAddSaving}>
          <Text style={styles.buttonText}>Lisää säästö..</Text>
        </Pressable>
        
      </View>
    )}
  />
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#9988bb',
    padding: 20,
    
  },
  title: {
    fontSize: 27,
    color: '#0',
    marginBottom: 20,
  },
  
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
    
  },
  balance: {
    fontSize: 20,
    color: '#0',
    marginTop: 20,
    marginBottom: 20,
    
  },
  listTitle: {
    fontSize: 18,
    color: '#0',
    marginBottom: 10,
    
  },
  expenseItem: {
    fontSize: 16,
    color: '#0',
    marginBottom: 5,

    
  },
  wishlistItem: {
    marginBottom: 20,
    
    alignItems: 'center',
    
  },

  buttonGoback: {
    padding:5,
    margin:2,
    backgroundColor: '#5d4c7f',
    borderRadius: 2,

},
buttonAdd:{
  padding:5,
  margin:2,
  backgroundColor: '#5d4c7f',
  borderRadius: 2,
},

buttonText:{
  fontWeight:'bold',
  color: 'white',
  fontSize:13,
},

});
  
export default Kuluseuranta;