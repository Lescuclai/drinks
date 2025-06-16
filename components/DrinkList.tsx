import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { StyleSheet, View } from "react-native";

interface DrinkListProps {
    drinkType: string;
}

export default function DrinkList(props: DrinkListProps) {
    const { drinkType } = props;
    return (
        <View style={styles.container}>
            <ThemedText>{drinkType} </ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
