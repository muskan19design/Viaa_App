import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

type Currency = { code: string; name: string; symbol: string; flag: string };

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "AED", name: "UAE Dirham", symbol: "AED", flag: "🇦🇪" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "MAD", flag: "🇲🇦" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
];

export default function CurrencyScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState("USD");
  const [q, setQ] = useState("");

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 16;

  const filtered = CURRENCIES.filter(
    (cur) =>
      q.length === 0 ||
      cur.code.toLowerCase().includes(q.toLowerCase()) ||
      cur.name.toLowerCase().includes(q.toLowerCase())
  );

  const onSelect = (code: string) => {
    setSelected(code);
    setTimeout(() => router.back(), 220);
  };

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
            Currency
          </Text>
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
            Prices shown in your chosen currency
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 14 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: c.muted,
            borderRadius: 14,
            paddingHorizontal: 12,
            paddingVertical: 11,
            gap: 8,
          }}
        >
          <Feather name="search" size={16} color={c.mutedForeground} />
          <TextInput
            placeholder="Search currency"
            placeholderTextColor={c.mutedForeground}
            value={q}
            onChangeText={setQ}
            style={{ flex: 1, color: c.foreground, fontSize: 14, fontFamily: "Inter_500Medium", padding: 0 }}
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomPad + 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginHorizontal: 20,
            borderRadius: 20,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: c.border,
            backgroundColor: c.card,
          }}
        >
          {filtered.map((cur, i) => {
            const isSelected = cur.code === selected;
            return (
              <Pressable
                key={cur.code}
                onPress={() => onSelect(cur.code)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 14,
                  paddingHorizontal: 18,
                  paddingVertical: 15,
                  borderBottomWidth: i < filtered.length - 1 ? 1 : 0,
                  borderBottomColor: c.border,
                  backgroundColor: isSelected ? "rgba(63,169,245,0.06)" : pressed ? c.muted : "transparent",
                })}
              >
                <Text style={{ fontSize: 26 }}>{cur.flag}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: c.foreground, fontSize: 14, fontFamily: isSelected ? "Inter_700Bold" : "Inter_600SemiBold" }}>
                    {cur.code}
                  </Text>
                  <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                    {cur.name}
                  </Text>
                </View>
                <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_500Medium" }}>
                  {cur.symbol}
                </Text>
                {isSelected ? (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      backgroundColor: c.skyBlue,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="check" size={13} color="#fff" />
                  </View>
                ) : (
                  <View style={{ width: 22, height: 22 }} />
                )}
              </Pressable>
            );
          })}
          {filtered.length === 0 ? (
            <View style={{ padding: 32, alignItems: "center" }}>
              <Text style={{ color: c.mutedForeground, fontSize: 14, fontFamily: "Inter_500Medium" }}>
                No match for "{q}"
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
