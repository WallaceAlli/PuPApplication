import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import ChildToPickUpButton from './ChildToPickUpButton';
import { useState } from 'react';


export default function ChildButtonRenderer({ numChildren, names }) {
  var buttons = [];
  const [test, setTest] = useState(0);
  for (var i = 0;  i < numChildren; i++)
  {
    buttons.push(
      <ChildToPickUpButton label={names[i]} ></ChildToPickUpButton>
    )
  }
  return (
    <View style={{flex: 1, justifyContent: 'space-evenly', flexDirection: 'column'}}>
    {buttons}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderColor: '#000',
    borderRadius: 15,
    borderWidth: 3,
    backgroundColor: '#aaa',
    flexDirection: 'row',
  },
  button: {
    borderRadius: 10,
    
    width: '100%',
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
