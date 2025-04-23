import React from "react";
import { StyleSheet, View } from "react-native";
import DrinkList from "../components/DrinkList";
import Header from "@/components/homePage/Header";

export default function WineSreen() {
    return (
        <View style={styles.container}>
            <Header />
            <DrinkList drinkType='wine' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
