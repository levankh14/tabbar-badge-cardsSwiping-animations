import { Pressable, StyleSheet } from "react-native";

import BadgeItem from "@/components/BadgeItem";
import {
  BACKGROUND_TRANSLATE_Y,
  BADGE_HEIGHT,
  BADGE_WIDTH,
  GREEN,
  INACTIVE_ROTATION,
  TEXT_COLOR,
} from "@/constants/constants";
import { Currency } from "@/types/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Bell, CirclePoundSterling } from "lucide-react-native";
import { useState } from "react";
import Animated, {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
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
    color: GREEN,
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
  const [activeCurrencyIndex, setActiveCurrencyIndex] = useState(0);

  const isFocused = useIsFocused();

  const handleCurrencyPress = () => {
    setActiveCurrencyIndex((prev) => (prev + 1) % currencies.length);
  };

  const stylesReanimated = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        currencies[activeCurrencyIndex === 2 ? 0 : activeCurrencyIndex + 1]
          .color,
        {
          duration: 200,
        }
      ),
    };
  });
  if (!isFocused) return null;
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Animated.View
        entering={FadeInRight.springify()}
        exiting={FadeInLeft.springify()}
        style={styles.header}
      >
        <Pressable
          style={styles.currencyContainer}
          onPress={handleCurrencyPress}
        >
          <Animated.View style={[styles.placeHolderBg, stylesReanimated]} />
          {currencies.map((item, index) => (
            <BadgeItem
              key={item.currency}
              item={item}
              activeCurrencyIndex={activeCurrencyIndex}
              index={index}
            />
          ))}
        </Pressable>

        <Bell color={"gray"} />
      </Animated.View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  currencyContainer: {
    width: BADGE_WIDTH,
    height: BADGE_HEIGHT,
    position: "relative",
  },
  placeHolderBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: GREEN,
    borderRadius: 100,
    transformOrigin: "left",
    transform: [
      {
        rotateZ: INACTIVE_ROTATION,
      },
      { translateY: BACKGROUND_TRANSLATE_Y },
    ],
  },
});
