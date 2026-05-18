import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components/ui";
import {
  PERSONA_DESCRIPTIONS,
  PERSONA_QUESTIONS,
  PERSONA_TITLES,
} from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

export default function Onboarding() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { savePersona } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const totalSteps = PERSONA_QUESTIONS.length;
  const isSummary = step === totalSteps;
  const current = PERSONA_QUESTIONS[step];

  const personaTitle = useMemo(() => {
    const style = (answers["style"] as string) ?? "balanced";
    return PERSONA_TITLES[style] ?? "Curious Traveler";
  }, [answers]);

  const personaDesc = useMemo(() => {
    const style = (answers["style"] as string) ?? "balanced";
    return PERSONA_DESCRIPTIONS[style] ?? "";
  }, [answers]);

  const select = (qid: string, opt: string, multi?: boolean) => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
    setAnswers((prev) => {
      if (multi) {
        const cur = (prev[qid] as string[]) ?? [];
        const next = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
        return { ...prev, [qid]: next };
      }
      return { ...prev, [qid]: opt };
    });
  };

  const canAdvance = () => {
    if (!current) return true;
    const v = answers[current.id];
    if (current.multi) return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  };

  const onNext = () => {
    setStep((s) => s + 1);
  };

  const onFinish = async () => {
    await savePersona({
      style: (answers["style"] as string) ?? "balanced",
      pace: (answers["pace"] as string) ?? "balanced",
      budget: (answers["budget"] as string) ?? "comfort",
      interests: (answers["interests"] as string[]) ?? [],
      group: (answers["group"] as string) ?? "couple",
    });
    router.replace("/");
  };

  const onSkip = () => {
    if (Platform.OS !== "web") {
      Haptics.selectionAsync().catch(() => {});
    }
    router.replace("/");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top + 8;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom + 12;

  return (
    <View style={{ flex: 1, backgroundColor: "#FAF6EF" }}>
      {/* Top header: progress + skip */}
      <View
        style={{
          paddingTop: topPad + 8,
          paddingHorizontal: 22,
          paddingBottom: 12,
          backgroundColor: "#FAF6EF",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View style={{ flex: 1, flexDirection: "row", gap: 6 }}>
            {Array.from({ length: totalSteps + 1 }).map((_, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: i <= step ? c.skyBlue : "rgba(10,37,64,0.08)",
                }}
              />
            ))}
          </View>
          {!isSummary ? (
            <Pressable
              onPress={onSkip}
              hitSlop={10}
              style={({ pressed }) => ({
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                opacity: pressed ? 0.6 : 1,
              })}
            >
              <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>
                Skip
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: bottomPad + 120,
          paddingHorizontal: 22,
        }}
        showsVerticalScrollIndicator={false}
      >
        {!isSummary && current ? (
          <>
            <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5 }}>
              STEP {step + 1} OF {totalSteps}
            </Text>
            <Text style={{ color: c.deepOcean, fontSize: 28, fontFamily: "Inter_700Bold", marginTop: 10, letterSpacing: -0.6 }}>
              {current.title}
            </Text>
            <Text style={{ color: c.mutedForeground, fontSize: 15, fontFamily: "Inter_400Regular", marginTop: 8, lineHeight: 22 }}>
              {current.subtitle}
            </Text>

            {/* Visual grid of options */}
            <View
              style={{
                marginTop: 28,
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              {current.options.map((opt) => {
                const v = answers[current.id];
                const selected = current.multi
                  ? Array.isArray(v) && v.includes(opt.id)
                  : v === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    onPress={() => select(current.id, opt.id, current.multi)}
                    style={({ pressed }) => ({
                      width: "47.5%",
                      aspectRatio: 1,
                      borderRadius: 22,
                      borderWidth: 1.5,
                      borderColor: selected ? c.skyBlue : "rgba(10,37,64,0.08)",
                      backgroundColor: selected ? "rgba(63,169,245,0.08)" : "#FFFFFF",
                      padding: 16,
                      justifyContent: "space-between",
                      opacity: pressed ? 0.85 : 1,
                      shadowColor: selected ? c.skyBlue : "#0A2540",
                      shadowOpacity: selected ? 0.12 : 0.04,
                      shadowOffset: { width: 0, height: 4 },
                      shadowRadius: 12,
                      elevation: selected ? 3 : 1,
                    })}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <View
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          backgroundColor: selected ? c.skyBlue : "#F2F5F9",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ fontSize: 26 }}>{opt.emoji}</Text>
                      </View>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          borderWidth: 1.5,
                          borderColor: selected ? c.skyBlue : "rgba(10,37,64,0.15)",
                          backgroundColor: selected ? c.skyBlue : "transparent",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selected ? <Feather name="check" size={13} color="#fff" /> : null}
                      </View>
                    </View>
                    <Text
                      style={{
                        color: c.deepOcean,
                        fontSize: 16,
                        fontFamily: "Inter_700Bold",
                        letterSpacing: -0.2,
                      }}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        ) : (
          <>
            <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.5 }}>
              YOUR TRAVEL PERSONA
            </Text>
            <View
              style={{
                marginTop: 18,
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <LinearGradient
                colors={[c.deepOcean, "#163A5F", c.skyBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 26 }}
              >
                <View
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "rgba(255,255,255,0.14)",
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255,255,255,0.18)",
                  }}
                >
                  <Feather name="globe" size={26} color="#fff" />
                </View>
                <Text style={{ color: "#fff", fontSize: 28, fontFamily: "Inter_700Bold", marginTop: 18, letterSpacing: -0.6 }}>
                  {personaTitle}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.82)", fontSize: 15, fontFamily: "Inter_400Regular", marginTop: 10, lineHeight: 22 }}>
                  {personaDesc}
                </Text>

                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                  {((answers["interests"] as string[]) ?? []).map((tag) => (
                    <View
                      key={tag}
                      style={{
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 999,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        borderWidth: 1,
                        borderColor: "rgba(255,255,255,0.18)",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Inter_500Medium" }}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </LinearGradient>
            </View>

            <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_400Regular", marginTop: 22, lineHeight: 20 }}>
              We'll use this to plan trips that already feel like you. You can refine it any time from your profile.
            </Text>
          </>
        )}
      </ScrollView>

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 22,
          paddingTop: 16,
          paddingBottom: bottomPad + 12,
          backgroundColor: "rgba(250,246,239,0.96)",
          borderTopWidth: 1,
          borderTopColor: "rgba(10,37,64,0.06)",
          flexDirection: "row",
          gap: 12,
        }}
      >
        {step > 0 && !isSummary ? (
          <Pressable
            onPress={() => setStep((s) => Math.max(0, s - 1))}
            style={({ pressed }) => ({
              paddingHorizontal: 22,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "rgba(10,37,64,0.12)",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
              backgroundColor: "#FFFFFF",
            })}
          >
            <Feather name="arrow-left" size={18} color={c.deepOcean} />
          </Pressable>
        ) : null}
        {isSummary ? (
          <Button label="Begin" icon="arrow-right" onPress={onFinish} fullWidth style={{ flex: 1 }} />
        ) : (
          <Button
            label={step === totalSteps - 1 ? "See my persona" : "Continue"}
            icon="arrow-right"
            onPress={onNext}
            disabled={!canAdvance()}
            fullWidth
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
}
