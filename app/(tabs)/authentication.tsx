import { StyleSheet, View } from "react-native";
import React from "react";
import Header from "@/components/homePage/Header";
import Auth from "@/components/Auth";

export default function Authentication() {
  return (
    <View style={styles.container}>
      <Header />
      <Auth />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});