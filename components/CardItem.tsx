import { SPRING_CONFIG } from "@/constants/constants";
import { BlurView } from "expo-blur";
import { BadgeDollarSign } from "lucide-react-native";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

type Props = {
  index: number;
  uri: string;
  bid: string;
  changeCards: () => void;
};

const CardItem = ({ index, uri, bid, changeCards }: Props) => {
  const transformX = useSharedValue(0);
  const transformY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const decayConfig = {
    rubberBandEffect: false,
    clamp: [-300, 300] as [number, number],
  };
  const resetFunction = () => {
    "worklet";
    opacity.value = withTiming(1, { duration: 500 });
    transformX.value = 0;
    transformY.value = 0;
    scheduleOnRN(changeCards);
  };
  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      transformX.value = e.translationX;
      transformY.value = e.translationY;
    })
    .onEnd(() => {
      const isLeftSwipe = transformX.value < -100;
      const isRightSwipe = transformX.value > 100;
      const isSwipeUp = transformY.value < -50;
      const isSwipeDown = transformY.value > 50;

      if (isLeftSwipe) {
        opacity.value = withSpring(0, SPRING_CONFIG);
        transformX.value = withDecay(
          {
            velocity: -1000,
            ...decayConfig,
          },
          resetFunction
        );
        if (isSwipeUp) {
          transformY.value = withDecay(
            {
              velocity: -500,
              ...decayConfig,
            },
            resetFunction
          );
        } else if (isSwipeDown) {
          transformY.value = withDecay(
            {
              velocity: 500,
              ...decayConfig,
            },
            resetFunction
          );
        }
      } else if (isRightSwipe) {
        opacity.value = withSpring(0, SPRING_CONFIG);

        transformX.value = withDecay(
          {
            velocity: 1000,
            ...decayConfig,
          },
          resetFunction
        );
        if (isSwipeUp) {
          transformY.value = withDecay(
            {
              velocity: -500,
              ...decayConfig,
            },
            resetFunction
          );
        } else if (isSwipeDown) {
          transformY.value = withDecay(
            {
              velocity: 500,
              ...decayConfig,
            },
            resetFunction
          );
        }
      } else {
        opacity.value = withSpring(1, SPRING_CONFIG);
        transformX.value = withSpring(0, SPRING_CONFIG);
        transformY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    rotation.value = withSpring(
      index === 0 ? 0 : index % 2 ? 10 : -10,
      SPRING_CONFIG
    );
    return {
      opacity: opacity.value,
      zIndex: -index,
      transform: [
        { translateX: transformX.value },
        { translateY: transformY.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.container,
          {
            // zIndex: -index,
            // transform: [
            //   { rotate: index === 0 ? "0deg" : index % 2 ? "10deg" : "-10deg" },
            // ],
            // transitionProperty: "transform, zIndex",
            // transitionDuration: "300ms",
            // transitionTimingFunction: "ease-in-out",
          },
          animatedStyle,
        ]}
      >
        <Image source={{ uri }} style={styles.image} />
        <BlurView style={styles.blurViewContainer} intensity={50}>
          <View style={styles.contentContainer}>
            <View style={styles.bidInfo}>
              <Text style={styles.bidText}>Highest bid</Text>
              <View style={styles.bidValueContainer}>
                <BadgeDollarSign color="gold" size={16} />
                <Text style={styles.bidValue}>{bid} </Text>
              </View>
            </View>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Place a Bid</Text>
            </Pressable>
          </View>
        </BlurView>
      </Animated.View>
    </GestureDetector>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 28,
    borderWidth: 12,
    borderColor: "white",
    backgroundColor: "white",
  },
  image: { width: "100%", height: "100%", borderRadius: 20 },
  blurViewContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    padding: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bidInfo: {
    justifyContent: "space-around",
    height: "100%",
  },
  bidText: {
    fontFamily: "Goldman-Regular",
    fontSize: 14,
    color: "white",
  },
  bidValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bidValue: {
    fontFamily: "Goldman-Bold",
    fontSize: 20,
    color: "white",
  },
  button: {
    backgroundColor: "black",
    padding: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Goldman-Bold",
    fontSize: 18,
  },
});
