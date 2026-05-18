import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { PassportStamp } from "@/components/PassportStamp";
import { Card, Pill, SectionHeader } from "@/components/ui";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const VISA_CHECKLIST = [
  { id: "v1", label: "Passport valid 6+ months", done: true },
  { id: "v2", label: "Travel insurance proof", done: true },
  { id: "v3", label: "Return ticket on file", done: true },
  { id: "v4", label: "Hotel confirmation", done: false },
  { id: "v5", label: "Schengen entry stamp ready", done: false },
];

export default function Wallet() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { wallet, stamps, points } = useApp();
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [checklist, setChecklist] = React.useState(VISA_CHECKLIST.map((v) => ({ ...v })));

  const toggleCheck = (id: string) => {
    setChecklist((prev) => prev.map((v) => v.id === id ? { ...v, done: !v.done } : v));
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 24 : insets.bottom + 84;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        {/* Passport-style header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <LinearGradient
            colors={[c.deepOcean, "#0E2C4F"]}
            style={{
              borderRadius: 22,
              padding: 22,
              overflow: "hidden",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View>
                <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.6 }}>
                  TRAVEL WALLET
                </Text>
                <Text style={{ color: "#fff", fontSize: 28, fontFamily: "Inter_700Bold", marginTop: 6, letterSpacing: -0.6 }}>
                  Passport mode
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 6 }}>
                  Boarding passes, stays, visas — all in one place
                </Text>
              </View>
              <View
                style={{
                  width: 44,
                  height: 60,
                  borderRadius: 6,
                  borderWidth: 1.5,
                  borderColor: "#FF6B6B",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="globe" size={20} color="#FF6B6B" />
                <Text style={{ color: "#FF6B6B", fontSize: 7, fontFamily: "Inter_700Bold", marginTop: 2, letterSpacing: 0.5 }}>
                  VOYAGE
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 24,
                paddingTop: 18,
                borderTopWidth: 1,
                borderTopColor: "rgba(255,255,255,0.1)",
                gap: 24,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>
                  STAMPS
                </Text>
                <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                  {stamps.length}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>
                  DOCUMENTS
                </Text>
                <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                  {wallet.length}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>
                  POINTS
                </Text>
                <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                  {points.toLocaleString()}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Boarding passes & docs */}
        <View style={{ paddingHorizontal: 20 }}>
          <SectionHeader title="On this trip" subtitle="Tap to view full document" />
          <View style={{ gap: 12 }}>
            {wallet.map((w) => {
              const isOpen = expanded === w.id;
              return (
                <Pressable
                  key={w.id}
                  onPress={() => setExpanded(isOpen ? null : w.id)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
                >
                  <Card padded={false}>
                    <View style={{ padding: 18 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            backgroundColor: w.type === "boarding" ? "#EAF4FB" : w.type === "hotel" ? "#FFE9E9" : "#E5F5EE",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Feather
                            name={w.type === "boarding" ? "send" : w.type === "hotel" ? "home" : "shield"}
                            size={18}
                            color={w.type === "boarding" ? c.skyBlue : w.type === "hotel" ? c.coral : "#3F9E80"}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>
                            {w.title}
                          </Text>
                          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                            {w.subtitle}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                          <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>
                            {w.meta}
                          </Text>
                          <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={c.mutedForeground} />
                        </View>
                      </View>

                      {isOpen && w.type === "boarding" ? (
                        <View
                          style={{
                            marginTop: 16,
                            paddingTop: 16,
                            borderTopWidth: 1,
                            borderTopColor: c.border,
                            borderStyle: "dashed",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>GATE</Text>
                            <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>B14</Text>
                          </View>
                          <View>
                            <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>SEAT</Text>
                            <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>4A</Text>
                          </View>
                          <View>
                            <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>GROUP</Text>
                            <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>1</Text>
                          </View>
                          <View>
                            <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>TERMINAL</Text>
                            <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>1</Text>
                          </View>
                        </View>
                      ) : null}

                      {isOpen && w.type === "hotel" ? (
                        <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: c.border, gap: 8 }}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>Check-in</Text>
                            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>15:00</Text>
                          </View>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>Check-out</Text>
                            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>11:00</Text>
                          </View>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>Confirmation #</Text>
                            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>VIA-2604-GR</Text>
                          </View>
                        </View>
                      ) : null}

                      {isOpen && w.type === "visa" ? (
                        <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: c.border, gap: 8 }}>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>Coverage</Text>
                            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>Medical + Trip</Text>
                          </View>
                          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>Policy #</Text>
                            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>INS-0847-VIA</Text>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Visa checklist */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <SectionHeader title="Visa & entry checklist" subtitle="Greece · Schengen area" />
          <Card>
            {checklist.map((v, i) => (
              <Pressable
                key={v.id}
                onPress={() => toggleCheck(v.id)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth: i === checklist.length - 1 ? 0 : 1,
                  borderBottomColor: c.border,
                  gap: 12,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 1.5,
                    borderColor: v.done ? "#7FD1B9" : c.border,
                    backgroundColor: v.done ? "#7FD1B9" : "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {v.done ? <Feather name="check" size={12} color="#fff" /> : null}
                </View>
                <Text
                  style={{
                    color: v.done ? c.mutedForeground : c.foreground,
                    fontSize: 14,
                    fontFamily: v.done ? "Inter_400Regular" : "Inter_500Medium",
                    flex: 1,
                    textDecorationLine: v.done ? "line-through" : "none",
                  }}
                >
                  {v.label}
                </Text>
              </Pressable>
            ))}
          </Card>
        </View>

        {/* Stamps */}
        <View style={{ paddingHorizontal: 20, marginTop: 32 }}>
          <SectionHeader
            title="Travel stamps"
            subtitle="Earned on every booked trip"
          />
          <Card padded>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 4, gap: 18 }}
            >
              {stamps.map((s, i) => (
                <PassportStamp
                  key={s.id}
                  city={s.city}
                  country={s.country}
                  date={s.date}
                  color={s.color}
                  rotation={i % 2 === 0 ? -7 : 6}
                />
              ))}
            </ScrollView>
          </Card>
        </View>

        {/* Rewards quick action */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Pressable onPress={() => router.push("/gift")}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFE9E9", alignItems: "center", justifyContent: "center" }}>
                  <Feather name="gift" size={20} color={c.coral} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>Gift points</Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                    Send Viaa points to anyone via email
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color={c.mutedForeground} />
              </View>
            </Card>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
