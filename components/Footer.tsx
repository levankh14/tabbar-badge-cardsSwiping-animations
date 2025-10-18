import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {};

const Footer = (props: Props) => {
  return (
    <View style={{ width: "100%", paddingHorizontal: 24, gap: 12 }}>
      <View style={{ width: "100%" }}>
        <Text style={styles.mainTitle}>Featured Creator</Text>
      </View>
      <View style={styles.userRow}>
        <View style={styles.leftSide}>
          <Image
            source={{
              uri: "https://plus.unsplash.com/premium_vector-1753138845333-1fa4c49911af?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.avatar}
          />
          <View style={{ height: "100%", gap: 4 }}>
            <Text style={[styles.mainTitle, { fontSize: 14 }]}>Levani K.</Text>
            <Text style={[styles.mainTitle, { fontSize: 15, color: "gray" }]}>
              UI/UX Designer
            </Text>
          </View>
        </View>

        <Pressable style={styles.pressable}>
          <Text style={[styles.mainTitle, { color: "darkGray" }]}>Follow</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: "Goldman-Bold",
    color: "black",
    fontSize: 20,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  leftSide: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 50, height: 50, borderRadius: 30 },
  pressable: {
    backgroundColor: "#bdf14d",
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
});
