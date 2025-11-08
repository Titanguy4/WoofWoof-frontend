import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Saved: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Screen saved</Text>
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
