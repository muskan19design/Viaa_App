import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Card, Pill, SectionHeader } from "@/components/ui";
import { FLIGHTS, HOTELS } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function Booking() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { tripId } = useLocalSearchParams<{ tripId?: string }>();
  const { points, bookTrip, addStamp, addPoints, trips } = useApp();

  const [flightId, setFlightId] = useState(FLIGHTS[0]?.id ?? "");
  const [hotelId, setHotelId] = useState(HOTELS[0]?.id ?? "");
  const [usePoints, setUsePoints] = useState(false);
  const [booking, setBooking] = useState(false);

  const flight = FLIGHTS.find((f) => f.id === flightId)!;
  const hotel = HOTELS.find((h) => h.id === hotelId)!;
  const nights = 4;
  const subtotal = flight.price + hotel.pricePerNight * nights;
  const pointsValue = usePoints ? Math.min(points, Math.floor(subtotal * 0.2)) : 0;
  const total = subtotal - pointsValue;

  const trip = trips.find((t) => t.id === tripId);

  const onPay = async () => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setBooking(true);
    const pointsEarned = Math.floor(total / 10);
    setTimeout(async () => {
      if (tripId) await bookTrip(tripId, pointsValue);
      if (trip) {
        await addStamp({
          city: trip.destinationName,
          country: trip.country,
          date: trip.startDate,
          color: ["#FF6B6B", "#3FA9F5", "#7FD1B9"][Math.floor(Math.random() * 3)],
        });
      }
      await addPoints(pointsEarned);
      setBooking(false);
      router.replace({
        pathname: "/confirmed",
        params: {
          airline: flight.airline,
          from: flight.from,
          to: flight.to,
          depart: flight.depart,
          arrive: flight.arrive,
          cabin: flight.cabin,
          stops: flight.stops,
          hotelName: hotel.name,
          hotelBadge: hotel.badge,
          hotelNights: String(nights),
          total: String(total),
          pointsEarned: String(pointsEarned),
          destination: trip?.destinationName ?? "Your destination",
          country: trip?.country ?? "",
          startDate: trip?.startDate ?? "",
          endDate: trip?.endDate ?? "",
        },
      } as any);
    }, 1400);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Choose your flight" />
        <View style={{ gap: 10 }}>
          {FLIGHTS.map((f) => {
            const active = f.id === flightId;
            return (
              <Pressable key={f.id} onPress={() => setFlightId(f.id)}>
                <View
                  style={{
                    backgroundColor: c.card,
                    borderRadius: 18,
                    borderWidth: 1.5,
                    borderColor: active ? c.skyBlue : c.border,
                    padding: 16,
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>
                        {f.airline.toUpperCase()} · {f.cabin.toUpperCase()}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 }}>
                        <View>
                          <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold" }}>{f.depart}</Text>
                          <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>{f.from}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                          <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>{f.duration}</Text>
                          <View style={{ height: 1, backgroundColor: c.border, alignSelf: "stretch", marginVertical: 4 }} />
                          <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_500Medium" }}>{f.stops}</Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                          <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold" }}>{f.arrive}</Text>
                          <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>{f.to}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: c.border }}>
                    <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: active ? c.skyBlue : c.border, backgroundColor: active ? c.skyBlue : "transparent", alignItems: "center", justifyContent: "center" }}>
                      {active ? <Feather name="check" size={10} color="#fff" /> : null}
                    </View>
                    <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold" }}>${f.price.toLocaleString()}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={{ marginTop: 24 }}>
          <SectionHeader title="Choose your stay" />
          <View style={{ gap: 10 }}>
            {HOTELS.map((h) => {
              const active = h.id === hotelId;
              return (
                <Pressable key={h.id} onPress={() => setHotelId(h.id)}>
                  <View
                    style={{
                      backgroundColor: c.card,
                      borderRadius: 18,
                      borderWidth: 1.5,
                      borderColor: active ? c.skyBlue : c.border,
                      padding: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: c.muted, alignItems: "center", justifyContent: "center" }}>
                      <Feather name="home" size={20} color={c.deepOcean} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>{h.name}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>★ {h.rating}</Text>
                        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>·</Text>
                        <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>{h.badge}</Text>
                      </View>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={{ color: c.foreground, fontSize: 16, fontFamily: "Inter_700Bold" }}>${h.pricePerNight}</Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_500Medium" }}>/ night</Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Card>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_600SemiBold" }}>Apply reward points</Text>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                  You have {points.toLocaleString()} points · save up to ${Math.floor(subtotal * 0.2)}
                </Text>
              </View>
              <Switch value={usePoints} onValueChange={setUsePoints} trackColor={{ false: c.border, true: c.skyBlue }} thumbColor="#fff" />
            </View>
          </Card>
        </View>

        <View style={{ marginTop: 18 }}>
          <Card>
            <View style={{ gap: 8 }}>
              <Row label="Flight" value={`$${flight.price.toLocaleString()}`} c={c} />
              <Row label={`Stay · ${nights} nights`} value={`$${(hotel.pricePerNight * nights).toLocaleString()}`} c={c} />
              {pointsValue > 0 ? <Row label="Points discount" value={`- $${pointsValue.toLocaleString()}`} c={c} accent /> : null}
              <View style={{ height: 1, backgroundColor: c.border, marginVertical: 6 }} />
              <Row label="Total" value={`$${total.toLocaleString()}`} c={c} bold />
            </View>
          </Card>
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
        <Button label={booking ? "Confirming..." : `Pay $${total.toLocaleString()}`} icon={booking ? undefined : "lock"} onPress={onPay} loading={booking} fullWidth size="lg" />
      </View>
    </View>
  );
}

function Row({ label, value, c, bold, accent }: { label: string; value: string; c: any; bold?: boolean; accent?: boolean }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{ color: c.mutedForeground, fontSize: bold ? 15 : 13, fontFamily: bold ? "Inter_600SemiBold" : "Inter_400Regular" }}>
        {label}
      </Text>
      <Text style={{ color: accent ? c.coral : c.foreground, fontSize: bold ? 18 : 14, fontFamily: bold ? "Inter_700Bold" : "Inter_600SemiBold" }}>
        {value}
      </Text>
    </View>
  );
}
