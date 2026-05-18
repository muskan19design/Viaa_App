import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Pill, ScreenHeader } from "@/components/ui";
import { DESTINATIONS } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const VIBES = ["All", "Cultural", "Coastal", "Adventure", "Wellness", "Foodie"];

export default function Explore() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { persona } = useApp();
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const okVibe = filter === "All" || d.vibe.includes(filter);
      const okQ =
        q.length === 0 ||
        d.name.toLowerCase().includes(q.toLowerCase()) ||
        d.country.toLowerCase().includes(q.toLowerCase());
      return okVibe && okQ;
    });
  }, [filter, q]);

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 24 : insets.bottom + 84;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad + 4, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader title="Explore" subtitle={persona ? "Hand-picked by your persona" : "Browse destinations"} />

        {/* Guest nudge */}
        {!persona ? (
          <View style={{ paddingHorizontal: 20, marginBottom: 4 }}>
            <Pressable
              onPress={() => router.push("/onboarding")}
              style={({ pressed }) => ({ borderRadius: 20, overflow: "hidden", opacity: pressed ? 0.92 : 1 })}
            >
              <LinearGradient
                colors={["#EAF4FB", "#F0F7FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "rgba(63,169,245,0.2)",
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: c.skyBlue,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="zap" size={18} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.deepOcean, fontSize: 13, fontFamily: "Inter_700Bold" }}>
                    Unlock your match scores
                  </Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                    Build a persona to see how well each destination fits you.
                  </Text>
                </View>
                <Feather name="arrow-right" size={16} color={c.skyBlue} />
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}

        {/* Search */}
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: c.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: c.border,
              paddingHorizontal: 14,
              paddingVertical: 12,
              gap: 10,
            }}
          >
            <Feather name="search" size={18} color={c.mutedForeground} />
            <TextInput
              placeholder="Search a city or country"
              placeholderTextColor={c.mutedForeground}
              value={q}
              onChangeText={setQ}
              style={{
                flex: 1,
                color: c.foreground,
                fontSize: 14,
                fontFamily: "Inter_500Medium",
                padding: 0,
              }}
            />
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginTop: 16 }}
        >
          {VIBES.map((v) => {
            const active = v === filter;
            return (
              <Pressable
                key={v}
                onPress={() => setFilter(v)}
                style={({ pressed }) => ({
                  paddingVertical: 9,
                  paddingHorizontal: 16,
                  borderRadius: 999,
                  backgroundColor: active ? c.deepOcean : c.card,
                  borderWidth: 1,
                  borderColor: active ? c.deepOcean : c.border,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text
                  style={{
                    color: active ? "#fff" : c.foreground,
                    fontSize: 13,
                    fontFamily: "Inter_600SemiBold",
                  }}
                >
                  {v}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Plan CTA inline */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Pressable
            onPress={() => router.push("/generate")}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: c.deepOcean,
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 16,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Feather name="zap" size={16} color="#FF6B6B" />
            <Text style={{ color: "#fff", fontSize: 14, fontFamily: "Inter_600SemiBold", flex: 1 }}>
              Generate a custom trip with AI
            </Text>
            <Feather name="arrow-right" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* List */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, gap: 16 }}>
          {list.map((d) => (
            <Pressable
              key={d.id}
              onPress={() => router.push({ pathname: "/generate", params: { destinationId: d.id } } as any)}
              style={({ pressed }) => ({
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
                opacity: pressed ? 0.95 : 1,
              })}
            >
              <View style={{ height: 220, position: "relative" }}>
                <Image source={d.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                <View
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    backgroundColor: "rgba(255,255,255,0.95)",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Feather name="zap" size={11} color={c.coral} />
                  <Text style={{ color: c.deepOcean, fontSize: 11, fontFamily: "Inter_700Bold" }}>
                    {d.matchPct}%
                  </Text>
                </View>
              </View>
              <View style={{ padding: 18 }}>
                <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                  {d.country.toUpperCase()} · {d.bestMonths.toUpperCase()}
                </Text>
                <Text style={{ color: c.foreground, fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 4, letterSpacing: -0.4 }}>
                  {d.name}
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 6, lineHeight: 19 }}>
                  {d.tagline}
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {d.vibe.map((t) => (
                    <Pill key={t} label={t} tone="neutral" />
                  ))}
                </View>
                <View
                  style={{
                    marginTop: 14,
                    paddingTop: 14,
                    borderTopWidth: 1,
                    borderTopColor: c.border,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>
                    Trips from
                  </Text>
                  <Text style={{ color: c.foreground, fontSize: 17, fontFamily: "Inter_700Bold" }}>
                    ${d.priceFrom.toLocaleString()}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
          {list.length === 0 ? (
            <View style={{ alignItems: "center", paddingVertical: 48 }}>
              <Feather name="search" size={28} color={c.mutedForeground} />
              <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_500Medium", marginTop: 12 }}>
                No destinations match yet
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
