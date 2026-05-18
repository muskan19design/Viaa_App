import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Card, Pill, SectionHeader } from "@/components/ui";
import { DESTINATIONS, SAMPLE_ITINERARY } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const GROUPS = [
  { id: "solo", label: "Solo", icon: "user" as const },
  { id: "couple", label: "Couple", icon: "heart" as const },
  { id: "friends", label: "Friends", icon: "users" as const },
  { id: "family", label: "Family", icon: "home" as const },
];

const BUDGETS = [
  { id: "value", label: "Value", range: "< $1.5k" },
  { id: "comfort", label: "Comfort", range: "$1.5–4k" },
  { id: "premium", label: "Premium", range: "$4–10k" },
  { id: "luxury", label: "Luxury", range: "$10k+" },
];

export default function Generate() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { addTrip } = useApp();
  const params = useLocalSearchParams<{ destinationId?: string }>();

  const [destId, setDestId] = useState<string>(
    (params.destinationId as string) ?? "santorini",
  );
  const [dates, setDates] = useState("Jun 8 – Jun 14, 2026");
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("premium");
  const [group, setGroup] = useState("couple");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [days, setDays] = useState(SAMPLE_ITINERARY);

  const dest = DESTINATIONS.find((d) => d.id === destId) ?? DESTINATIONS[0];

  const onGenerate = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1400);
  };

  const onRegenerate = () => {
    if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    setGenerating(true);
    setTimeout(() => {
      // Shuffle blocks slightly for a "regenerated" feel
      setDays((prev) =>
        prev.map((d) => ({ ...d, blocks: [...d.blocks].reverse() })),
      );
      setGenerating(false);
    }, 1100);
  };

  const onRemoveBlock = (dayIdx: number, blockIdx: number) => {
    if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
    setDays((prev) =>
      prev.map((d, i) =>
        i === dayIdx ? { ...d, blocks: d.blocks.filter((_, j) => j !== blockIdx) } : d,
      ),
    );
  };

  const onSave = async () => {
    const trip = await addTrip({
      destinationId: dest.id,
      destinationName: dest.name,
      country: dest.country,
      startDate: "Jun 8",
      endDate: "Jun 14",
      travelers,
      budget: dest.priceFrom * travelers,
      status: "planned",
    });
    router.replace({ pathname: "/trip/[id]", params: { id: trip.id } } as any);
  };

  const onBookNow = async () => {
    const trip = await addTrip({
      destinationId: dest.id,
      destinationName: dest.name,
      country: dest.country,
      startDate: "Jun 8",
      endDate: "Jun 14",
      travelers,
      budget: dest.priceFrom * travelers,
      status: "planned",
    });
    router.replace({ pathname: "/booking", params: { tripId: trip.id } } as any);
  };

  const onAddActivity = (dayIdx: number) => {
    if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => {});
    const newBlock = {
      time: "Free",
      tag: "Custom",
      title: "Your activity",
      detail: "Tap to edit — add whatever you'd like here.",
    };
    setDays((prev) =>
      prev.map((d, i) =>
        i === dayIdx ? { ...d, blocks: [...d.blocks, newBlock] } : d,
      ),
    );
  };

  const bottomPad = Platform.OS === "web" ? 34 + 100 : insets.bottom + 110;

  if (generated) {
    return (
      <View style={{ flex: 1, backgroundColor: c.background }}>
        <ScrollView contentContainerStyle={{ paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
          {/* Hero summary */}
          <LinearGradient
            colors={[c.deepOcean, c.skyBlue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 28 }}
          >
            <Pill label="AI generated" tone="dark" icon="zap" />
            <Text style={{ color: "#fff", fontSize: 30, fontFamily: "Inter_700Bold", marginTop: 14, letterSpacing: -0.7 }}>
              {dest.name}, {dest.country}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 6 }}>
              {dates} · {travelers} travelers · {BUDGETS.find((b) => b.id === budget)?.label}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 22, gap: 24 }}>
              <View>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>EST. COST</Text>
                <Text style={{ color: "#fff", fontSize: 19, fontFamily: "Inter_700Bold", marginTop: 4 }}>${(dest.priceFrom * travelers).toLocaleString()}</Text>
              </View>
              <View>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>DAYS</Text>
                <Text style={{ color: "#fff", fontSize: 19, fontFamily: "Inter_700Bold", marginTop: 4 }}>{days.length}</Text>
              </View>
              <View>
                <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>MATCH</Text>
                <Text style={{ color: "#fff", fontSize: 19, fontFamily: "Inter_700Bold", marginTop: 4 }}>{dest.matchPct}%</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Itinerary */}
          <View style={{ paddingHorizontal: 20, paddingTop: 22 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <Text style={{ color: c.foreground, fontSize: 19, fontFamily: "Inter_700Bold", letterSpacing: -0.3 }}>
                Itinerary
              </Text>
              <Pressable
                onPress={onRegenerate}
                style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, opacity: pressed ? 0.6 : 1 })}
              >
                {generating ? (
                  <ActivityIndicator size="small" color={c.skyBlue} />
                ) : (
                  <Feather name="refresh-cw" size={14} color={c.skyBlue} />
                )}
                <Text style={{ color: c.skyBlue, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>Regenerate</Text>
              </Pressable>
            </View>

            {days.map((d, dayIdx) => (
              <View key={d.day} style={{ marginBottom: 18 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 10 }}>
                  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: c.deepOcean, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Inter_700Bold" }}>{d.day}</Text>
                  </View>
                  <View>
                    <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_700Bold" }}>{d.title}</Text>
                    <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>{d.date}</Text>
                  </View>
                </View>
                <Card padded={false}>
                  {d.blocks.map((b, blockIdx) => (
                    <View
                      key={`${d.day}-${blockIdx}`}
                      style={{
                        flexDirection: "row",
                        padding: 16,
                        borderBottomWidth: blockIdx === d.blocks.length - 1 ? 0 : 1,
                        borderBottomColor: c.border,
                        gap: 12,
                      }}
                    >
                      <View style={{ width: 50 }}>
                        <Text style={{ color: c.deepOcean, fontSize: 13, fontFamily: "Inter_700Bold" }}>{b.time}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Pill label={b.tag} tone="primary" />
                        <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold", marginTop: 6 }}>{b.title}</Text>
                        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 3, lineHeight: 18 }}>{b.detail}</Text>
                      </View>
                      <Pressable onPress={() => onRemoveBlock(dayIdx, blockIdx)} hitSlop={8}>
                        <Feather name="x" size={16} color={c.mutedForeground} />
                      </Pressable>
                    </View>
                  ))}
                  <Pressable
                    onPress={() => onAddActivity(dayIdx)}
                    style={({ pressed }) => ({
                      paddingVertical: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      opacity: pressed ? 0.6 : 1,
                      borderTopWidth: 1,
                      borderTopColor: c.border,
                    })}
                  >
                    <Feather name="plus" size={14} color={c.skyBlue} />
                    <Text style={{ color: c.skyBlue, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>Add activity</Text>
                  </Pressable>
                </Card>
              </View>
            ))}
          </View>
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
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Button label="Save trip" variant="secondary" onPress={onSave} style={{ flex: 1 }} fullWidth />
          <Button label="Book now" icon="arrow-right" onPress={onBookNow} style={{ flex: 1.4 }} fullWidth />
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
          STEP 1
        </Text>
        <Text style={{ color: c.foreground, fontSize: 26, fontFamily: "Inter_700Bold", letterSpacing: -0.5, marginTop: 6, marginBottom: 24 }}>
          Tell us the basics
        </Text>

        <SectionHeader title="Destination" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingBottom: 4 }}>
          {DESTINATIONS.map((d) => {
            const active = d.id === destId;
            return (
              <Pressable
                key={d.id}
                onPress={() => setDestId(d.id)}
                style={({ pressed }) => ({
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 14,
                  backgroundColor: active ? c.deepOcean : c.card,
                  borderWidth: 1,
                  borderColor: active ? c.deepOcean : c.border,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: active ? "rgba(255,255,255,0.6)" : c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>
                  {d.country.toUpperCase()}
                </Text>
                <Text style={{ color: active ? "#fff" : c.foreground, fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 3 }}>
                  {d.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Dates" />
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
            <Feather name="calendar" size={18} color={c.skyBlue} />
            <TextInput
              value={dates}
              onChangeText={setDates}
              style={{ flex: 1, color: c.foreground, fontSize: 14, fontFamily: "Inter_500Medium", padding: 0 }}
              placeholderTextColor={c.mutedForeground}
            />
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Travelers" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: c.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: c.border,
              padding: 14,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <Feather name="users" size={18} color={c.skyBlue} />
              <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                {travelers} {travelers === 1 ? "person" : "people"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() => setTravelers((t) => Math.max(1, t - 1))}
                style={({ pressed }) => ({
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: c.muted,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Feather name="minus" size={14} color={c.foreground} />
              </Pressable>
              <Pressable
                onPress={() => setTravelers((t) => Math.min(12, t + 1))}
                style={({ pressed }) => ({
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: c.deepOcean,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Feather name="plus" size={14} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Group" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {GROUPS.map((g) => {
              const active = g.id === group;
              return (
                <Pressable
                  key={g.id}
                  onPress={() => setGroup(g.id)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minWidth: "45%",
                    paddingVertical: 16,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    backgroundColor: active ? "#EAF4FB" : c.card,
                    borderWidth: 1,
                    borderColor: active ? c.skyBlue : c.border,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Feather name={g.icon} size={16} color={active ? c.skyBlue : c.mutedForeground} />
                  <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>{g.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Budget" />
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {BUDGETS.map((b) => {
              const active = b.id === budget;
              return (
                <Pressable
                  key={b.id}
                  onPress={() => setBudget(b.id)}
                  style={({ pressed }) => ({
                    flex: 1,
                    minWidth: "45%",
                    paddingVertical: 16,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    backgroundColor: active ? c.deepOcean : c.card,
                    borderWidth: 1,
                    borderColor: active ? c.deepOcean : c.border,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Text style={{ color: active ? "rgba(255,255,255,0.6)" : c.mutedForeground, fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1 }}>
                    {b.range.toUpperCase()}
                  </Text>
                  <Text style={{ color: active ? "#fff" : c.foreground, fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 3 }}>
                    {b.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
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
        <Button
          label={generating ? "Generating itinerary..." : "Generate itinerary"}
          icon={generating ? undefined : "zap"}
          onPress={onGenerate}
          loading={generating}
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}
