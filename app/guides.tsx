import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Card, Pill } from "@/components/ui";
import { GUIDES } from "@/constants/data";
import { useColors } from "@/hooks/useColors";

const CITIES = ["All", ...Array.from(new Set(GUIDES.map((g) => g.city)))];

export default function Guides() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const [city, setCity] = useState("All");
  const [bookedId, setBookedId] = useState<string | null>(null);

  const list = GUIDES.filter((g) => city === "All" || g.city === city);

  const onBook = (id: string, name: string) => {
    if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    setBookedId(id);
    if (Platform.OS !== "web") {
      Alert.alert("Guide requested", `We'll confirm ${name} within 2 hours and add the booking to your wallet.`);
    }
  };

  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 24;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: bottomPad }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 8 }}>
          <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_500Medium" }}>
            {GUIDES.length} verified guides · curated, never agency
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, marginTop: 16 }}>
          {CITIES.map((v) => {
            const active = v === city;
            return (
              <Pressable
                key={v}
                onPress={() => setCity(v)}
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
                <Text style={{ color: active ? "#fff" : c.foreground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>{v}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={{ paddingHorizontal: 20, marginTop: 18, gap: 12 }}>
          {list.map((g) => (
            <Card key={g.id}>
              <View style={{ flexDirection: "row", gap: 14 }}>
                <LinearGradient
                  colors={[c.deepOcean, c.skyBlue]}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold" }}>{g.initials}</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={{ color: c.foreground, fontSize: 16, fontFamily: "Inter_700Bold" }}>{g.name}</Text>
                    <Pill label="Verified" tone="aqua" icon="check" />
                  </View>
                  <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 4 }}>{g.city} · {g.speciality}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      <Feather name="star" size={12} color={c.coral} />
                      <Text style={{ color: c.foreground, fontSize: 12, fontFamily: "Inter_600SemiBold" }}>{g.rating}</Text>
                      <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular" }}>({g.reviews})</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 16, paddingTop: 14, borderTopWidth: 1, borderTopColor: c.border, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View>
                  <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.2 }}>FROM</Text>
                  <Text style={{ color: c.foreground, fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 2 }}>${g.pricePerDay}<Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}> / day</Text></Text>
                </View>
                <Button
                  label={bookedId === g.id ? "Requested" : "Book"}
                  icon={bookedId === g.id ? "check" : "calendar"}
                  size="sm"
                  onPress={() => onBook(g.id, g.name)}
                  variant={bookedId === g.id ? "secondary" : "primary"}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
