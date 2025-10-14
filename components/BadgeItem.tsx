import { INACTIVE_ROTATION } from "@/constants/constants";
import { Currency } from "@/types/types";

import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

type Props = { item: Currency; activeCurrencyIndex: number; index: number };
const ICON_SIZE = 28;

const SPRING_CONFIG: WithSpringConfig = {
  damping: 20,
  stiffness: 900,
  mass: 0.9,
};

const BadgeItem = ({ item, activeCurrencyIndex, index }: Props) => {
  const active = activeCurrencyIndex === index;
  const progressValue = useSharedValue(0);
  useEffect(() => {
    progressValue.value = active ? 1 : 0;
  }, [active]);
  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(progressValue.value),
      zIndex: progressValue.value,
      backgroundColor: active ? item.color : "transparent",
      transform: [
        {
          rotateZ: withSpring(
            progressValue.value === 0 ? INACTIVE_ROTATION : "0deg",
            SPRING_CONFIG
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedBadgeStyle]}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={[styles.text, { color: item.textColor }]}>{item.value}</Text>
    </Animated.View>
  );
};

export default BadgeItem;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 100,
    transformOrigin: "left",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "Goldman-Bold",
    fontSize: 18,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
});
