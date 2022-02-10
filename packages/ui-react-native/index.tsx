import React from "react";
import { View, Text } from "react-native";

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <View>
      <Text style={{ fontSize: 30 }}>{children}</Text>
    </View>
  );
}
