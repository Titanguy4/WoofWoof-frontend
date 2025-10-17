import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Missions: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Explore (Home)</Text>
    </View>
  );
};

export default Missions;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
