import { StyleSheet, View } from "react-native";
import React from "react";
import SignIn from "@/components/auth/SignIn";
import Header from "@/components/homePage/Header";


export default function Authentication() {
  return (
    <View style={styles.container}>
      <Header />
      <SignIn />
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});