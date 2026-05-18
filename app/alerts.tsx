import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
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

import { Card, SectionHeader } from "@/components/ui";
import { useColors } from "@/hooks/useColors";

type AlertSetting = {
  id: string;
  icon: keyof typeof Feather.glyphMap;
  label: string;
  subtitle: string;
  defaultOn: boolean;
};

const ALERT_SETTINGS: AlertSetting[] = [
  { id: "flight_change", icon: "refresh-cw", label: "Flight changes", subtitle: "Schedule updates, delays & cancellations", defaultOn: true },
  { id: "gate_update", icon: "map-pin", label: "Gate updates", subtitle: "Gate assignments 2 hours before departure", defaultOn: true },
  { id: "checkin", icon: "clock", label: "Check-in reminders", subtitle: "24 hours before your flight", defaultOn: true },
  { id: "price_drop", icon: "trending-down", label: "Price drops", subtitle: "When saved trips drop in price", defaultOn: true },
  { id: "hotel_confirm", icon: "home", label: "Hotel confirmations", subtitle: "Booking receipts and check-in info", defaultOn: true },
  { id: "itinerary", icon: "calendar", label: "Daily itinerary", subtitle: "Morning nudge with today's plan", defaultOn: false },
  { id: "community", icon: "users", label: "Taste match tips", subtitle: "New tips from your travel doppelgängers", defaultOn: false },
  { id: "rewards", icon: "award", label: "Points & rewards", subtitle: "Earned points and expiry warnings", defaultOn: true },
];

export default function Alerts() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(ALERT_SETTINGS.map((a) => [a.id, a.defaultOn]))
  );

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 16;

  const toggle = (id: string) =>
    setValues((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      {/* Header */}
      <View
        style={{
          paddingTop: topPad,
          paddingHorizontal: 20,
          paddingBottom: 14,
          backgroundColor: c.background,
          borderBottomWidth: 1,
          borderBottomColor: c.border,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: c.muted,
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Feather name="arrow-left" size={18} color={c.foreground} />
        </Pressable>
        <View>
          <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", letterSpacing: -0.3 }}>
            Trip alerts
          </Text>
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
            Stay on top of every update
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 24, paddingBottom: bottomPad + 24, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <SectionHeader title="Notifications" subtitle="Changes take effect immediately" />
        <Card padded={false}>
          {ALERT_SETTINGS.map((a, i) => (
            <View
              key={a.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                paddingHorizontal: 18,
                paddingVertical: 15,
                borderBottomWidth: i < ALERT_SETTINGS.length - 1 ? 1 : 0,
                borderBottomColor: c.border,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: values[a.id] ? "rgba(63,169,245,0.10)" : c.muted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name={a.icon} size={16} color={values[a.id] ? c.skyBlue : c.mutedForeground} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                  {a.label}
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                  {a.subtitle}
                </Text>
              </View>
              <Switch
                value={values[a.id]}
                onValueChange={() => toggle(a.id)}
                trackColor={{ false: c.border, true: c.skyBlue }}
                thumbColor="#fff"
              />
            </View>
          ))}
        </Card>

        <View
          style={{
            marginTop: 20,
            borderRadius: 16,
            backgroundColor: "rgba(63,169,245,0.07)",
            borderWidth: 1,
            borderColor: "rgba(63,169,245,0.15)",
            padding: 16,
            flexDirection: "row",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <Feather name="info" size={16} color={c.skyBlue} style={{ marginTop: 1 }} />
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", lineHeight: 18, flex: 1 }}>
            Flight and gate alerts use your booked trip data. Make sure to complete a booking so we know what to watch.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
