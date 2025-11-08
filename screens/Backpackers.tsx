import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Backpackers: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Screen Backpackers</Text>
    </View>
  );
};

export default Backpackers;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
