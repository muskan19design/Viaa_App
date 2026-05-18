import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const BENEFITS = [
  { icon: "headphones" as const, title: "24/7 concierge", detail: "A real person on chat, anywhere in the world" },
  { icon: "key" as const, title: "Curated luxury trips", detail: "Hand-built by editors, not algorithms" },
  { icon: "shield" as const, title: "Disruption recovery", detail: "Cancellations, missed connections — handled" },
  { icon: "users" as const, title: "Private events", detail: "Members-only dinners and openings worldwide" },
  { icon: "gift" as const, title: "Welcome amenity", detail: "Champagne and a personal note in every suite" },
];

export default function Premium() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { togglePremium } = useApp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onJoin = async () => {
    if (code.trim().length < 4) {
      setError("Enter the invite code from your referrer.");
      return;
    }
    setError("");
    await togglePremium();
    router.back();
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 24;

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0F1C" }}>
      <ScrollView contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad + 100 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 22, flexDirection: "row", justifyContent: "flex-end" }}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <Feather name="x" size={22} color="rgba(255,255,255,0.6)" />
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 22, marginTop: 24 }}>
          <LinearGradient
            colors={["#FF6B6B", "#FF9466"]}
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="star" size={28} color="#fff" />
          </LinearGradient>
          <Text style={{ color: "#fff", fontSize: 36, fontFamily: "Inter_700Bold", marginTop: 22, letterSpacing: -1 }}>
            The 1% Club
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, fontFamily: "Inter_400Regular", marginTop: 12, lineHeight: 22 }}>
            Invite-only. For travelers who'd rather have someone on the other end of a phone than another app to manage. We curate the trip. You just go.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 22, marginTop: 32, gap: 14 }}>
          {BENEFITS.map((b) => (
            <View
              key={b.title}
              style={{
                flexDirection: "row",
                gap: 14,
                padding: 16,
                borderRadius: 18,
                backgroundColor: "rgba(255,255,255,0.04)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,107,107,0.15)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name={b.icon} size={18} color="#FF6B6B" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#fff", fontSize: 15, fontFamily: "Inter_600SemiBold" }}>{b.title}</Text>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 3, lineHeight: 19 }}>{b.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ paddingHorizontal: 22, marginTop: 30 }}>
          <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
            INVITE CODE
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: error ? "#FF6B6B" : "rgba(255,255,255,0.1)",
              paddingHorizontal: 16,
              paddingVertical: 14,
              marginTop: 10,
              gap: 10,
            }}
          >
            <Feather name="key" size={16} color="rgba(255,255,255,0.5)" />
            <TextInput
              value={code}
              onChangeText={(t) => { setCode(t); setError(""); }}
              placeholder="Enter invite code"
              placeholderTextColor="rgba(255,255,255,0.35)"
              autoCapitalize="characters"
              style={{ flex: 1, color: "#fff", fontSize: 15, fontFamily: "Inter_500Medium", padding: 0, letterSpacing: 1 }}
            />
          </View>
          {error ? (
            <Text style={{ color: "#FF6B6B", fontSize: 12, fontFamily: "Inter_500Medium", marginTop: 6 }}>{error}</Text>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 22,
          paddingTop: 14,
          paddingBottom: bottomPad + 12,
          backgroundColor: "rgba(10,15,28,0.94)",
          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.06)",
        }}
      >
        <Button label="Join the 1% Club" icon="arrow-right" variant="coral" onPress={onJoin} fullWidth size="lg" />
      </View>
    </View>
  );
}
