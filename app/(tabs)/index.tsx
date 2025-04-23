import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/homePage/Header";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ThemedText } from "@/components/ThemedText";
import Tiles from "@/components/Tiles";

type RootStackParamList = {
  beer: string;
  wine: string;
};

export default function HomeSreen() {
  const globalNavigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePress = (param: "beer" | "wine") => {
    globalNavigation.navigate(param, '');
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.explainationsContainer}>
        <ThemedText style={styles.subTitle} >
          Tu aimes l'eau les fruits et les céréales, tu es au bon endroit !
        </ThemedText>
        <ThemedText style={styles.paragraph}>
          Le principe est simple, tu ne veux plus oublier le nom de cette super
          bouteille partagée en amoureux, ou la bonne brune de ta dernière soirée
          entre pots, ou encore, ne plus t'infliger "cette boisson" qui était
          sensé être un grand cru... Et bien c'est ici que tu pourras noter toutes
          tes découvertes.
        </ThemedText>
      </View>
      <View style={styles.tilesContainer}>
        <Tiles handlePress={() => handlePress('wine')} type="wine" />
        <Tiles handlePress={() => handlePress('beer')} type="beer" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  explainationsContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    marginHorizontal: 70,
    textAlign: "center",
    color: "#542201",
    fontWeight: "bold",
    justifyContent: "center",
    paddingBottom: 25,
  },
  paragraph: {
    color: "#2e1200",
    textAlign: "justify",
    marginHorizontal: 22,
  },
  tilesContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});


