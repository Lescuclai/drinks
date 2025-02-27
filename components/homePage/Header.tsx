import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import wood from "../../assets/images/wood.jpg";
import hop from "../../assets/images/hop.jpg";
import { useNavigationState } from "@react-navigation/native";

export default function Header() {
  const index = useNavigationState((state) => state.index);
  const routeName = useNavigationState((state) => state.routeNames[index]);
  const [headerContent, setHeaderContent] = useState({ backgroundImage: wood, title: 'What Drinks Next' })


  useEffect(() => {
    setHeaderContent(() => {
      if (routeName === 'index') {
        return { backgroundImage: wood, title: 'What Drinks Next' }
      } else if (routeName === 'beer') {
        return { backgroundImage: hop, title: 'Beers' }
      } else if (routeName === 'explore') {
        return { backgroundImage: hop, title: 'What Drinks Next' }
      } else {
        return { backgroundImage: wood, title: '' }
      }
    });
  }, [index, routeName]);
  return (
    <View style={{ position: "relative", zIndex: 99 }}>
      <ImageBackground source={headerContent.backgroundImage} style={styles.titleBackgroud}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{headerContent.title}</Text>
        </View>
      </ImageBackground>
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
