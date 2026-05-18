import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Card, Pill, SectionHeader } from "@/components/ui";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function Profile() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { persona, points, premium, togglePremium, resetPersona, logout, trips, stamps } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 24 : insets.bottom + 84;

  const onReset = () => {
    if (Platform.OS === "web") {
      resetPersona();
      router.replace("/onboarding");
      return;
    }
    Alert.alert(
      "Rebuild your persona?",
      "We'll walk you through a few questions again to refine your travel style.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Rebuild",
          onPress: async () => {
            await resetPersona();
            router.replace("/onboarding");
          },
        },
      ],
    );
  };

  const onLogout = () => {
    if (Platform.OS === "web") {
      logout().then(() => router.replace("/"));
      return;
    }
    if (persona) {
      Alert.alert(
        "Log out?",
        "Your trips, stamps and points are saved locally. Logging out will clear all your data from this device.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Log out",
            style: "destructive",
            onPress: async () => {
              await logout();
              router.replace("/");
            },
          },
        ],
      );
    } else {
      Alert.alert(
        "Clear guest data?",
        "This will reset the app to its fresh state. You haven't built a persona yet, so nothing will be lost.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear & restart",
            style: "destructive",
            onPress: async () => {
              await logout();
              router.replace("/");
            },
          },
        ],
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad + 4, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        {/* Persona showcase */}
        {persona ? (
          <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
            <LinearGradient
              colors={[c.deepOcean, "#163A5F", c.skyBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 24, padding: 24 }}
            >
              <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5 }}>
                TRAVEL PERSONA
              </Text>
              <Text style={{ color: "#fff", fontSize: 28, fontFamily: "Inter_700Bold", marginTop: 8, letterSpacing: -0.6 }}>
                {persona.title}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 8, lineHeight: 21 }}>
                {persona.description}
              </Text>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                {persona.interests.map((t) => (
                  <View
                    key={t}
                    style={{
                      paddingHorizontal: 11,
                      paddingVertical: 5,
                      borderRadius: 999,
                      backgroundColor: "rgba(255,255,255,0.10)",
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_500Medium" }}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: "row", marginTop: 22, gap: 0 }}>
                <Pressable
                  onPress={() => router.push("/trips")}
                  style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.75 : 1 })}
                >
                  <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>TRIPS</Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Inter_700Bold", marginTop: 4 }}>{trips.length}</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/(tabs)/wallet")}
                  style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.75 : 1 })}
                >
                  <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>STAMPS</Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Inter_700Bold", marginTop: 4 }}>{stamps.length}</Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/gift")}
                  style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.75 : 1 })}
                >
                  <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>POINTS</Text>
                  <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Inter_700Bold", marginTop: 4 }}>{points.toLocaleString()}</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>
        ) : null}

        {/* Rewards */}
        <View style={{ paddingHorizontal: 20, marginBottom: persona ? 0 : 24 }}>
          <SectionHeader title="Rewards" subtitle="Earn on every booking · redeem on the next" />
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View>
                <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                  BALANCE
                </Text>
                <Text style={{ color: c.foreground, fontSize: 30, fontFamily: "Inter_700Bold", marginTop: 4, letterSpacing: -0.6 }}>
                  {points.toLocaleString()}
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                  Worth ${(points / 100).toFixed(0)} off your next trip
                </Text>
              </View>
              <Pill label="Tier · Explorer" tone="aqua" icon="award" />
            </View>
            <View style={{ flexDirection: "row", gap: 10, marginTop: 18 }}>
              <Button label="Redeem" icon="gift" variant="dark" onPress={() => router.push("/gift")} style={{ flex: 1 }} fullWidth />
              <Button label="Gift" icon="send" variant="secondary" onPress={() => router.push("/gift")} style={{ flex: 1 }} fullWidth />
            </View>
          </Card>
        </View>

        {/* 1% Club */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <SectionHeader title="The 1% Club" subtitle="Invite-only luxury tier" />
          <Card>
            <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}>
              <LinearGradient
                colors={["#FF6B6B", "#FF9466"]}
                style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}
              >
                <Feather name="star" size={22} color="#fff" />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_700Bold" }}>
                  Premium membership
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 4, lineHeight: 19 }}>
                  Concierge in your pocket, curated luxury trips, private events.
                </Text>
              </View>
              <Switch
                value={premium}
                onValueChange={togglePremium}
                trackColor={{ false: c.border, true: c.coral }}
                thumbColor="#fff"
              />
            </View>
            {!premium ? (
              <Pressable
                onPress={() => router.push("/premium")}
                style={({ pressed }) => ({ marginTop: 14, opacity: pressed ? 0.7 : 1 })}
              >
                <Text style={{ color: c.coral, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>
                  Learn more about The 1% Club →
                </Text>
              </Pressable>
            ) : null}
          </Card>
        </View>

        {/* Settings */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <SectionHeader title="Account" />
          <Card padded={false}>
            {persona ? (
              <Row icon="refresh-cw" label="Rebuild my persona" onPress={onReset} />
            ) : (
              <Row icon="user-plus" label="Build your persona" subtitle="Unlock personalised trips" onPress={() => router.push("/onboarding")} />
            )}
            <Row icon="bell" label="Trip alerts" subtitle="Flight changes, gate updates" onPress={() => router.push("/alerts")} />
            <Row icon="globe" label="Currency · USD" onPress={() => router.push("/currency")} />
            <Row icon="help-circle" label="Help & support" onPress={() => router.push("/help")} />
            <LogoutRow label={persona ? "Log out" : "Clear guest data"} onPress={onLogout} last />
          </Card>
        </View>

        {/* Guest nudge — sign up prompt */}
        {!persona ? (
          <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 4 }}>
            <Pressable
              onPress={() => router.push("/onboarding")}
              style={({ pressed }) => ({
                borderRadius: 20,
                overflow: "hidden",
                opacity: pressed ? 0.92 : 1,
                borderWidth: 1,
                borderColor: "rgba(63,169,245,0.2)",
              })}
            >
              <LinearGradient
                colors={["#EAF4FB", "#F5F0FF"]}
                style={{ padding: 20, flexDirection: "row", alignItems: "center", gap: 14 }}
              >
                <LinearGradient
                  colors={[c.deepOcean, c.skyBlue]}
                  style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}
                >
                  <Feather name="user-plus" size={20} color="#fff" />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.deepOcean, fontSize: 15, fontFamily: "Inter_700Bold", letterSpacing: -0.2 }}>
                    Save your progress
                  </Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2, lineHeight: 18 }}>
                    Build a persona to unlock personalised trips, community tips, and rewards that carry over between sessions.
                  </Text>
                </View>
                <Feather name="arrow-right" size={18} color={c.skyBlue} />
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function Row({
  icon,
  label,
  subtitle,
  onPress,
  last,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  subtitle?: string;
  onPress: () => void;
  last?: boolean;
}) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: c.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: c.muted, alignItems: "center", justifyContent: "center" }}>
        <Feather name={icon} size={16} color={c.foreground} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>{label}</Text>
        {subtitle ? (
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>{subtitle}</Text>
        ) : null}
      </View>
      <Feather name="chevron-right" size={18} color={c.mutedForeground} />
    </Pressable>
  );
}

function LogoutRow({ label, onPress, last }: { label: string; onPress: () => void; last?: boolean }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 18,
        paddingVertical: 16,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: c.border,
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: "#FFF0F0", alignItems: "center", justifyContent: "center" }}>
        <Feather name="log-out" size={16} color={c.coral} />
      </View>
      <Text style={{ flex: 1, color: c.coral, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>{label}</Text>
    </Pressable>
  );
}
