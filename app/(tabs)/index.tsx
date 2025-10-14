import { StyleSheet, Text } from "react-native";

import { TEXT_COLOR } from "@/constants/constants";
import { Currency } from "@/types/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { CirclePoundSterling } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ICON_SIZE = {
  bitcoin: 20,
  ethereum: 18,
  solana: 20,
};

export const currencies: Currency[] = [
  {
    currency: "bitcoin",
    value: "28.02",
    icon: (
      <FontAwesome5 name="bitcoin" size={ICON_SIZE.bitcoin} color="#000000" />
    ),
    color: "#bdf14d",
    textColor: "black",
  },
  {
    currency: "ethereum",
    value: "38.42",
    icon: (
      <FontAwesome5 name="ethereum" size={ICON_SIZE.ethereum} color="#000000" />
    ),
    color: "black",
    textColor: "white",
  },
  {
    currency: "solana",
    value: "10.88",
    icon: <CirclePoundSterling color="black" size={ICON_SIZE.solana} />,
    color: "#f14de1ff",
    textColor: "white",
  },
];

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
