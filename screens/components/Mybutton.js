import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#da2626',
    color: '#ffffff',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    height: 50,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: '#ffffff',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
  },
});
export default Mybutton;