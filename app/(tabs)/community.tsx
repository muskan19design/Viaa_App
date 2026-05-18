import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
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

import {
  COMMUNITY_POSTS,
  DESTINATIONS,
  TRENDING_TAGS,
  TRAVELER_PROFILES,
  CommunityPost,
  TravelerProfile,
} from "@/constants/data";
import { useApp } from "@/context/AppContext";
import { useColors } from "@/hooks/useColors";

type Tab = "feed" | "explore" | "connect";

const TYPE_CONFIG: Record<
  CommunityPost["type"],
  { label: string; color: string; bg: string }
> = {
  experience: { label: "Experience", color: "#3FA9F5", bg: "rgba(63,169,245,0.12)" },
  tip: { label: "Local tip", color: "#7FD1B9", bg: "rgba(127,209,185,0.12)" },
  review: { label: "Review", color: "#FF9466", bg: "rgba(255,148,102,0.12)" },
  question: { label: "Question", color: "#FF6B6B", bg: "rgba(255,107,107,0.12)" },
};

export default function Community() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("feed");
  const [search, setSearch] = useState("");

  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 84 + 24 : insets.bottom + 84;

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      {/* Fixed header */}
      <View
        style={{
          paddingTop: topPad,
          backgroundColor: c.background,
          borderBottomWidth: 1,
          borderBottomColor: c.border,
          zIndex: 10,
        }}
      >
        {/* Title row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 12,
          }}
        >
          <View>
            <Text style={{ color: c.foreground, fontSize: 24, fontFamily: "Inter_700Bold", letterSpacing: -0.5 }}>
              Community
            </Text>
            <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>
              Real travelers, real places, real stories
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/compose")}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <LinearGradient
              colors={[c.deepOcean, c.skyBlue]}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="edit-3" size={18} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>

        {/* Tab bar */}
        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingBottom: 0, gap: 0 }}>
          {(["feed", "explore", "connect"] as Tab[]).map((t) => {
            const labels: Record<Tab, string> = { feed: "Feed", explore: "Explore", connect: "Connect" };
            const active = tab === t;
            return (
              <Pressable
                key={t}
                onPress={() => setTab(t)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 11,
                  borderBottomWidth: 2,
                  borderBottomColor: active ? c.skyBlue : "transparent",
                }}
              >
                <Text
                  style={{
                    color: active ? c.skyBlue : c.mutedForeground,
                    fontSize: 13,
                    fontFamily: active ? "Inter_700Bold" : "Inter_500Medium",
                    letterSpacing: 0.1,
                  }}
                >
                  {labels[t]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
        key={tab}
      >
        {tab === "feed" && <FeedTab search={search} setSearch={setSearch} />}
        {tab === "explore" && <ExploreTab />}
        {tab === "connect" && <ConnectTab />}
      </ScrollView>
    </View>
  );
}

function FeedTab({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (s: string) => void;
}) {
  const c = useColors();
  const filtered = search.trim()
    ? COMMUNITY_POSTS.filter(
        (p) =>
          p.destination.toLowerCase().includes(search.toLowerCase()) ||
          p.caption.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      )
    : COMMUNITY_POSTS;

  return (
    <View style={{ paddingTop: 14 }}>
      {/* Search */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F0F4F8",
          borderRadius: 14,
          paddingHorizontal: 14,
          gap: 10,
          borderWidth: 1,
          borderColor: "#E2E8F0",
        }}
      >
        <Feather name="search" size={16} color="#94A3B8" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search destinations, tips…"
          placeholderTextColor="#94A3B8"
          style={{
            flex: 1,
            paddingVertical: 11,
            fontSize: 14,
            fontFamily: "Inter_400Regular",
            color: "#0A2540",
          }}
        />
        {search.length > 0 ? (
          <Pressable onPress={() => setSearch("")}>
            <Feather name="x" size={16} color="#94A3B8" />
          </Pressable>
        ) : null}
      </View>

      {filtered.length === 0 ? (
        <View style={{ alignItems: "center", paddingVertical: 48 }}>
          <Feather name="search" size={32} color="#CBD5E1" />
          <Text style={{ color: "#94A3B8", fontSize: 14, fontFamily: "Inter_500Medium", marginTop: 12 }}>
            No posts found for "{search}"
          </Text>
        </View>
      ) : (
        <View style={{ gap: 1 }}>
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      )}
    </View>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const c = useColors();
  const { likedPosts, savedPosts, toggleLikePost, toggleSavePost } = useApp();
  const [expanded, setExpanded] = useState(false);
  const dest = DESTINATIONS.find((d) => d.id === post.destinationId) ?? DESTINATIONS[0];
  const isLiked = likedPosts.includes(post.id);
  const isSaved = savedPosts.includes(post.id);
  const tc = TYPE_CONFIG[post.type];
  const captionLimit = 120;
  const shortCaption = post.caption.length > captionLimit && !expanded
    ? post.caption.slice(0, captionLimit) + "…"
    : post.caption;

  return (
    <View
      style={{
        backgroundColor: c.card,
        borderBottomWidth: 1,
        borderBottomColor: c.border,
        marginBottom: 0,
      }}
    >
      {/* Author row */}
      <Pressable
        onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } } as any)}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          gap: 11,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <LinearGradient
          colors={post.authorGradient}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 13, fontFamily: "Inter_700Bold" }}>
            {post.authorInitials}
          </Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_700Bold" }}>
            {post.authorName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginTop: 1 }}>
            <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular" }}>
              {post.authorPersona}
            </Text>
            <Text style={{ color: c.border, fontSize: 11 }}>·</Text>
            <Feather name="map-pin" size={10} color={c.mutedForeground} />
            <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular" }}>
              {post.destination}
            </Text>
          </View>
        </View>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_400Regular" }}>
          {post.timeAgo}
        </Text>
      </Pressable>

      {/* Image */}
      <Pressable
        onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } } as any)}
      >
        <View style={{ height: 260, position: "relative" }}>
          <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          <LinearGradient
            colors={["transparent", "rgba(10,37,64,0.45)"]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%" }}
          />
          {/* Type badge */}
          <View style={{ position: "absolute", bottom: 12, left: 14 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.92)",
              }}
            >
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: tc.color }} />
              <Text style={{ color: "#0A2540", fontSize: 11, fontFamily: "Inter_600SemiBold" }}>
                {tc.label}
              </Text>
              {post.rating ? (
                <>
                  <Text style={{ color: "#94A3B8", fontSize: 10 }}>·</Text>
                  <Text style={{ color: "#FF9466", fontSize: 11, fontFamily: "Inter_700Bold" }}>
                    {"★".repeat(post.rating)}
                  </Text>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>

      {/* Actions row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingTop: 13,
          paddingBottom: 4,
          gap: 20,
        }}
      >
        <Pressable
          onPress={() => toggleLikePost(post.id)}
          style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, opacity: pressed ? 0.7 : 1 })}
        >
          <Feather
            name={isLiked ? "heart" : "heart"}
            size={21}
            color={isLiked ? "#FF6B6B" : c.mutedForeground}
          />
          <Text
            style={{
              color: isLiked ? "#FF6B6B" : c.mutedForeground,
              fontSize: 13,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            {(post.likes + (isLiked ? 1 : 0)).toLocaleString()}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } } as any)}
          style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, opacity: pressed ? 0.7 : 1 })}
        >
          <Feather name="message-circle" size={21} color={c.mutedForeground} />
          <Text style={{ color: c.mutedForeground, fontSize: 13, fontFamily: "Inter_600SemiBold" }}>
            {post.commentCount}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => toggleSavePost(post.id)}
          style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, opacity: pressed ? 0.7 : 1 })}
        >
          <Feather
            name="bookmark"
            size={21}
            color={isSaved ? c.skyBlue : c.mutedForeground}
          />
          <Text
            style={{
              color: isSaved ? c.skyBlue : c.mutedForeground,
              fontSize: 13,
              fontFamily: "Inter_600SemiBold",
            }}
          >
            {(post.saves + (isSaved ? 1 : 0)).toLocaleString()}
          </Text>
        </Pressable>

        <View style={{ flex: 1 }} />

        <Pressable
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
          onPress={() => router.push({ pathname: "/generate", params: { destinationId: post.destinationId } } as any)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: c.border,
            }}
          >
            <Feather name="zap" size={12} color={c.skyBlue} />
            <Text style={{ color: c.foreground, fontSize: 11, fontFamily: "Inter_600SemiBold" }}>
              Plan trip
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Caption */}
      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14 }}>
        <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_400Regular", lineHeight: 21 }}>
          <Text style={{ fontFamily: "Inter_700Bold" }}>{post.authorName.split(" ")[0]} </Text>
          {shortCaption}
          {post.caption.length > captionLimit && !expanded ? (
            <Text
              onPress={() => setExpanded(true)}
              style={{ color: c.mutedForeground, fontFamily: "Inter_600SemiBold" }}
            >
              {" "}more
            </Text>
          ) : null}
        </Text>

        {/* Tags */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {post.tags.map((tag) => (
            <Text key={tag} style={{ color: c.skyBlue, fontSize: 12, fontFamily: "Inter_500Medium" }}>
              {tag}
            </Text>
          ))}
        </View>

        {/* View comments link */}
        <Pressable
          onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } } as any)}
          style={({ pressed }) => ({ marginTop: 8, opacity: pressed ? 0.7 : 1, alignSelf: "flex-start" })}
        >
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_500Medium" }}>
            View all {post.commentCount} comments
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function ExploreTab() {
  const c = useColors();

  const topPosts = [...COMMUNITY_POSTS].sort((a, b) => b.likes - a.likes).slice(0, 6);

  return (
    <View style={{ paddingTop: 20 }}>
      {/* Trending tags */}
      <View style={{ paddingHorizontal: 20, marginBottom: 22 }}>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3, marginBottom: 12 }}>
          TRENDING NOW
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {TRENDING_TAGS.map((tag) => (
            <View
              key={tag}
              style={{
                paddingHorizontal: 13,
                paddingVertical: 7,
                borderRadius: 999,
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
              }}
            >
              <Text style={{ color: c.foreground, fontSize: 12, fontFamily: "Inter_500Medium" }}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top posts grid */}
      <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3, marginBottom: 12 }}>
          MOST LOVED THIS WEEK
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 3 }}>
          {topPosts.map((post, idx) => {
            const dest = DESTINATIONS.find((d) => d.id === post.destinationId) ?? DESTINATIONS[0];
            const isWide = idx === 0;
            return (
              <Pressable
                key={post.id}
                onPress={() => router.push({ pathname: "/post/[id]", params: { id: post.id } } as any)}
                style={({ pressed }) => ({
                  width: isWide ? "100%" : "49%",
                  height: isWide ? 220 : 150,
                  borderRadius: 16,
                  overflow: "hidden",
                  opacity: pressed ? 0.92 : 1,
                  marginBottom: 0,
                })}
              >
                <Image source={dest.image} style={{ width: "100%", height: "100%" }} contentFit="cover" />
                <LinearGradient
                  colors={["transparent", "rgba(10,37,64,0.78)"]}
                  style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60%" }}
                />
                <View style={{ position: "absolute", bottom: 10, left: 10, right: 10 }}>
                  <Text style={{ color: "#fff", fontSize: isWide ? 16 : 12, fontFamily: "Inter_700Bold", letterSpacing: -0.2 }}>
                    {post.destination}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <Feather name="heart" size={10} color="#FF6B6B" />
                    <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 10, fontFamily: "Inter_600SemiBold" }}>
                      {post.likes}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Top contributors */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3, marginBottom: 14 }}>
          TOP CONTRIBUTORS
        </Text>
        <View style={{ gap: 14 }}>
          {TRAVELER_PROFILES.slice(0, 4).map((traveler) => (
            <Pressable
              key={traveler.id}
              onPress={() => {}}
              style={({ pressed }) => ({
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <LinearGradient
                colors={traveler.gradient}
                style={{ width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center" }}
              >
                <Text style={{ color: "#fff", fontSize: 14, fontFamily: "Inter_700Bold" }}>
                  {traveler.initials}
                </Text>
              </LinearGradient>
              <View style={{ flex: 1 }}>
                <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_600SemiBold" }}>{traveler.name}</Text>
                <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 1 }}>{traveler.personaTitle}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_700Bold" }}>
                  {traveler.followersCount.toLocaleString()}
                </Text>
                <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_400Regular" }}>followers</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

function ConnectTab() {
  const c = useColors();
  const { followedTravelers, toggleFollow, persona } = useApp();

  return (
    <View style={{ paddingTop: 20 }}>
      {/* Persona match banner */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
        <LinearGradient
          colors={[c.deepOcean, "#163A5F"]}
          style={{ borderRadius: 22, padding: 20 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: "rgba(255,255,255,0.12)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.18)",
              }}
            >
              <Feather name="users" size={24} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3 }}>
                YOUR TRAVEL CIRCLE
              </Text>
              <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Inter_700Bold", marginTop: 4, letterSpacing: -0.3 }}>
                {followedTravelers.length} following · {TRAVELER_PROFILES.length} suggested
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 3 }}>
                Matched to: {persona?.title ?? "Curious Traveler"}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Traveler cards */}
      <View style={{ paddingHorizontal: 20 }}>
        <Text style={{ color: c.mutedForeground, fontSize: 11, fontFamily: "Inter_600SemiBold", letterSpacing: 1.3, marginBottom: 16 }}>
          PEOPLE WITH YOUR VIBE
        </Text>
        <View style={{ gap: 14 }}>
          {TRAVELER_PROFILES.map((traveler) => (
            <TravelerCard key={traveler.id} traveler={traveler} />
          ))}
        </View>
      </View>
    </View>
  );
}

function TravelerCard({ traveler }: { traveler: TravelerProfile }) {
  const c = useColors();
  const { followedTravelers, toggleFollow } = useApp();
  const isFollowing = followedTravelers.includes(traveler.id);

  return (
    <View
      style={{
        backgroundColor: c.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: c.border,
        padding: 18,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 13 }}>
        <LinearGradient
          colors={traveler.gradient}
          style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontFamily: "Inter_700Bold" }}>{traveler.initials}</Text>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ color: c.foreground, fontSize: 15, fontFamily: "Inter_700Bold" }}>{traveler.name}</Text>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 999,
                backgroundColor: "rgba(63,169,245,0.12)",
              }}
            >
              <Text style={{ color: c.skyBlue, fontSize: 10, fontFamily: "Inter_700Bold" }}>
                {traveler.matchPct}% match
              </Text>
            </View>
          </View>
          <Text style={{ color: c.mutedForeground, fontSize: 12, fontFamily: "Inter_400Regular", marginTop: 2 }}>
            {traveler.personaTitle}
          </Text>
        </View>
      </View>

      {/* Bio */}
      <Text style={{ color: c.foreground, fontSize: 13, fontFamily: "Inter_400Regular", lineHeight: 19, marginTop: 12 }}>
        {traveler.bio}
      </Text>

      {/* Top destinations */}
      <View style={{ flexDirection: "row", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {traveler.topDestinations.map((dest) => (
          <View
            key={dest}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: c.muted,
            }}
          >
            <Feather name="map-pin" size={10} color={c.mutedForeground} />
            <Text style={{ color: c.foreground, fontSize: 11, fontFamily: "Inter_500Medium" }}>{dest}</Text>
          </View>
        ))}
      </View>

      {/* Stats + follow */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: c.border }}>
        <StatMini label="Trips" value={String(traveler.tripsCount)} />
        <View style={{ width: 1, height: 24, backgroundColor: c.border, marginHorizontal: 16 }} />
        <StatMini label="Countries" value={String(traveler.countriesCount)} />
        <View style={{ width: 1, height: 24, backgroundColor: c.border, marginHorizontal: 16 }} />
        <StatMini label="Followers" value={traveler.followersCount.toLocaleString()} />
        <View style={{ flex: 1 }} />
        <Pressable
          onPress={() => toggleFollow(traveler.id)}
          style={({ pressed }) => ({
            paddingHorizontal: 18,
            paddingVertical: 9,
            borderRadius: 999,
            backgroundColor: isFollowing ? c.muted : c.deepOcean,
            borderWidth: 1,
            borderColor: isFollowing ? c.border : c.deepOcean,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              color: isFollowing ? c.foreground : "#fff",
              fontSize: 12,
              fontFamily: "Inter_700Bold",
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  const c = useColors();
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: c.foreground, fontSize: 14, fontFamily: "Inter_700Bold" }}>{value}</Text>
      <Text style={{ color: c.mutedForeground, fontSize: 10, fontFamily: "Inter_400Regular" }}>{label}</Text>
    </View>
  );
}
