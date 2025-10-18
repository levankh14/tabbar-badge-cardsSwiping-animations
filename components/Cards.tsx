import cardImages, {
  CARD_HEIGHT,
  CARD_WIDTH,
  SPACING,
} from "@/constants/constants";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CardItem from "./CardItem";

type Props = {};

const Cards = (props: Props) => {
  const [cards, setCards] = useState(cardImages);
  const changeCards = () => {
    const updatedCards = [...cards];
    const firstCard = updatedCards.shift();
    if (firstCard) {
      updatedCards.push(firstCard);
      setCards(updatedCards);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Bid 🔥</Text>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingHorizontal: SPACING,
        }}
      >
        <View
          style={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            position: "relative",
          }}
        >
          {cards.map((image, index) => {
            return (
              <CardItem
                key={image.uri}
                index={index}
                bid={image.bid}
                uri={image.uri}
                changeCards={changeCards}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    paddingHorizontal: SPACING,
  },
  title: {
    fontFamily: "Goldman-Bold",
    fontSize: 24,
    color: "#464343ff",
    alignSelf: "flex-start",
  },
});
