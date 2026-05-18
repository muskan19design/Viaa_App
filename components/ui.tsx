import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import { useColors } from "@/hooks/useColors";

export function Card({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}) {
  const c = useColors();
  return (
    <View
      style={[
        {
          backgroundColor: c.card,
          borderRadius: c.radius,
          borderWidth: 1,
          borderColor: c.border,
          padding: padded ? 18 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "coral" | "dark";
  size?: "md" | "lg" | "sm";
  icon?: keyof typeof Feather.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  loading,
  disabled,
  style,
  fullWidth,
}: ButtonProps) {
  const c = useColors();

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPress?.();
  };

  const padV = size === "lg" ? 18 : size === "sm" ? 10 : 14;
  const padH = size === "lg" ? 24 : size === "sm" ? 14 : 20;
  const fontSize = size === "lg" ? 16 : size === "sm" ? 13 : 15;

  if (variant === "primary") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          {
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            borderRadius: 999,
            overflow: "hidden",
            alignSelf: fullWidth ? "stretch" : "flex-start",
          },
          style,
        ]}
      >
        <LinearGradient
          colors={[c.deepOcean, c.skyBlue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: padV,
            paddingHorizontal: padH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              {icon ? <Feather name={icon} size={fontSize + 2} color="#fff" /> : null}
              <Text style={{ color: "#fff", fontSize, fontFamily: "Inter_600SemiBold", letterSpacing: 0.2 }}>
                {label}
              </Text>
            </>
          )}
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === "coral") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          {
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            borderRadius: 999,
            overflow: "hidden",
            alignSelf: fullWidth ? "stretch" : "flex-start",
          },
          style,
        ]}
      >
        <LinearGradient
          colors={["#FF6B6B", "#FF9466"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingVertical: padV,
            paddingHorizontal: padH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {icon ? <Feather name={icon} size={fontSize + 2} color="#fff" /> : null}
          <Text style={{ color: "#fff", fontSize, fontFamily: "Inter_600SemiBold" }}>{label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  if (variant === "dark") {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          {
            opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
            backgroundColor: c.deepOcean,
            borderRadius: 999,
            paddingVertical: padV,
            paddingHorizontal: padH,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            alignSelf: fullWidth ? "stretch" : "flex-start",
          },
          style,
        ]}
      >
        {icon ? <Feather name={icon} size={fontSize + 2} color="#fff" /> : null}
        <Text style={{ color: "#fff", fontSize, fontFamily: "Inter_600SemiBold" }}>{label}</Text>
      </Pressable>
    );
  }

  const isGhost = variant === "ghost";
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          backgroundColor: isGhost ? "transparent" : c.secondary,
          borderRadius: 999,
          borderWidth: isGhost ? 1 : 0,
          borderColor: c.border,
          paddingVertical: padV,
          paddingHorizontal: padH,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          alignSelf: fullWidth ? "stretch" : "flex-start",
        },
        style,
      ]}
    >
      {icon ? <Feather name={icon} size={fontSize + 2} color={c.foreground} /> : null}
      <Text style={{ color: c.foreground, fontSize, fontFamily: "Inter_600SemiBold" }}>{label}</Text>
    </Pressable>
  );
}

export function Pill({
  label,
  tone = "neutral",
  icon,
}: {
  label: string;
  tone?: "neutral" | "primary" | "coral" | "aqua" | "dark";
  icon?: keyof typeof Feather.glyphMap;
}) {
  const c = useColors();
  const palette = {
    neutral: { bg: c.muted, fg: c.mutedForeground },
    primary: { bg: "#EAF4FB", fg: c.skyBlue },
    coral: { bg: "#FFE9E9", fg: c.coral },
    aqua: { bg: "#E5F5EE", fg: "#3F9E80" },
    dark: { bg: c.deepOcean, fg: "#fff" },
  }[tone];
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: palette.bg,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        alignSelf: "flex-start",
      }}
    >
      {icon ? <Feather name={icon} size={11} color={palette.fg} /> : null}
      <Text style={{ color: palette.fg, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 0.3 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

export function SectionHeader({
  title,
  action,
  onAction,
  subtitle,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}) {
  const c = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 14,
        paddingHorizontal: 4,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: c.foreground, fontSize: 19, fontFamily: "Inter_700Bold", letterSpacing: -0.3 }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={{ color: c.skyBlue, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Stat({
  label,
  value,
  hint,
  style,
  valueStyle,
}: {
  label: string;
  value: string;
  hint?: string;
  style?: StyleProp<ViewStyle>;
  valueStyle?: StyleProp<TextStyle>;
}) {
  const c = useColors();
  return (
    <View style={style}>
      <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium", letterSpacing: 0.5, textTransform: "uppercase" }}>
        {label}
      </Text>
      <Text style={[{ color: c.foreground, fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 4, letterSpacing: -0.5 }, valueStyle]}>
        {value}
      </Text>
      {hint ? (
        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}

export function Divider() {
  const c = useColors();
  return <View style={{ height: 1, backgroundColor: c.border, marginVertical: 16 }} />;
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  const c = useColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 18,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: c.foreground, fontSize: 30, fontFamily: "Inter_700Bold", letterSpacing: -0.8 }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 4 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  );
}

export const styles = StyleSheet.create({});
