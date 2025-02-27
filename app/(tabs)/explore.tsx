import Header from "../../components/homePage/Header";
import { StyleSheet, View } from "react-native";


export default function TabTwoScreen() {
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
