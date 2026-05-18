import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui";
import { useColors } from "@/hooks/useColors";

function useCountdown(startDate: string) {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const parseTarget = () => {
      try {
        const now = new Date();
        // Try direct parse first
        const d = new Date(startDate);
        if (!isNaN(d.getTime())) return d;
        // Fallback: 34 days from now
        const fb = new Date(now);
        fb.setDate(fb.getDate() + 34);
        return fb;
      } catch {
        const fb = new Date();
        fb.setDate(fb.getDate() + 34);
        return fb;
      }
    };
    const target = parseTarget();
    const tick = () => {
      const now = new Date();
      const ms = target.getTime() - now.getTime();
      if (ms <= 0) { setDiff({ days: 0, hours: 0, minutes: 0 }); return; }
      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      const minutes = Math.floor((ms % 3600000) / 60000);
      setDiff({ days, hours, minutes });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [startDate]);

  return diff;
}

export default function Confirmed() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    airline: string; from: string; to: string; depart: string; arrive: string;
    cabin: string; stops: string;
    hotelName: string; hotelBadge: string; hotelNights: string;
    total: string; pointsEarned: string;
    destination: string; country: string; startDate: string; endDate: string;
  }>();

  const countdown = useCountdown(params.startDate ?? "");
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 16;

  return (
    <View style={{ flex: 1, backgroundColor: "#F7F9FC" }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform.OS === "web" ? 56 : insets.top + 16,
          paddingBottom: bottomPad + 100,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Success badge */}
        <View style={{ alignItems: "center", marginBottom: 32 }}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <LinearGradient
              colors={["#7FD1B9", "#3FA9F5"]}
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <Feather name="check" size={40} color="#fff" />
            </LinearGradient>
          </Animated.View>
          <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
            <Text style={{ color: "#0A2540", fontSize: 28, fontFamily: "Inter_700Bold", letterSpacing: -0.6 }}>
              You're going.
            </Text>
            <Text style={{ color: "#5A7A95", fontSize: 14, fontFamily: "Inter_400Regular", marginTop: 6, textAlign: "center", lineHeight: 21 }}>
              {params.destination}, {params.country} · {params.startDate}
            </Text>
          </Animated.View>
        </View>

        {/* Countdown */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <LinearGradient
            colors={["#0A2540", "#163A5F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 22, padding: 20, marginBottom: 16 }}
          >
            <Text style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5, marginBottom: 14 }}>
              DEPARTURE COUNTDOWN
            </Text>
            <View style={{ flexDirection: "row", gap: 0 }}>
              {[
                { value: countdown.days, label: "DAYS" },
                { value: countdown.hours, label: "HRS" },
                { value: countdown.minutes, label: "MIN" },
              ].map((item, i) => (
                <View key={item.label} style={{ flex: 1, alignItems: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 38, fontFamily: "Inter_700Bold", letterSpacing: -1 }}>
                    {String(item.value).padStart(2, "0")}
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.45)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2, marginTop: 2 }}>
                    {item.label}
                  </Text>
                  {i < 2 ? (
                    <Text style={{ position: "absolute", right: 0, top: 6, color: "rgba(255,255,255,0.25)", fontSize: 28, fontFamily: "Inter_700Bold" }}>:</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Boarding pass */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 22,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "#E5EBF1",
              marginBottom: 16,
              shadowColor: "#0A2540",
              shadowOpacity: 0.06,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 16,
              elevation: 3,
            }}
          >
            {/* Pass header */}
            <LinearGradient
              colors={["#0A2540", "#1A3F6F"]}
              style={{ padding: 18, paddingBottom: 20 }}
            >
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                BOARDING PASS · {params.cabin?.toUpperCase()}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12, gap: 0 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "#fff", fontSize: 36, fontFamily: "Inter_700Bold", letterSpacing: -1 }}>{params.from}</Text>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Inter_500Medium", marginTop: 2 }}>{params.depart}</Text>
                </View>
                <View style={{ alignItems: "center", paddingHorizontal: 10 }}>
                  <Feather name="arrow-right" size={20} color="rgba(255,255,255,0.3)" />
                  <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "Inter_500Medium", marginTop: 4 }}>
                    {params.stops}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={{ color: "#fff", fontSize: 36, fontFamily: "Inter_700Bold", letterSpacing: -1 }}>{params.to}</Text>
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "Inter_500Medium", marginTop: 2 }}>{params.arrive}</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Dashed tear line */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#F7F9FC", marginLeft: -10 }} />
              <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: "#E5EBF1", borderStyle: "dashed" }} />
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "#F7F9FC", marginRight: -10 }} />
            </View>

            {/* Pass footer */}
            <View style={{ padding: 18, flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ color: "#5A7A95", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>AIRLINE</Text>
                <Text style={{ color: "#0A2540", fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 3 }}>{params.airline}</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "#5A7A95", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>DATE</Text>
                <Text style={{ color: "#0A2540", fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 3 }}>{params.startDate}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: "#5A7A95", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>SEAT</Text>
                <Text style={{ color: "#0A2540", fontSize: 15, fontFamily: "Inter_700Bold", marginTop: 3 }}>4A</Text>
              </View>
            </View>
          </View>

          {/* Hotel confirmation */}
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 22,
              borderWidth: 1,
              borderColor: "#E5EBF1",
              padding: 18,
              marginBottom: 16,
              shadowColor: "#0A2540",
              shadowOpacity: 0.04,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              elevation: 2,
            }}
          >
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
                <Feather name="home" size={22} color="#3FA9F5" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#5A7A95", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>
                  HOTEL CONFIRMATION
                </Text>
                <Text style={{ color: "#0A2540", fontSize: 16, fontFamily: "Inter_700Bold", marginTop: 3 }}>
                  {params.hotelName}
                </Text>
                <Text style={{ color: "#5A7A95", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
                  {params.hotelBadge} · {params.hotelNights} nights · {params.startDate} – {params.endDate}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#E5F5EE",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              >
                <Text style={{ color: "#3F9E80", fontSize: 11, fontFamily: "Inter_700Bold" }}>Confirmed</Text>
              </View>
            </View>
          </View>

          {/* Points earned */}
          <LinearGradient
            colors={["#FFF5E9", "#FFF0E0"]}
            style={{
              borderRadius: 16,
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              borderWidth: 1,
              borderColor: "#FFE0B2",
              marginBottom: 8,
            }}
          >
            <Feather name="award" size={22} color="#D4AF7A" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#0A2540", fontSize: 14, fontFamily: "Inter_700Bold" }}>
                +{params.pointsEarned} points earned
              </Text>
              <Text style={{ color: "#5A7A95", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                Worth ${Math.floor(Number(params.pointsEarned) / 100)} off your next trip
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>

      {/* Sticky footer */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(247,249,252,0.97)",
          borderTopWidth: 1,
          borderTopColor: "#E5EBF1",
          paddingHorizontal: 20,
          paddingTop: 14,
          paddingBottom: bottomPad + 8,
          gap: 10,
        }}
      >
        <Button
          label="Open my wallet"
          icon="credit-card"
          onPress={() => { router.dismissAll(); router.push("/(tabs)/wallet"); }}
          fullWidth
          size="lg"
        />
        <Button
          label="Back to home"
          variant="ghost"
          onPress={() => { router.dismissAll(); router.push("/"); }}
          fullWidth
        />
      </View>
    </View>
  );
}
