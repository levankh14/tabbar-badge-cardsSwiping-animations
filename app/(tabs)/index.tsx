import { StyleSheet, Text } from "react-native";

import { TEXT_COLOR } from "@/constants/constants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
});
