import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESTINATIONS } from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

type PostType = "experience" | "tip" | "review" | "question";

const POST_TYPES: { id: PostType; label: string; desc: string; icon: string; color: string }[] = [
  { id: "experience", label: "Experience", desc: "A story from your trip", icon: "star", color: "#3FA9F5" },
  { id: "tip", label: "Local tip", desc: "Something only locals know", icon: "map-pin", color: "#7FD1B9" },
  { id: "review", label: "Review", desc: "Rate a place or stay", icon: "thumbs-up", color: "#FF9466" },
  { id: "question", label: "Question", desc: "Ask the community", icon: "help-circle", color: "#FF6B6B" },
];

export default function Compose() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { addPoints } = useApp();

  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [postType, setPostType] = useState<PostType>("experience");
  const [caption, setCaption] = useState("");
  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState("");
  const [posting, setPosting] = useState(false);

  const topPad = Platform.OS === "web" ? 0 : insets.top;
  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom + 16;

  const selectedDestObj = DESTINATIONS.find((d) => d.id === selectedDest);
  const canPost = selectedDest !== null && caption.trim().length > 20;

  const handlePost = async () => {
    if (!canPost) return;
    setPosting(true);
    await new Promise((r) => setTimeout(r, 900));
    await addPoints(50);
    setPosting(false);
    router.back();
    setTimeout(() => {
      Alert.alert("Posted! 🎉", "Your experience is live in the community feed. You earned 50 points.", [{ text: "Nice" }]);
    }, 300);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: c.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View
        style={{
          paddingTop: topPad + 16,
          paddingHorizontal: 20,
          paddingBottom: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: c.border,
          backgroundColor: c.background,
        }}
      >
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Text style={{ color: c.mutedForeground, fontSize: 15, fontFamily: "Inter_500Medium" }}>Cancel</Text>
        </Pressable>
        <Text style={{ color: c.foreground, fontSize: 16, fontFamily: "Inter_700Bold" }}>Share experience</Text>
        <Pressable
          onPress={handlePost}
          disabled={!canPost || posting}
          style={({ pressed }) => ({
            paddingHorizontal: 18,
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: canPost ? c.deepOcean : c.muted,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text style={{ color: canPost ? "#fff" : c.mutedForeground, fontSize: 13, fontFamily: "Inter_700Bold" }}>
            {posting ? "Posting…" : "Post"}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: bottomPad + 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Points reward hint */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "rgba(63,169,245,0.08)",
            borderRadius: 14,
            padding: 14,
            borderWidth: 1,
            borderColor: "rgba(63,169,245,0.18)",
            marginBottom: 22,
          }}
        >
          <Feather name="award" size={16} color={c.skyBlue} />
          <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_500Medium", flex: 1 }}>
            Earn <Text style={{ color: c.skyBlue, fontFamily: "Inter_700Bold" }}>50 points</Text> for sharing your experience with the community
          </Text>
        </View>

        {/* Destination */}
        <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 12 }}>
          Where was this? <Text style={{ color: "#FF6B6B" }}>*</Text>
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingBottom: 4, marginBottom: 22 }}
        >
          {DESTINATIONS.map((dest) => {
            const active = selectedDest === dest.id;
            return (
              <Pressable
                key={dest.id}
                onPress={() => setSelectedDest(dest.id)}
                style={({ pressed }) => ({
                  width: 110,
                  borderRadius: 16,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: active ? c.skyBlue : "transparent",
                  opacity: pressed ? 0.9 : 1,
                })}
              >
                <View style={{ height: 80, position: "relative" }}>
                  <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                  <LinearGradient
                    colors={["transparent", "rgba(10,37,64,0.75)"]}
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "65%" }}
                  />
                  {active ? (
                    <View style={{ position: "absolute", top: 6, right: 6 }}>
                      <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: c.skyBlue, alignItems: "center", justifyContent: "center" }}>
                        <Feather name="check" size={12} color="#fff" />
                      </View>
                    </View>
                  ) : null}
                  <View style={{ position: "absolute", bottom: 8, left: 8 }}>
                    <Text style={{ color: "#fff", fontSize: 11, fontFamily: "Inter_700Bold" }}>{dest.name}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Post type */}
        <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 12 }}>
          What kind of post?
        </Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          {POST_TYPES.map((pt) => {
            const active = postType === pt.id;
            return (
              <Pressable
                key={pt.id}
                onPress={() => setPostType(pt.id)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 13,
                  paddingVertical: 9,
                  borderRadius: 999,
                  backgroundColor: active ? pt.color + "18" : c.muted,
                  borderWidth: 1,
                  borderColor: active ? pt.color : c.border,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Feather name={pt.icon as any} size={13} color={active ? pt.color : c.mutedForeground} />
                <Text style={{ color: active ? pt.color : c.foreground, fontSize: 12, fontFamily: active ? "Inter_700Bold" : "Inter_500Medium" }}>
                  {pt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Rating (if review) */}
        {postType === "review" ? (
          <View style={{ marginBottom: 22 }}>
            <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 12 }}>
              Overall rating
            </Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => setRating(star)} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                  <Text style={{ fontSize: 32, color: star <= rating ? "#FF9466" : "#CBD5E1" }}>★</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}

        {/* Caption */}
        <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 12 }}>
          Your story <Text style={{ color: "#FF6B6B" }}>*</Text>
          <Text style={{ color: c.mutedForeground, fontFamily: "Inter_400Regular" }}> (min. 20 chars)</Text>
        </Text>
        <View
          style={{
            backgroundColor: c.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: caption.length > 0 ? c.skyBlue : c.border,
            padding: 14,
            marginBottom: 22,
          }}
        >
          <TextInput
            value={caption}
            onChangeText={setCaption}
            placeholder={
              postType === "experience"
                ? "Tell us what made this trip unforgettable…"
                : postType === "tip"
                ? "Share something only locals know…"
                : postType === "review"
                ? "What did you love? What could be better?"
                : "Ask the community anything about this destination…"
            }
            placeholderTextColor={c.mutedForeground}
            multiline
            style={{
              fontSize: 14,
              fontFamily: "Inter_400Regular",
              color: c.foreground,
              minHeight: 120,
              textAlignVertical: "top",
              lineHeight: 22,
            }}
          />
          <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular", marginTop: 8, textAlign: "right" }}>
            {caption.length} chars
          </Text>
        </View>

        {/* Tags */}
        <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 12 }}>
          Tags <Text style={{ color: c.mutedForeground, fontFamily: "Inter_400Regular" }}>(optional)</Text>
        </Text>
        <View
          style={{
            backgroundColor: c.card,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: c.border,
            paddingHorizontal: 14,
            paddingVertical: 12,
            marginBottom: 8,
          }}
        >
          <TextInput
            value={tags}
            onChangeText={setTags}
            placeholder="#kyoto #sakura #earlyBird"
            placeholderTextColor={c.mutedForeground}
            style={{
              fontSize: 14,
              fontFamily: "Inter_500Medium",
              color: c.skyBlue,
            }}
          />
        </View>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular" }}>
          Separate tags with spaces. They help others discover your post.
        </Text>

        {/* Selected destination preview */}
        {selectedDestObj ? (
          <View style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", height: 120, position: "relative" }}>
            <Image source={selectedDestObj.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            <LinearGradient
              colors={["transparent", "rgba(10,37,64,0.7)"]}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%" }}
            />
            <View style={{ position: "absolute", bottom: 14, left: 16 }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3 }}>
                {selectedDestObj.country.toUpperCase()}
              </Text>
              <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold", letterSpacing: -0.3, marginTop: 2 }}>
                {selectedDestObj.name}
              </Text>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
