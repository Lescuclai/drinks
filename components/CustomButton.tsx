import { View } from "react-native";
import { Button } from "react-native-paper";

import { GestureResponderEvent } from "react-native";

interface CustomButtonProps {
  onPressFunc: (event: GestureResponderEvent) => void;
  title: string;
  mode: "text" | "outlined" | "contained";
  disabled?: boolean;
}

function CustomButton({ onPressFunc, title, mode, disabled }: CustomButtonProps) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
      }}>
      <Button mode={mode} onPress={onPressFunc} disabled={disabled}>
        {title}
      </Button>
    </View>
  );
}

export default CustomButton;
