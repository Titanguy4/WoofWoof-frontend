import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WoofShare: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Screen Woofshare</Text>
    </View>
  );
};

export default WoofShare;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
