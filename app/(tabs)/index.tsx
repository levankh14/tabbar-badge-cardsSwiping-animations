import { Pressable, StyleSheet, View } from "react-native";

import BadgeItem from "@/components/BadgeItem";
import Footer from "@/components/Footer";
import {
  BACKGROUND_TRANSLATE_Y,
  BADGE_HEIGHT,
  BADGE_WIDTH,
  INACTIVE_ROTATION,
  TEXT_COLOR,
} from "@/constants/constants";
import { Currency } from "@/types/types";
import { FontAwesome5 } from "@expo/vector-icons";
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePress = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % currencies.length);
  };

  const stylesReanimated = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        currencies[activeIndex === 2 ? 0 : activeIndex + 1].color,
        { duration: 250 }
      ),
    };
  });

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <Animated.View
        entering={FadeInRight.springify()}
        exiting={FadeInLeft.springify()}
        style={styles.header}
      >
        <Pressable onPress={handlePress} style={styles.badgeContainer}>
          <Animated.View style={[styles.placeholderBg, stylesReanimated]} />
          {currencies.map((currency, index) => (
            <BadgeItem
              index={index}
              value={currency.value}
              activeIndex={activeIndex}
              key={currency.currency}
              icon={currency.icon}
              color={currency.color}
            />
          ))}
        </Pressable>
        <Bell color={"gray"} />
      </Animated.View>
      <View style={styles.cardsContainer}></View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: TEXT_COLOR,
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  badgeContainer: {
    height: BADGE_HEIGHT,
    width: BADGE_WIDTH,
    position: "relative",
  },
  placeholderBg: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    borderRadius: BADGE_HEIGHT / 2,
    position: "absolute",
    transformOrigin: "left",
    transform: [
      { rotateZ: INACTIVE_ROTATION },
      { translateY: BACKGROUND_TRANSLATE_Y },
    ],
  },
  cardsContainer: {
    width: "100%",
    aspectRatio: 1 / 1.2,
  },
});
