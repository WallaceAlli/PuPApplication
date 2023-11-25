import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function CreateQRCode({info}) {
    return (
      <QRCode
        value={info}
      />
    );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 75,
    height: 75,
    marginHorizontal: 20,
    backgroundColor: '#1E31DA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderColor: '#000',
    borderRadius: 100,
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
