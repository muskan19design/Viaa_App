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
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Pill } from "@/components/ui";
import { DESTINATIONS } from "@/constants/data";
import { SavedTrip, useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

type Filter = "all" | "upcoming" | "past";

const STATUS_TONE: Record<string, "aqua" | "neutral" | "primary"> = {
  booked: "aqua",
  past: "neutral",
  planned: "primary",
};
const STATUS_LABEL: Record<string, string> = {
  booked: "Booked",
  past: "Completed",
  planned: "Planned",
};
const STATUS_ICON: Record<string, keyof typeof Feather.glyphMap> = {
  booked: "check-circle",
  past: "flag",
  planned: "clock",
};

export default function Trips() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { trips } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 28;

  const filtered = useMemo(() => {
    if (filter === "upcoming") return trips.filter((t) => t.status !== "past");
    if (filter === "past") return trips.filter((t) => t.status === "past");
    return trips;
  }, [trips, filter]);

  const countries = new Set(trips.map((t) => t.country)).size;
  const totalDays = trips.reduce((acc) => acc + 6, 0);

  const upcomingCount = trips.filter((t) => t.status !== "past").length;
  const pastCount = trips.filter((t) => t.status === "past").length;
  const tabCounts: Record<Filter, number> = { all: trips.length, upcoming: upcomingCount, past: pastCount };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 22 }}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={8}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 18,
              alignSelf: "flex-start",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Feather name="arrow-left" size={18} color={c.mutedForeground} />
            <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_500Medium" }}>Back</Text>
          </Pressable>

          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
            YOUR JOURNEYS
          </Text>
          <Text style={{ color: c.foreground, fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.6, marginTop: 4 }}>
            My trips
          </Text>

          {/* Stats strip */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 18,
              backgroundColor: c.card,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: c.border,
              overflow: "hidden",
            }}
          >
            <StatCell icon="map" label="Trips" value={String(trips.length)} color={c.skyBlue} />
            <View style={{ width: 1, backgroundColor: c.border }} />
            <StatCell icon="globe" label="Countries" value={String(countries)} color={c.coral} />
            <View style={{ width: 1, backgroundColor: c.border }} />
            <StatCell icon="sun" label="Days away" value={String(totalDays)} color="#7FD1B9" />
          </View>
        </View>

        {/* Filter tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginBottom: 22 }}
        >
          {(["all", "upcoming", "past"] as Filter[]).map((f) => {
            const labels: Record<Filter, string> = { all: "All trips", upcoming: "Upcoming", past: "Completed" };
            const active = filter === f;
            return (
              <Pressable
                key={f}
                onPress={() => setFilter(f)}
                style={({ pressed }) => ({
                  paddingVertical: 9,
                  paddingHorizontal: 16,
                  borderRadius: 999,
                  backgroundColor: active ? c.deepOcean : c.card,
                  borderWidth: 1,
                  borderColor: active ? c.deepOcean : c.border,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text style={{ color: active ? "#fff" : c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>
                  {labels[f]}
                </Text>
                <View
                  style={{
                    minWidth: 20,
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderRadius: 999,
                    backgroundColor: active ? "rgba(255,255,255,0.18)" : c.muted,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: active ? "#fff" : c.mutedForeground, fontSize: 10, fontFamily: "Inter_700Bold" }}>
                    {tabCounts[f]}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Trip cards */}
        {filtered.length === 0 ? (
          <EmptyState filter={filter} />
        ) : (
          <View style={{ paddingHorizontal: 20, gap: 18 }}>
            {filtered.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
        )}

        {/* Plan new trip CTA */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <Pressable
            onPress={() => router.push("/generate")}
            style={({ pressed }) => ({
              flexDirection: "row",
              alignItems: "center",
              gap: 14,
              backgroundColor: c.deepOcean,
              paddingVertical: 16,
              paddingHorizontal: 20,
              borderRadius: 20,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <LinearGradient
              colors={[c.skyBlue, "#7FD1B9"]}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="plus" size={20} color="#fff" />
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#fff", fontSize: 15, fontFamily: "Inter_700Bold" }}>Plan a new trip</Text>
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                AI builds your itinerary in seconds
              </Text>
            </View>
            <Feather name="arrow-right" size={18} color="rgba(255,255,255,0.45)" />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function TripCard({ trip }: { trip: SavedTrip }) {
  const c = useColors();
  const dest = DESTINATIONS.find((d) => d.id === trip.destinationId) ?? DESTINATIONS[0];
  const isPast = trip.status === "past";
  const isBooked = trip.status === "booked";

  return (
    <View
      style={{
        borderRadius: 22,
        overflow: "hidden",
        backgroundColor: c.card,
        borderWidth: 1,
        borderColor: c.border,
      }}
    >
      {/* Image */}
      <Pressable
        onPress={() =>
          isPast
            ? router.push({ pathname: "/generate", params: { destinationId: trip.destinationId } } as any)
            : router.push({ pathname: "/trip/[id]", params: { id: trip.id } } as any)
        }
        style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
      >
        <View style={{ height: 168, position: "relative" }}>
          <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <LinearGradient
            colors={["transparent", "rgba(10,37,64,0.78)"]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "65%" }}
          />
          {isPast ? (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(10,20,40,0.3)",
              }}
            />
          ) : null}

          {/* Status badge */}
          <View style={{ position: "absolute", top: 12, left: 12 }}>
            <Pill
              label={STATUS_LABEL[trip.status]}
              tone={STATUS_TONE[trip.status]}
              icon={STATUS_ICON[trip.status]}
            />
          </View>

          {/* Match score */}
          {!isPast ? (
            <View
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "rgba(255,255,255,0.92)",
                paddingHorizontal: 9,
                paddingVertical: 5,
                borderRadius: 999,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Feather name="zap" size={10} color="#FF6B6B" />
              <Text style={{ color: "#0A2540", fontSize: 11, fontFamily: "Inter_700Bold" }}>
                {dest.matchPct}%
              </Text>
            </View>
          ) : null}

          {/* Destination name */}
          <View style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
            <Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3 }}>
              {trip.country.toUpperCase()}
            </Text>
            <Text style={{ color: "#fff", fontSize: 22, fontFamily: "Inter_700Bold", letterSpacing: -0.4, marginTop: 2 }}>
              {trip.destinationName}
            </Text>
          </View>
        </View>
      </Pressable>

      {/* Meta + actions */}
      <View style={{ padding: 16 }}>
        {/* Info chips */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 14, marginBottom: 16 }}>
          <InfoChip icon="calendar" label={`${trip.startDate} – ${trip.endDate}`} />
          <InfoChip icon="users" label={`${trip.travelers} traveler${trip.travelers !== 1 ? "s" : ""}`} />
          <InfoChip icon="dollar-sign" label={`$${trip.budget.toLocaleString()}`} />
        </View>

        {/* Action buttons */}
        <View style={{ flexDirection: "row", gap: 10 }}>
          {isPast ? (
            <>
              <Button
                label="Regenerate"
                icon="zap"
                size="sm"
                onPress={() => router.push({ pathname: "/generate", params: { destinationId: trip.destinationId } } as any)}
                style={{ flex: 1 }}
                fullWidth
              />
              <Button
                label="Rebook"
                icon="refresh-cw"
                variant="secondary"
                size="sm"
                onPress={() => router.push({ pathname: "/booking", params: { tripId: trip.id } } as any)}
                style={{ flex: 1 }}
                fullWidth
              />
            </>
          ) : isBooked ? (
            <>
              <Button
                label="View pass"
                icon="credit-card"
                variant="secondary"
                size="sm"
                onPress={() => router.push("/(tabs)/wallet")}
                style={{ flex: 1 }}
                fullWidth
              />
              <Button
                label="View trip"
                icon="arrow-right"
                size="sm"
                onPress={() => router.push({ pathname: "/trip/[id]", params: { id: trip.id } } as any)}
                style={{ flex: 1 }}
                fullWidth
              />
            </>
          ) : (
            <>
              <Button
                label="Book now"
                icon="send"
                size="sm"
                onPress={() => router.push({ pathname: "/booking", params: { tripId: trip.id } } as any)}
                style={{ flex: 1 }}
                fullWidth
              />
              <Button
                label="View itinerary"
                icon="map"
                variant="secondary"
                size="sm"
                onPress={() => router.push({ pathname: "/trip/[id]", params: { id: trip.id } } as any)}
                style={{ flex: 1 }}
                fullWidth
              />
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function StatCell({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  value: string;
  color: string;
}) {
  const c = useColors();
  return (
    <View style={{ flex: 1, alignItems: "center", paddingVertical: 16, gap: 4 }}>
      <Feather name={icon} size={16} color={color} />
      <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>{value}</Text>
      <Text style={{ color: c.mutedForeground, fontSize: 9, fontFamily: "Inter_600SemiBold", letterSpacing: 0.8 }}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
}

function InfoChip({ icon, label }: { icon: keyof typeof Feather.glyphMap; label: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
      <Feather name={icon} size={12} color={c.mutedForeground} />
      <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>{label}</Text>
    </View>
  );
}

function EmptyState({ filter }: { filter: Filter }) {
  const c = useColors();
  const config: Record<Filter, { icon: keyof typeof Feather.glyphMap; title: string; sub: string }> = {
    all: { icon: "map", title: "No trips yet", sub: "Your first adventure starts with a single plan." },
    upcoming: { icon: "calendar", title: "Nothing upcoming", sub: "Plan a trip and it'll appear here ready to book." },
    past: { icon: "flag", title: "No completed trips", sub: "Every trip you take earns a stamp and lives here." },
  };
  const msg = config[filter];
  return (
    <View style={{ alignItems: "center", paddingVertical: 56, paddingHorizontal: 36 }}>
      <LinearGradient
        colors={[c.deepOcean, c.skyBlue]}
        style={{
          width: 68,
          height: 68,
          borderRadius: 34,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Feather name={msg.icon} size={28} color="#fff" />
      </LinearGradient>
      <Text style={{ color: c.foreground, fontSize: 17, fontFamily: "Inter_700Bold", textAlign: "center", letterSpacing: -0.3 }}>
        {msg.title}
      </Text>
      <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 8, lineHeight: 20 }}>
        {msg.sub}
      </Text>
      <Pressable
        onPress={() => router.push("/generate")}
        style={({ pressed }) => ({
          marginTop: 22,
          paddingVertical: 12,
          paddingHorizontal: 26,
          borderRadius: 14,
          backgroundColor: c.deepOcean,
          opacity: pressed ? 0.85 : 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        })}
      >
        <Feather name="zap" size={14} color="#FF6B6B" />
        <Text style={{ color: "#fff", fontSize: 13, fontFamily: "Inter_600SemiBold" }}>Plan a trip</Text>
      </Pressable>
    </View>
  );
}
