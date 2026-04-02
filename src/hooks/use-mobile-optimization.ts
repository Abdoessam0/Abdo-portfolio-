"use client";

import { useEffect, useState } from "react";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformationLike;
};

type MobileOptimizationState = {
  isCompactViewport: boolean;
  hasCoarsePointer: boolean;
  shouldReduceMotion: boolean;
  shouldUseLiteMotion: boolean;
  shouldUseLiteEffects: boolean;
};

const defaultState: MobileOptimizationState = {
  isCompactViewport: false,
  hasCoarsePointer: false,
  shouldReduceMotion: false,
  shouldUseLiteMotion: false,
  shouldUseLiteEffects: false,
};

function getState(): MobileOptimizationState {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const isCompactViewport = window.matchMedia("(max-width: 767px)").matches;
  const hasCoarsePointer = window.matchMedia(
    "(hover: none), (pointer: coarse)",
  ).matches;
  const shouldReduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const connection = (navigator as NavigatorWithConnection).connection;
  const saveData = Boolean(connection?.saveData);
  const slowConnection = connection?.effectiveType
    ? /(^|-)2g$/.test(connection.effectiveType)
    : false;

  const shouldUseLiteMotion =
    shouldReduceMotion || isCompactViewport || saveData;
  const shouldUseLiteEffects =
    shouldUseLiteMotion || hasCoarsePointer || slowConnection;

  return {
    isCompactViewport,
    hasCoarsePointer,
    shouldReduceMotion,
    shouldUseLiteMotion,
    shouldUseLiteEffects,
  };
}

export function useMobileOptimization() {
  const [state, setState] = useState<MobileOptimizationState>(defaultState);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(hover: none), (pointer: coarse)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];

    const update = () => {
      setState(getState());
    };

    update();
    mediaQueries.forEach((query) => query.addEventListener("change", update));

    return () => {
      mediaQueries.forEach((query) =>
        query.removeEventListener("change", update),
      );
    };
  }, []);

  return state;
}
