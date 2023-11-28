import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable, Text, Image, Switch, FlatList, Box } from 'react-native';

export default function FetchGuardianFirstName() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const resp = await fetch('http:10.161.133.84:3000/guardians');
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    return (
      <Box>
        {item.guardianFirstName}
      </Box>
    );
  };
  return (
    <View style={{flex: 1, padding: 24}}>
        <Box> Fetch API</Box>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item)=>item.guardianFirstName.ToString()}
        />
    </View>
  );
}