import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Card, Pill, SectionHeader } from "@/components/ui";
import { DESTINATIONS, SAMPLE_ITINERARY } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function TripDetail() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { trips } = useApp();
  const trip = trips.find((t) => t.id === id);

  if (!trip) {
    return (
      <View style={{ flex: 1, backgroundColor: c.background, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Feather name="map" size={32} color={c.mutedForeground} />
        <Text style={{ color: c.foreground, fontSize: 16, fontFamily: "Inter_600SemiBold", marginTop: 12 }}>Trip not found</Text>
        <Button label="Back" onPress={() => router.back()} variant="secondary" style={{ marginTop: 16 }} />
      </View>
    );
  }

  const dest = DESTINATIONS.find((d) => d.id === trip.destinationId) ?? DESTINATIONS[0];
  const bottomPad = Platform.OS === "web" ? 34 + 90 : insets.bottom + 100;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
        <View style={{ height: 280, position: "relative" }}>
          <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <LinearGradient
            colors={["transparent", "rgba(10,37,64,0.9)"]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "65%" }}
          />
          <View style={{ position: "absolute", bottom: 22, left: 22, right: 22 }}>
            <Pill label={trip.status === "booked" ? "Booked" : "Planned"} tone={trip.status === "booked" ? "aqua" : "primary"} icon="check" />
            <Text style={{ color: "#fff", fontSize: 30, fontFamily: "Inter_700Bold", marginTop: 12, letterSpacing: -0.7 }}>
              {trip.destinationName}
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 4 }}>
              {trip.country} · {trip.startDate} – {trip.endDate}
            </Text>
          </View>
        </View>

        <View style={{ padding: 20 }}>
          <Card>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>TOTAL</Text>
                <Text style={{ color: c.foreground, fontSize: 24, fontFamily: "Inter_700Bold", marginTop: 4 }}>${trip.budget.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>TRAVELERS</Text>
                <Text style={{ color: c.foreground, fontSize: 24, fontFamily: "Inter_700Bold", marginTop: 4 }}>{trip.travelers}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>MATCH</Text>
                <Text style={{ color: c.skyBlue, fontSize: 24, fontFamily: "Inter_700Bold", marginTop: 4 }}>{dest.matchPct}%</Text>
              </View>
            </View>
          </Card>

          <View style={{ marginTop: 22 }}>
            <SectionHeader title="Itinerary" />
            {SAMPLE_ITINERARY.map((d) => (
              <View key={d.day} style={{ marginBottom: 14 }}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 10 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c.deepOcean, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_700Bold" }}>{d.day}</Text>
                  </View>
                  <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_700Bold" }}>{d.title}</Text>
                </View>
                <Card padded={false}>
                  {d.blocks.map((b, i) => (
                    <View
                      key={i}
                      style={{
                        flexDirection: "row",
                        padding: 14,
                        borderBottomWidth: i === d.blocks.length - 1 ? 0 : 1,
                        borderBottomColor: c.border,
                        gap: 12,
                      }}
                    >
                      <Text style={{ width: 46, color: c.deepOcean, fontSize: 12, fontFamily: "Inter_700Bold" }}>{b.time}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>{b.title}</Text>
                        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2, lineHeight: 17 }}>{b.detail}</Text>
                      </View>
                    </View>
                  ))}
                </Card>
              </View>
            ))}
          </View>

          <View style={{ marginTop: 12 }}>
            <SectionHeader title="Add to your trip" />
            <View style={{ gap: 10 }}>
              <Pressable onPress={() => router.push({ pathname: "/booking", params: { tripId: trip.id } } as any)}>
                <Card>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                    <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "#EAF4FB", alignItems: "center", justifyContent: "center" }}>
                      <Feather name="send" size={20} color={c.skyBlue} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>Book flight + hotel</Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>3 flight options · 8 hotels</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={c.mutedForeground} />
                  </View>
                </Card>
              </Pressable>
              <Pressable onPress={() => router.push("/guides")}>
                <Card>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                    <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFE9E9", alignItems: "center", justifyContent: "center" }}>
                      <Feather name="map-pin" size={20} color={c.coral} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>Hire a local guide</Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>4 verified guides nearby</Text>
                    </View>
                    <Feather name="chevron-right" size={20} color={c.mutedForeground} />
                  </View>
                </Card>
              </Pressable>
            </View>
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
          label={trip.status === "booked" ? "View boarding pass" : "Book this trip"}
          icon="arrow-right"
          onPress={() =>
            trip.status === "booked"
              ? router.push("/(tabs)/wallet")
              : router.push({ pathname: "/booking", params: { tripId: trip.id } } as any)
          }
          fullWidth
          size="lg"
        />
      </View>
    </View>
  );
}
