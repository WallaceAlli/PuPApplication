import { StyleSheet, View, Pressable, Text, Image } from 'react-native';

export default function LoginHereButton({ label, onPress }) {
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
    width: 300,
    height: 50,
    marginHorizontal: 20,
    backgroundColor: '#1E31DA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#000',
    borderRadius: 15,
    borderWidth: 3
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
