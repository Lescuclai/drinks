import React, { useEffect, useState, Suspense } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import wood from "../../assets/images/wood.jpg";
import hop from "../../assets/images/hop.jpg";
import grape from "../../assets/images/wine_grape.png";
import foam from "../../assets/images/foam.jpg";


import { useNavigationState } from "@react-navigation/native";
import { ThemedText } from "../ThemedText";

export default function Header() {
  const index: number = useNavigationState((state: any) => {
    return state.index
  });

  const routeName = useNavigationState(
    (state: any) => {
      return state.routes[index].name;
    }
  ) as 'index' | 'beer' | 'authentication' | 'wine';
  const [headerContent, setHeaderContent] = useState({ backgroundImage: wood, title: 'What Drinks Next' });

  interface IheaderOptions { backgroundImage: any, title: string }

  const headerOptions: { [key: string]: IheaderOptions } = {
    'index': { backgroundImage: wood, title: 'What Drinks Next' },
    'beer': { backgroundImage: hop, title: 'Brières' },
    'wine': { backgroundImage: grape, title: 'Vins' },
    'authentication': { backgroundImage: foam, title: 'Qui suis-je ?' },
    '+not-found': { backgroundImage: wood, title: 'Mauvais chemin' }
  };

  useEffect(() => {
    setHeaderContent(headerOptions[routeName] || headerOptions['+not-found']);
  }, [index, routeName]);

  return (
    <View style={{ position: "relative", zIndex: 99 }}>
      <Suspense fallback={<ThemedText>loading...</ThemedText>}>
        <ImageBackground source={headerContent.backgroundImage} style={styles.titleBackgroud}>
          <View style={styles.container}>
            <Text style={styles.titleText}>{headerContent.title}</Text>
          </View>
        </ImageBackground>
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  titleBackgroud: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});