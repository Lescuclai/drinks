import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/homePage/Header";
import { ThemedText } from "@/components/ThemedText";


export default function HomeSreen() {


  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
