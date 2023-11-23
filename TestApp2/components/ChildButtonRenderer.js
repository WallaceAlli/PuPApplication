import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import ChildToPickUpButton from './ChildToPickUpButton';

export default function ChildButtonRenderer({ numChildren, onPress, names }) {
  var buttons = [];
  for (var i = 0;  i < numChildren; i++)
  {
    buttons.push(
      <ChildToPickUpButton label={names[i]}></ChildToPickUpButton>
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
    width: 250,
    height: 75,
    marginHorizontal: 20,
    backgroundColor: '#1E31DA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#000',
    borderRadius: 15,
    borderWidth: 3,
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
