import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  COMMUNITY_POSTS,
  DESTINATIONS,
  POST_COMMENTS,
  PostComment,
} from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

const TYPE_CONFIG = {
  experience: { label: "Experience", color: "#3FA9F5" },
  tip: { label: "Local tip", color: "#7FD1B9" },
  review: { label: "Review", color: "#FF9466" },
  question: { label: "Question", color: "#FF6B6B" },
};

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { likedPosts, savedPosts, toggleLikePost, toggleSavePost } = useApp();
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState<PostComment[]>([]);

  const post = COMMUNITY_POSTS.find((p) => p.id === id);
  if (!post) return null;

  const dest = DESTINATIONS.find((d) => d.id === post.destinationId) ?? DESTINATIONS[0];
  const comments = [...(POST_COMMENTS[post.id] ?? []), ...localComments];
  const isLiked = likedPosts.includes(post.id);
  const isSaved = savedPosts.includes(post.id);
  const tc = TYPE_CONFIG[post.type];

  const handleComment = () => {
    const trimmed = comment.trim();
    if (!trimmed) return;
    setLocalComments((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        authorName: "You",
        authorInitials: "ME",
        authorGradient: ["#0A2540", "#3FA9F5"],
        text: trimmed,
        timeAgo: "just now",
        likes: 0,
      },
    ]);
    setComment("");
  };

  const bottomPad = Platform.OS === "web" ? 24 : insets.bottom + 16;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Hero image */}
          <View style={{ height: 340, position: "relative" }}>
            <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            <LinearGradient
              colors={["rgba(0,0,0,0.35)", "transparent"]}
              style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%" }}
            />
            <LinearGradient
              colors={["transparent", "rgba(10,37,64,0.55)"]}
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%" }}
            />

            {/* Back button */}
            <Pressable
              onPress={() => router.back()}
              hitSlop={12}
              style={({ pressed }) => ({
                position: "absolute",
                top: Platform.OS === "web" ? 67 : insets.top + 12,
                left: 18,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.18)",
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Feather name="arrow-left" size={20} color="#fff" />
            </Pressable>

            {/* Destination label */}
            <View style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.4 }}>
                {post.country.toUpperCase()}
              </Text>
              <Text style={{ color: "#fff", fontSize: 26, fontFamily: "Inter_700Bold", letterSpacing: -0.5, marginTop: 2 }}>
                {post.destination}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: "#fff" }}>
            {/* Author + meta */}
            <View style={{ paddingHorizontal: 18, paddingTop: 18, paddingBottom: 16, flexDirection: "row", alignItems: "center", gap: 12 }}>
              <LinearGradient
                colors={post.authorGradient}
                style={{ width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "#fff", fontSize: 13, fontFamily: "Inter_700Bold" }}>
                  {post.authorInitials}
                </Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#0A2540", fontSize: 15, fontFamily: "Inter_700Bold" }}>{post.authorName}</Text>
                <Text style={{ color: "#64748B", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
                  {post.authorPersona} · {post.timeAgo} ago
                </Text>
              </View>

              {/* Type badge */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingHorizontal: 11,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: tc.color + "18",
                }}
              >
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tc.color }} />
                <Text style={{ color: tc.color, fontSize: 11, fontFamily: "Inter_700Bold" }}>{tc.label}</Text>
              </View>
            </View>

            {/* Full caption */}
            <View style={{ paddingHorizontal: 18, paddingBottom: 16 }}>
              <Text style={{ color: "#0A2540", fontSize: 15, fontFamily: "Inter_400Regular", lineHeight: 24 }}>
                {post.caption}
              </Text>

              {/* Rating if review */}
              {post.rating ? (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 }}>
                  <Text style={{ color: "#FF9466", fontSize: 18 }}>{"★".repeat(post.rating)}{"☆".repeat(5 - post.rating)}</Text>
                  <Text style={{ color: "#64748B", fontSize: 12, fontFamily: "Inter_500Medium" }}>{post.rating}/5</Text>
                </View>
              ) : null}

              {/* Tags */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
                {post.tags.map((tag) => (
                  <Text key={tag} style={{ color: "#3FA9F5", fontSize: 13, fontFamily: "Inter_500Medium" }}>{tag}</Text>
                ))}
              </View>
            </View>

            {/* Action bar */}
            <View
              style={{
                flexDirection: "row",
                borderTopWidth: 1,
                borderTopColor: "#E2E8F0",
                borderBottomWidth: 1,
                borderBottomColor: "#E2E8F0",
                paddingVertical: 13,
                paddingHorizontal: 18,
                gap: 24,
              }}
            >
              <Pressable
                onPress={() => toggleLikePost(post.id)}
                style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 7, opacity: pressed ? 0.7 : 1 })}
              >
                <Feather name="heart" size={22} color={isLiked ? "#FF6B6B" : "#94A3B8"} />
                <Text style={{ color: isLiked ? "#FF6B6B" : "#64748B", fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                  {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
                </Text>
              </Pressable>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Feather name="message-circle" size={22} color="#94A3B8" />
                <Text style={{ color: "#64748B", fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                  {comments.length}
                </Text>
              </View>

              <Pressable
                onPress={() => toggleSavePost(post.id)}
                style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 7, opacity: pressed ? 0.7 : 1 })}
              >
                <Feather name="bookmark" size={22} color={isSaved ? "#3FA9F5" : "#94A3B8"} />
                <Text style={{ color: isSaved ? "#3FA9F5" : "#64748B", fontSize: 14, fontFamily: "Inter_600SemiBold" }}>
                  {(post.saves + (isSaved ? 1 : 0)).toLocaleString()}
                </Text>
              </Pressable>

              <View style={{ flex: 1 }} />

              <Pressable
                onPress={() => router.push({ pathname: "/generate", params: { destinationId: post.destinationId } } as any)}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: "#0A2540",
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Feather name="zap" size={13} color="#3FA9F5" />
                <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Inter_700Bold" }}>Plan this trip</Text>
              </Pressable>
            </View>

            {/* Comments */}
            <View style={{ paddingHorizontal: 18, paddingTop: 20, paddingBottom: 12 }}>
              <Text style={{ color: "#0A2540", fontSize: 14, fontFamily: "Inter_700Bold", marginBottom: 18 }}>
                {comments.length} comments
              </Text>
              <View style={{ gap: 20 }}>
                {comments.map((c) => (
                  <CommentRow key={c.id} comment={c} />
                ))}
              </View>
            </View>

            <View style={{ height: bottomPad + 80 }} />
          </View>
        </ScrollView>

        {/* Comment input */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: bottomPad,
            borderTopWidth: 1,
            borderTopColor: "#E2E8F0",
            backgroundColor: "#fff",
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <LinearGradient
            colors={["#0A2540", "#3FA9F5"]}
            style={{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "#fff", fontSize: 10, fontFamily: "Inter_700Bold" }}>ME</Text>
          </LinearGradient>
          <View
            style={{
              flex: 1,
              backgroundColor: "#F0F4F8",
              borderRadius: 22,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "#E2E8F0",
            }}
          >
            <TextInput
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment…"
              placeholderTextColor="#94A3B8"
              multiline
              style={{
                fontSize: 14,
                fontFamily: "Inter_400Regular",
                color: "#0A2540",
                maxHeight: 80,
              }}
            />
          </View>
          <Pressable
            onPress={handleComment}
            disabled={comment.trim().length === 0}
            style={({ pressed }) => ({
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: comment.trim().length > 0 ? "#0A2540" : "#E2E8F0",
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Feather name="send" size={16} color={comment.trim().length > 0 ? "#fff" : "#94A3B8"} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function CommentRow({ comment }: { comment: PostComment }) {
  const [liked, setLiked] = useState(false);

  return (
    <View style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
      <LinearGradient
        colors={comment.authorGradient}
        style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", flexShrink: 0 }}
      >
        <Text style={{ color: "#fff", fontSize: 10, fontFamily: "Inter_700Bold" }}>{comment.authorInitials}</Text>
      </LinearGradient>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#F0F4F8",
            borderRadius: 16,
            borderTopLeftRadius: 4,
            paddingHorizontal: 14,
            paddingVertical: 10,
          }}
        >
          <Text style={{ color: "#0A2540", fontSize: 13, fontFamily: "Inter_700Bold", marginBottom: 4 }}>
            {comment.authorName}
          </Text>
          <Text style={{ color: "#334155", fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19 }}>
            {comment.text}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16, marginTop: 6, paddingHorizontal: 4 }}>
          <Text style={{ color: "#94A3B8", fontSize: 11, fontFamily: "Inter_400Regular" }}>{comment.timeAgo}</Text>
          <Pressable
            onPress={() => setLiked((l) => !l)}
            style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 4, opacity: pressed ? 0.7 : 1 })}
          >
            <Feather name="heart" size={12} color={liked ? "#FF6B6B" : "#94A3B8"} />
            <Text style={{ color: liked ? "#FF6B6B" : "#94A3B8", fontSize: 11, fontFamily: "Inter_600SemiBold" }}>
              {comment.likes + (liked ? 1 : 0)}
            </Text>
          </Pressable>
          <Pressable style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
            <Text style={{ color: "#94A3B8", fontSize: 11, fontFamily: "Inter_600SemiBold" }}>Reply</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
