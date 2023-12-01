import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

const BinaryToImage = ({ bufferData }) => {
  const [imageUri, setImageUri] = useState(null);
    
  useEffect(() => {
    console.log(bufferData.data)
    const convertBufferToImage = async () => {
      try {
        // Get Base64 data from the bufferData
        const base64Data = bufferData.data.join('');

        // Create a temporary file path
        const tempFilePath = `${FileSystem.cacheDirectory}tempImage.jpg`;

        // Write the Base64 data to a temporary file
        await FileSystem.writeAsStringAsync(tempFilePath, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Set the Image URI
        setImageUri(tempFilePath);
      } catch (error) {
        console.error('Error converting buffer to image:', error);
      }
    };

    convertBufferToImage();
  }, [bufferData]);

  if (!imageUri) {
    return null;
  }

  return (
    <View>
      <Image style={{ width: 200, height: 200 }} source={{ uri: imageUri }} />
    </View>
  );
};

export default BinaryToImage;
