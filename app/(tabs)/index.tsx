import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, Pill, SectionHeader } from "@/components/ui";
import { COMMUNITY_RECS, DESTINATIONS } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function Home() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { persona, points, premium, trips } = useApp();

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 24 : insets.bottom + 84;

  const upcoming = trips.find((t) => t.status === "planned" || t.status === "booked");

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={{ paddingHorizontal: 20, marginBottom: 18 }}>
          <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_500Medium", letterSpacing: 0.4 }}>
            Welcome back
          </Text>
          <Text style={{ color: c.foreground, fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.6, marginTop: 4 }}>
            Where to next?
          </Text>
        </View>

        {/* Build persona CTA — shown when persona not yet built */}
        {!persona ? (
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <Pressable
              onPress={() => router.push("/onboarding")}
              style={({ pressed }) => ({
                borderRadius: 22,
                overflow: "hidden",
                opacity: pressed ? 0.92 : 1,
                borderWidth: 1,
                borderColor: "rgba(63,169,245,0.25)",
              })}
            >
              <LinearGradient
                colors={["#EAF4FB", "#FFF5F5"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 18, flexDirection: "row", alignItems: "center", gap: 14 }}
              >
                <LinearGradient
                  colors={[c.deepOcean, c.skyBlue]}
                  style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}
                >
                  <Feather name="user-plus" size={20} color="#fff" />
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.deepOcean, fontSize: 15, fontFamily: "Inter_700Bold", letterSpacing: -0.2 }}>
                    Build your travel persona
                  </Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                    2 minutes · unlocks personalized trips
                  </Text>
                </View>
                <Feather name="arrow-right" size={20} color={c.skyBlue} />
              </LinearGradient>
            </Pressable>
          </View>
        ) : null}

        {/* Persona card */}
        <View style={{ paddingHorizontal: 20 }}>
          <Pressable
            onPress={() => router.push(persona ? "/(tabs)/profile" : "/onboarding")}
            style={({ pressed }) => ({
              borderRadius: 22,
              overflow: "hidden",
              opacity: pressed ? 0.95 : 1,
            })}
          >
            <LinearGradient
              colors={[c.deepOcean, "#163A5F", c.skyBlue]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ padding: 22 }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                    {persona ? "YOUR PERSONA" : "GUEST MODE"}
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 6, letterSpacing: -0.4 }}>
                    {persona?.title ?? "Curious Traveler"}
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 6, lineHeight: 19 }} numberOfLines={2}>
                    {persona?.description ?? "Browse freely — build a persona any time to unlock matches tailored to you."}
                  </Text>
                </View>
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  <Feather name="globe" size={20} color="#fff" />
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 18, gap: 12 }}>
                <Pressable
                  onPress={() => router.push("/(tabs)/wallet")}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.10)",
                    borderRadius: 14,
                    padding: 12,
                    opacity: pressed ? 0.8 : 1,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.10)",
                  })}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Feather name="award" size={12} color="#FF6B6B" />
                    <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>
                      POINTS
                    </Text>
                  </View>
                  <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                    {points.toLocaleString()}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => router.push("/(tabs)/wallet")}
                  style={({ pressed }) => ({
                    flex: 1,
                    backgroundColor: "rgba(255,255,255,0.10)",
                    borderRadius: 14,
                    padding: 12,
                    opacity: pressed ? 0.8 : 1,
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.10)",
                  })}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Feather name="credit-card" size={12} color="#7FD1B9" />
                    <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>
                      WALLET
                    </Text>
                  </View>
                  <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 4 }}>
                    Open
                  </Text>
                </Pressable>
              </View>
            </LinearGradient>
          </Pressable>
        </View>

        {/* Plan trip CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Pressable
            onPress={() => router.push("/generate")}
            style={({ pressed }) => ({
              borderRadius: 22,
              overflow: "hidden",
              opacity: pressed ? 0.92 : 1,
            })}
          >
            <View
              style={{
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
                borderRadius: 22,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <LinearGradient
                colors={[c.deepOcean, c.skyBlue]}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="plus" size={22} color="#fff" />
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 17, fontFamily: "Inter_700Bold", letterSpacing: -0.3 }}>
                  Plan my next trip
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                  AI builds the full itinerary in seconds
                </Text>
              </View>
              <Feather name="arrow-right" size={20} color={c.mutedForeground} />
            </View>
          </Pressable>
        </View>

        {upcoming ? (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <Pressable onPress={() => router.push(`/trip/${upcoming.id}` as any)}>
              <Card>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <Pill label={upcoming.status === "booked" ? "Booked" : "Planned"} tone={upcoming.status === "booked" ? "aqua" : "primary"} icon="check" />
                    <Text style={{ color: c.foreground, fontSize: 19, fontFamily: "Inter_700Bold", marginTop: 10, letterSpacing: -0.3 }}>
                      {upcoming.destinationName}, {upcoming.country}
                    </Text>
                    <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 4 }}>
                      {upcoming.startDate} – {upcoming.endDate} · {upcoming.travelers} travelers
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={22} color={c.mutedForeground} />
                </View>
              </Card>
            </Pressable>
          </View>
        ) : null}

        {/* My trips row */}
        {trips.length > 0 ? (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <Pressable
              onPress={() => router.push("/trips")}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
                borderRadius: 18,
                paddingVertical: 14,
                paddingHorizontal: 18,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: "#EAF4FB",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="map" size={17} color={c.skyBlue} />
                </View>
                <View>
                  <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>My trips</Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                    {trips.length} total · {trips.filter((t) => t.status !== "past").length} upcoming
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: c.deepOcean }}>
                  <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_700Bold" }}>{trips.length}</Text>
                </View>
                <Feather name="chevron-right" size={18} color={c.mutedForeground} />
              </View>
            </Pressable>
          </View>
        ) : null}

        {/* Recommended */}
        <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
          <SectionHeader title="Picked for you" subtitle="Matched to your persona" />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
        >
          {DESTINATIONS.slice(0, 5).map((d) => (
            <Pressable
              key={d.id}
              onPress={() => router.push({ pathname: "/generate", params: { destinationId: d.id } } as any)}
              style={({ pressed }) => ({
                width: 240,
                borderRadius: 22,
                overflow: "hidden",
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
                opacity: pressed ? 0.92 : 1,
              })}
            >
              <View style={{ height: 280, position: "relative" }}>
                <Image source={d.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(10,37,64,0.85)"]}
                  style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "65%" }}
                />
                <View style={{ position: "absolute", top: 14, left: 14 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      paddingHorizontal: 9,
                      paddingVertical: 5,
                      borderRadius: 999,
                      gap: 4,
                    }}
                  >
                    <Feather name="zap" size={10} color={c.coral} />
                    <Text style={{ color: c.deepOcean, fontSize: 11, fontFamily: "Inter_700Bold" }}>
                      {d.matchPct}% match
                    </Text>
                  </View>
                </View>
                <View style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                    {d.country.toUpperCase()}
                  </Text>
                  <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", marginTop: 2, letterSpacing: -0.4 }}>
                    {d.name}
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 4 }} numberOfLines={2}>
                    {d.tagline}
                  </Text>
                </View>
              </View>
              <View style={{ padding: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>From</Text>
                <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_700Bold" }}>
                  ${d.priceFrom.toLocaleString()}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* People like you loved */}
        <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
          <SectionHeader title="People like you loved" subtitle="Anonymous tips from similar personas" action="See all" onAction={() => router.push("/(tabs)/community")} />
          <View style={{ gap: 12 }}>
            {COMMUNITY_RECS.slice(0, 3).map((r) => (
              <Pressable
                key={r.id}
                onPress={() => router.push("/(tabs)/community")}
                style={({ pressed }) => ({ opacity: pressed ? 0.92 : 1 })}
              >
                <Card>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <View style={{ flex: 1, paddingRight: 12 }}>
                      <View style={{ flexDirection: "row", gap: 6, marginBottom: 8 }}>
                        <Pill label={`${r.similarity}% similar`} tone="primary" icon="users" />
                        <Pill label={r.destination} tone="neutral" />
                      </View>
                      <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold", lineHeight: 21 }}>
                        {r.title}
                      </Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 4, lineHeight: 19 }}>
                        {r.detail}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={18} color={c.mutedForeground} />
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Local guides teaser */}
        <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
          <SectionHeader title="Local guides" subtitle="Verified, tipped by travelers like you" action="Browse" onAction={() => router.push("/guides")} />
          <Pressable onPress={() => router.push("/guides")}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    backgroundColor: "#EAF4FB",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="map-pin" size={22} color={c.skyBlue} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>
                    Book a guide who actually lives there
                  </Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                    24 verified guides · from $180/day
                  </Text>
                </View>
                <Feather name="chevron-right" size={20} color={c.mutedForeground} />
              </View>
            </Card>
          </Pressable>
        </View>

        {/* Premium */}
        {!premium ? (
          <View style={{ marginTop: 32, paddingHorizontal: 20 }}>
            <Pressable onPress={() => router.push("/premium")}>
              <View
                style={{
                  borderRadius: 22,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: "#FFD9D9",
                }}
              >
                <LinearGradient
                  colors={["#FFF5F5", "#FFE8E8"]}
                  style={{ padding: 20 }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <LinearGradient
                      colors={["#FF6B6B", "#FF9466"]}
                      style={{ width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" }}
                    >
                      <Feather name="star" size={20} color="#fff" />
                    </LinearGradient>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: c.deepOcean, fontSize: 15, fontFamily: "Inter_700Bold" }}>
                        The 1% Club
                      </Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                        Invite-only luxury · concierge included
                      </Text>
                    </View>
                    <Feather name="arrow-right" size={20} color={c.coral} />
                  </View>
                </LinearGradient>
              </View>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
