import { StyleSheet, View, Pressable, Text, Image, Switch } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function ChildToPickUpButton({ label, onPress}) {
  const [isPressed, press] = useState(0);
  const pressButton = () => press(!isPressed);
  return (
    <View style={styles.container}>
      <Pressable style={{flexDirection: 'row'}}onPress={pressButton} value={isPressed}>
        <Text style={{marginHorizontal: 20, fontSize: 20}}>{label}</Text>
        <Text value={isPressed} style={{color: isPressed ? '#000' : '#aaa', marginHorizontal: 20, fontSize: 20}}> ✓ </Text>
      </Pressable>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#000',
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: '#aaa',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    width: '60%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 20,
  },
});
