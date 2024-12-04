import React from 'react';
import { Text, View } from 'react-native';

const Notification = ({ message }) => {
    if (!message) {
      return null;
    }
  
    return (
      <View>
        <Text style={{ color: 'red' }}>{message}</Text>
      </View>
    );
  };
  
  export default Notification;