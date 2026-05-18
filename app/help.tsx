import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, SectionHeader } from "@/components/ui";
import { useColors } from "@/hooks/useColors";

type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: "How does the AI build my itinerary?",
    a: "Viaa's AI combines your persona (travel style, pace, budget, interests) with curated destination data to create a day-by-day plan that feels hand-crafted. You can regenerate or tweak individual days at any time.",
  },
  {
    q: "Are the community tips really anonymous?",
    a: "Yes. Viaa never stores your name, email, or any identifying info alongside your tips. Only your persona profile is used for similarity matching — and even that stays on your device.",
  },
  {
    q: "How do I earn and redeem points?",
    a: "You earn 500 points every time you complete a booking through Viaa. Points can be redeemed as a discount on your next trip (100 points = $1), or gifted to any traveler via their email.",
  },
  {
    q: "What is the 1% Club?",
    a: "The 1% Club is Viaa's invite-only premium tier, designed for travelers who want concierge-level service, curated luxury itineraries, private event access, and 24/7 support. Access is granted by invitation or waitlist.",
  },
  {
    q: "Can I change my travel persona?",
    a: "Absolutely. Go to Profile and tap 'Rebuild my persona'. The quick 5-step flow will refresh your matches and recommendations across the app.",
  },
  {
    q: "How do local guides get verified?",
    a: "Every guide goes through a manual review — we check their local knowledge, reviews from previous travelers, and fluency in at least one of our supported languages before they appear on the marketplace.",
  },
];

const CONTACT_OPTIONS = [
  { icon: "message-circle" as const, label: "Chat with us", subtitle: "Usually responds in a few minutes", action: () => {} },
  { icon: "mail" as const, label: "Send an email", subtitle: "hello@viaa.travel", action: () => Linking.openURL("mailto:hello@viaa.travel").catch(() => {}) },
  { icon: "twitter" as const, label: "Find us on X", subtitle: "@viaatravel", action: () => {} },
];

export default function Help() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState<number | null>(null);

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 16;

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
            Help & support
          </Text>
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
            We're here whenever you need us
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingTop: 24, paddingBottom: bottomPad + 24, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <LinearGradient
          colors={[c.deepOcean, "#163A5F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 22, padding: 22, marginBottom: 28 }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: "rgba(255,255,255,0.12)",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.18)",
              marginBottom: 14,
            }}
          >
            <Feather name="life-buoy" size={22} color="#fff" />
          </View>
          <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Inter_700Bold", letterSpacing: -0.4 }}>
            How can we help?
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 6, lineHeight: 19 }}>
            Browse common questions below or reach out — we'll get back to you fast.
          </Text>
        </LinearGradient>

        {/* Contact */}
        <SectionHeader title="Contact us" />
        <Card padded={false}>
          {CONTACT_OPTIONS.map((opt, i) => (
            <Pressable
              key={opt.label}
              onPress={opt.action}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                paddingHorizontal: 18,
                paddingVertical: 15,
                borderBottomWidth: i < CONTACT_OPTIONS.length - 1 ? 1 : 0,
                borderBottomColor: c.border,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: c.muted,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name={opt.icon} size={16} color={c.foreground} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                  {opt.label}
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                  {opt.subtitle}
                </Text>
              </View>
              <Feather name="chevron-right" size={18} color={c.mutedForeground} />
            </Pressable>
          ))}
        </Card>

        {/* FAQs */}
        <View style={{ marginTop: 28 }}>
          <SectionHeader title="Common questions" />
          <View style={{ gap: 10 }}>
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Pressable
                  key={i}
                  onPress={() => setOpen(isOpen ? null : i)}
                  style={({ pressed }) => ({
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: isOpen ? c.skyBlue : c.border,
                    backgroundColor: isOpen ? "rgba(63,169,245,0.05)" : c.card,
                    overflow: "hidden",
                    opacity: pressed ? 0.9 : 1,
                  })}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 18,
                      paddingVertical: 15,
                      gap: 12,
                    }}
                  >
                    <Text style={{ flex: 1, color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold", lineHeight: 20 }}>
                      {faq.q}
                    </Text>
                    <Feather
                      name={isOpen ? "chevron-up" : "chevron-down"}
                      size={18}
                      color={isOpen ? c.skyBlue : c.mutedForeground}
                    />
                  </View>
                  {isOpen ? (
                    <View style={{ paddingHorizontal: 18, paddingBottom: 16, paddingTop: 0 }}>
                      <View style={{ height: 1, backgroundColor: c.border, marginBottom: 14 }} />
                      <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 20 }}>
                        {faq.a}
                      </Text>
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>

        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular", textAlign: "center", marginTop: 32 }}>
          Viaa · Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}
