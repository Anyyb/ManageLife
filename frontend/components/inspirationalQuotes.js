import { useState, useEffect } from 'react'
import { StyleSheet,View,Text} from 'react-native';
import quoteService from '../services/quoteService';

const QuotesList = () => {
    const [quotes, setQuotes] = useState([])
    
    //haetaan quote
    useEffect(() => {
    quoteService.getAll().then(quotes => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuotes(randomQuote);
    })
  }, [])

    return (
      <View>
        <Text style={styles.textHeader}>Päivän tsemppari:</Text>
        <Text style={styles.text}>"{quotes.quote}"</Text>
      </View>
    )
  }
const styles = StyleSheet.create({
    textHeader: {
        textAlign:'center',
        padding:3,
        fontSize:15,
        fontWeight:700,
        color:"white",
},
    text: {
        textAlign:'justify',
        fontSize:15,
        padding:3,
        color:"white",
},
})
  
export default QuotesList;