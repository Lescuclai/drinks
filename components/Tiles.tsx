import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import bierre from "@/assets/images/bierre.jpg";
import vin from "@/assets/images/wine_grape.png";



interface TilesProps {
    handlePress: () => void;
    type: "wine" | "beer";
}

export default function Tiles({ handlePress, type }: TilesProps) {
    const boisson: Record<string, { source: any; title: string; style: any }> = {
        "wine": { source: vin, title: 'Vin', style: styles.rightImage },
        "beer": { source: bierre, title: 'Bière', style: null }
    }
    return (
        <ImageBackground source={boisson[type].source} style={[styles.images, boisson[type].style]}>
            <Text
                style={styles.text}
                onPress={handlePress}
            >
                {boisson[type].title}
            </Text>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    images: {
        width: 140,
        height: 140,
        justifyContent: "center",
    },
    rightImage: {
        alignItems: "flex-end",
    },
    text: {
        width: 100,
        height: 50,
        paddingTop: 8,
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0",
    },
});
