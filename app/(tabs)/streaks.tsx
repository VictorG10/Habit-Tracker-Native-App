import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StreaksScreen = () => {
  return (
    <View style={styles.container}>
      <Text>StreaksScreen</Text>
    </View>
  );
};

export default StreaksScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
