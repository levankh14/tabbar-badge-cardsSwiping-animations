import { StyleSheet, Text, View } from "react-native";

import { TEXT_COLOR } from "@/constants/constants";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
});
