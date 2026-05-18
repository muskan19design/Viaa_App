import React from "react";
import { Text, View } from "react-native";

import { useColors } from "@/hooks/useColors";

export function PassportStamp({
  city,
  country,
  date,
  color,
  rotation = -8,
}: {
  city: string;
  country: string;
  date: string;
  color: string;
  rotation?: number;
}) {
  const c = useColors();
  return (
    <View
      style={{
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 2.5,
        borderColor: color,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: `${rotation}deg` }],
        backgroundColor: c.card,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: 108,
          height: 108,
          borderRadius: 54,
          borderWidth: 1,
          borderColor: color,
          opacity: 0.5,
        }}
      />
      <Text
        style={{
          color,
          fontSize: 9,
          fontFamily: "Inter_600SemiBold",
          letterSpacing: 1.4,
          marginBottom: 2,
        }}
      >
        ENTRY · VOYAGE
      </Text>
      <Text
        style={{
          color,
          fontSize: 18,
          fontFamily: "Inter_700Bold",
          letterSpacing: -0.4,
          textTransform: "uppercase",
        }}
      >
        {city}
      </Text>
      <Text
        style={{
          color,
          fontSize: 9,
          fontFamily: "Inter_500Medium",
          letterSpacing: 1,
          textTransform: "uppercase",
          marginTop: 2,
          opacity: 0.85,
        }}
      >
        {country}
      </Text>
      <Text
        style={{
          color,
          fontSize: 9,
          fontFamily: "Inter_500Medium",
          letterSpacing: 1.2,
          marginTop: 4,
          opacity: 0.7,
        }}
      >
        {date.toUpperCase()}
      </Text>
    </View>
  );
}
