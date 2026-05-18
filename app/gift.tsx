import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
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

import { Button, Card, Pill, SectionHeader } from "@/components/ui";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const PRESETS = [500, 1000, 2500, 5000];

export default function Gift() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { points, giftPoints } = useApp();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(1000);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSend = async () => {
    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }
    if (amount > points) {
      setError("Not enough points.");
      return;
    }
    setError("");
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const ok = await giftPoints(email, amount);
    if (ok) setDone(true);
  };

  const bottomPad = Platform.OS === "web" ? 34 + 90 : insets.bottom + 100;

  if (done) {
    return (
      <View style={{ flex: 1, backgroundColor: c.background, padding: 24, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            backgroundColor: "#FFE9E9",
            borderWidth: 2,
            borderColor: "#FF6B6B",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 22,
          }}
        >
          <Feather name="gift" size={38} color="#FF6B6B" />
        </View>
        <Text style={{ color: c.foreground, fontSize: 26, fontFamily: "Inter_700Bold", letterSpacing: -0.5, textAlign: "center" }}>
          Gift sent
        </Text>
        <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 10, textAlign: "center", lineHeight: 21, maxWidth: 320 }}>
          {amount.toLocaleString()} points are on their way to {email}. They'll get an email with how to redeem.
        </Text>
        <View style={{ marginTop: 32, alignSelf: "stretch" }}>
          <Button label="Done" onPress={() => router.back()} fullWidth size="lg" />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
        <Card>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                YOUR BALANCE
              </Text>
              <Text style={{ color: c.foreground, fontSize: 28, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                {points.toLocaleString()}
              </Text>
            </View>
            <Pill label={`Worth $${(points / 100).toFixed(0)}`} tone="aqua" icon="award" />
          </View>
        </Card>

        <View style={{ marginTop: 22 }}>
          <SectionHeader title="Recipient" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: c.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: c.border,
              paddingHorizontal: 14,
              paddingVertical: 14,
              gap: 10,
            }}
          >
            <Feather name="mail" size={18} color={c.skyBlue} />
            <TextInput
              value={email}
              onChangeText={(t) => { setEmail(t); setError(""); }}
              placeholder="friend@example.com"
              placeholderTextColor={c.mutedForeground}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{ flex: 1, color: c.foreground, fontSize: 14, fontFamily: "Inter_500Medium", padding: 0 }}
            />
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <SectionHeader title="Amount" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {PRESETS.map((p) => {
              const active = p === amount;
              return (
                <Pressable
                  key={p}
                  onPress={() => setAmount(p)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minWidth: "45%",
                    paddingVertical: 16,
                    borderRadius: 16,
                    backgroundColor: active ? c.deepOcean : c.card,
                    borderWidth: 1,
                    borderColor: active ? c.deepOcean : c.border,
                    alignItems: "center",
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text style={{ color: active ? "#fff" : c.foreground, fontSize: 18, fontFamily: "Inter_700Bold" }}>
                    {p.toLocaleString()}
                  </Text>
                  <Text style={{ color: active ? "rgba(255,255,255,0.6)" : c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium", marginTop: 2 }}>
                    ${(p / 100).toFixed(0)} value
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 22 }}>
          <SectionHeader title="Add a note" />
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="A line they'll read before they redeem..."
            placeholderTextColor={c.mutedForeground}
            multiline
            style={{
              backgroundColor: c.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: c.border,
              padding: 14,
              minHeight: 100,
              color: c.foreground,
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              textAlignVertical: "top",
            }}
          />
        </View>

        {error ? (
          <Text style={{ color: c.coral, fontSize: 13, fontFamily: "Inter_500Medium", marginTop: 12 }}>{error}</Text>
        ) : null}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: c.background,
          borderTopWidth: 1,
          borderTopColor: c.border,
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: Platform.OS === "web" ? 34 : insets.bottom + 12,
        }}
      >
        <Button label={`Send ${amount.toLocaleString()} points`} icon="send" variant="coral" onPress={onSend} fullWidth size="lg" />
      </View>
    </View>
  );
}
