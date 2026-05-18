import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  PERSONA_DESCRIPTIONS,
  PERSONA_TITLES,
  SEED_STAMPS,
  SEED_WALLET,
  Stamp,
  WalletItem,
} from "@/constants/data";

export type Persona = {
  style: string;
  pace: string;
  budget: string;
  interests: string[];
  group: string;
  title: string;
  description: string;
};

export type SavedTrip = {
  id: string;
  destinationId: string;
  destinationName: string;
  country: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: number;
  status: "planned" | "booked" | "past";
};

type State = {
  hydrated: boolean;
  persona: Persona | null;
  trips: SavedTrip[];
  wallet: WalletItem[];
  stamps: Stamp[];
  points: number;
  premium: boolean;
  likedPosts: string[];
  savedPosts: string[];
  followedTravelers: string[];
};

type Ctx = State & {
  savePersona: (
    p: Omit<Persona, "title" | "description">,
  ) => Promise<void>;
  resetPersona: () => Promise<void>;
  logout: () => Promise<void>;
  addTrip: (t: Omit<SavedTrip, "id">) => Promise<SavedTrip>;
  bookTrip: (id: string, costPoints?: number) => Promise<void>;
  addStamp: (s: Omit<Stamp, "id">) => Promise<void>;
  addPoints: (n: number) => Promise<void>;
  redeemPoints: (n: number) => Promise<boolean>;
  giftPoints: (email: string, n: number) => Promise<boolean>;
  togglePremium: () => Promise<void>;
  toggleLikePost: (id: string) => Promise<void>;
  toggleSavePost: (id: string) => Promise<void>;
  toggleFollow: (id: string) => Promise<void>;
};

const STORAGE_KEY = "voyage:state:v1";

const AppContext = createContext<Ctx | null>(null);

const FRESH_STATE: Omit<State, "hydrated"> = {
  persona: null,
  trips: [],
  wallet: SEED_WALLET,
  stamps: SEED_STAMPS,
  points: 0,
  premium: false,
  likedPosts: [],
  savedPosts: [],
  followedTravelers: [],
};

const SEED_TRIPS: SavedTrip[] = [
  {
    id: "seed-trip-1",
    destinationId: "kyoto",
    destinationName: "Kyoto",
    country: "Japan",
    startDate: "Apr 2",
    endDate: "Apr 9",
    travelers: 2,
    budget: 6240,
    status: "past",
  },
  {
    id: "seed-trip-2",
    destinationId: "lisbon",
    destinationName: "Lisbon",
    country: "Portugal",
    startDate: "Sep 12",
    endDate: "Sep 18",
    travelers: 2,
    budget: 3480,
    status: "past",
  },
  {
    id: "seed-trip-3",
    destinationId: "santorini",
    destinationName: "Santorini",
    country: "Greece",
    startDate: "Jun 8",
    endDate: "Jun 14",
    travelers: 2,
    budget: 4960,
    status: "booked",
  },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>({
    hydrated: false,
    persona: null,
    trips: SEED_TRIPS,
    wallet: SEED_WALLET,
    stamps: SEED_STAMPS,
    points: 4280,
    premium: false,
    likedPosts: [],
    savedPosts: [],
    followedTravelers: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setState({ ...parsed, hydrated: true });
        } else {
          setState((s) => ({ ...s, hydrated: true }));
        }
      } catch {
        setState((s) => ({ ...s, hydrated: true }));
      }
    })();
  }, []);

  const persist = useCallback(async (next: State) => {
    setState(next);
    try {
      const { hydrated: _h, ...persistable } = next;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch {
      // ignore
    }
  }, []);

  const savePersona = useCallback<Ctx["savePersona"]>(
    async (p) => {
      const persona: Persona = {
        ...p,
        title: PERSONA_TITLES[p.style] ?? "Curious Traveler",
        description:
          PERSONA_DESCRIPTIONS[p.style] ??
          "You travel with intention and curiosity.",
      };
      await persist({ ...state, persona });
    },
    [persist, state],
  );

  const resetPersona = useCallback(async () => {
    await persist({ ...state, persona: null });
  }, [persist, state]);

  const addTrip = useCallback<Ctx["addTrip"]>(
    async (t) => {
      const trip: SavedTrip = {
        ...t,
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      };
      await persist({ ...state, trips: [trip, ...state.trips] });
      return trip;
    },
    [persist, state],
  );

  const bookTrip = useCallback<Ctx["bookTrip"]>(
    async (id, costPoints = 0) => {
      const trips = state.trips.map((t) =>
        t.id === id ? { ...t, status: "booked" as const } : t,
      );
      const points = Math.max(0, state.points - costPoints + 500);
      await persist({ ...state, trips, points });
    },
    [persist, state],
  );

  const addStamp = useCallback<Ctx["addStamp"]>(
    async (s) => {
      const stamp: Stamp = {
        ...s,
        id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
      };
      await persist({ ...state, stamps: [stamp, ...state.stamps] });
    },
    [persist, state],
  );

  const addPoints = useCallback<Ctx["addPoints"]>(
    async (n) => {
      await persist({ ...state, points: state.points + n });
    },
    [persist, state],
  );

  const redeemPoints = useCallback<Ctx["redeemPoints"]>(
    async (n) => {
      if (state.points < n) return false;
      await persist({ ...state, points: state.points - n });
      return true;
    },
    [persist, state],
  );

  const giftPoints = useCallback<Ctx["giftPoints"]>(
    async (_email, n) => {
      if (state.points < n) return false;
      await persist({ ...state, points: state.points - n });
      return true;
    },
    [persist, state],
  );

  const togglePremium = useCallback(async () => {
    await persist({ ...state, premium: !state.premium });
  }, [persist, state]);

  const toggleLikePost = useCallback(async (id: string) => {
    const likedPosts = state.likedPosts.includes(id)
      ? state.likedPosts.filter((p) => p !== id)
      : [...state.likedPosts, id];
    await persist({ ...state, likedPosts });
  }, [persist, state]);

  const toggleSavePost = useCallback(async (id: string) => {
    const savedPosts = state.savedPosts.includes(id)
      ? state.savedPosts.filter((p) => p !== id)
      : [...state.savedPosts, id];
    await persist({ ...state, savedPosts });
  }, [persist, state]);

  const toggleFollow = useCallback(async (id: string) => {
    const followedTravelers = state.followedTravelers.includes(id)
      ? state.followedTravelers.filter((t) => t !== id)
      : [...state.followedTravelers, id];
    await persist({ ...state, followedTravelers });
  }, [persist, state]);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState({ ...FRESH_STATE, hydrated: true });
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      savePersona,
      resetPersona,
      logout,
      addTrip,
      bookTrip,
      addStamp,
      addPoints,
      redeemPoints,
      giftPoints,
      togglePremium,
      toggleLikePost,
      toggleSavePost,
      toggleFollow,
    }),
    [
      state,
      savePersona,
      resetPersona,
      logout,
      addTrip,
      bookTrip,
      addStamp,
      addPoints,
      redeemPoints,
      giftPoints,
      togglePremium,
      toggleLikePost,
      toggleSavePost,
      toggleFollow,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
