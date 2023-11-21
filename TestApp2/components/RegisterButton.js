import { StyleSheet, View, Pressable, Text, Image } from 'react-native';

export default function RegisterButton({ label, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#2aa4ea',
    fontSize: 20,
  },
});
