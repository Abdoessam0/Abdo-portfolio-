"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CircleHelp,
  Globe2,
  LocateFixed,
  MapPin,
  Minus,
  MousePointerClick,
  Plus,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  COUNTRY_META,
  JOURNEY_COUNTRY_CODES,
  getAllConfirmedCities,
  getConfirmedCitiesByCountry,
  getCountryChapterCount,
  getCountryCityCount,
  getJourneyStats,
  getPendingCityEntries,
  type JourneyCity,
  type JourneyCountryCode,
} from "@/data/journey";
import { JourneyCityPanel } from "@/components/home/journey-city-panel";

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;
const MIN_ZOOM = 1;
const MAX_ZOOM = 18;
const MARKER_LABEL_POSITIONS = [
  "right-[calc(100%+0.35rem)] top-1/2 -translate-y-1/2",
  "bottom-[calc(100%+0.35rem)] left-1/2 -translate-x-1/2",
  "right-[calc(100%+0.35rem)] top-1/2 -translate-y-1/2",
  "left-1/2 top-[calc(100%+0.35rem)] -translate-x-1/2",
] as const;

type Coordinate = [number, number];
type Bounds = [Coordinate, Coordinate];

type TopologyTransform = {
  scale: Coordinate;
  translate: Coordinate;
};

type PolygonGeometry = {
  type: "Polygon";
  id: string | number;
  properties?: { name?: string };
  arcs: number[][];
};

type MultiPolygonGeometry = {
  type: "MultiPolygon";
  id: string | number;
  properties?: { name?: string };
  arcs: number[][][];
};

type TopologyGeometry = PolygonGeometry | MultiPolygonGeometry;

type WorldTopology = {
  type: "Topology";
  transform: TopologyTransform;
  arcs: Coordinate[][];
  objects: {
    countries: {
      type: "GeometryCollection";
      geometries: TopologyGeometry[];
    };
  };
};

type RenderedCountry = {
  id: string;
  name: string;
  path: string;
  bounds: Bounds;
};

type MapCamera = {
  center: Coordinate;
  scale: number;
  translate: Coordinate;
  cssTransform: string;
  svgTransform: string;
};

type PanGesture = {
  kind: "pan";
  pointerId: number;
  start: Coordinate;
  camera: MapCamera;
};

type PinchGesture = {
  kind: "pinch";
  distance: number;
  midpoint: Coordinate;
  anchor: Coordinate;
  camera: MapCamera;
};

type MapGesture = PanGesture | PinchGesture;

type MarkerLayout = {
  city: JourneyCity;
  actual: Coordinate;
  display: Coordinate;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isWorldTopology(value: unknown): value is WorldTopology {
  if (!isRecord(value) || value.type !== "Topology") return false;
  if (!Array.isArray(value.arcs) || !isRecord(value.transform)) return false;
  if (!isRecord(value.objects) || !isRecord(value.objects.countries))
    return false;
  return Array.isArray(value.objects.countries.geometries);
}

function projectCoordinate([longitude, latitude]: Coordinate): Coordinate {
  return [
    ((longitude + 180) / 360) * MAP_WIDTH,
    ((90 - latitude) / 180) * MAP_HEIGHT,
  ];
}

function decodeArcs(topology: WorldTopology) {
  const [scaleX, scaleY] = topology.transform.scale;
  const [translateX, translateY] = topology.transform.translate;

  return topology.arcs.map((arc) => {
    let x = 0;
    let y = 0;

    return arc.map(([deltaX, deltaY]) => {
      x += deltaX;
      y += deltaY;
      return [x * scaleX + translateX, y * scaleY + translateY] as Coordinate;
    });
  });
}

function joinArcReferences(references: number[], decodedArcs: Coordinate[][]) {
  const coordinates: Coordinate[] = [];

  for (const reference of references) {
    const index = reference < 0 ? ~reference : reference;
    const source = decodedArcs[index] ?? [];
    const segment = reference < 0 ? [...source].reverse() : source;
    coordinates.push(...(coordinates.length ? segment.slice(1) : segment));
  }

  return coordinates;
}

function ringToPath(ring: Coordinate[]) {
  if (ring.length === 0) return "";
  const projected = ring.map(projectCoordinate);
  const [firstX, firstY] = projected[0];
  const rest = projected
    .slice(1)
    .map(([x, y]) => `L${x.toFixed(2)},${y.toFixed(2)}`)
    .join("");
  return `M${firstX.toFixed(2)},${firstY.toFixed(2)}${rest}Z`;
}

function geometryPolygons(geometry: TopologyGeometry) {
  return geometry.type === "Polygon" ? [geometry.arcs] : geometry.arcs;
}

function topologyToRenderedCountries(topology: WorldTopology) {
  const decodedArcs = decodeArcs(topology);

  return topology.objects.countries.geometries.map((geometry) => {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    const path = geometryPolygons(geometry)
      .flatMap((polygon) =>
        polygon.map((references) => {
          const ring = joinArcReferences(references, decodedArcs);
          for (const coordinate of ring) {
            const [x, y] = projectCoordinate(coordinate);
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
          return ringToPath(ring);
        }),
      )
      .join("");

    return {
      id: String(geometry.id).padStart(3, "0"),
      name: geometry.properties?.name ?? "Country",
      path,
      bounds: [
        [minX, minY],
        [maxX, maxY],
      ],
    } satisfies RenderedCountry;
  });
}

function cameraFromTransform(
  scale: number,
  translateX: number,
  translateY: number,
): MapCamera {
  const center: Coordinate = [
    (MAP_WIDTH / 2 - translateX) / scale,
    (MAP_HEIGHT / 2 - translateY) / scale,
  ];

  return {
    center,
    scale,
    translate: [translateX, translateY],
    cssTransform: `matrix(${scale}, 0, 0, ${scale}, ${translateX}, ${translateY})`,
    svgTransform: `translate(${translateX} ${translateY}) scale(${scale})`,
  };
}

function clampCamera(camera: MapCamera): MapCamera {
  const scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.scale));
  const minX = MAP_WIDTH - MAP_WIDTH * scale;
  const minY = MAP_HEIGHT - MAP_HEIGHT * scale;
  const translateX = Math.min(0, Math.max(minX, camera.translate[0]));
  const translateY = Math.min(0, Math.max(minY, camera.translate[1]));
  return cameraFromTransform(scale, translateX, translateY);
}

function zoomCamera(
  camera: MapCamera,
  factor: number,
  anchor: Coordinate = [MAP_WIDTH / 2, MAP_HEIGHT / 2],
) {
  const scale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.scale * factor));
  const ratio = scale / camera.scale;
  return clampCamera(
    cameraFromTransform(
      scale,
      anchor[0] - (anchor[0] - camera.translate[0]) * ratio,
      anchor[1] - (anchor[1] - camera.translate[1]) * ratio,
    ),
  );
}

function panCamera(camera: MapCamera, deltaX: number, deltaY: number) {
  return clampCamera(
    cameraFromTransform(
      camera.scale,
      camera.translate[0] + deltaX,
      camera.translate[1] + deltaY,
    ),
  );
}

function buildViewTransform(country?: RenderedCountry): MapCamera {
  if (!country) {
    return cameraFromTransform(1, 0, 0);
  }

  const [[minX, minY], [maxX, maxY]] = country.bounds;
  const width = Math.max(maxX - minX, 1);
  const height = Math.max(maxY - minY, 1);
  const scale = Math.min(
    18,
    Math.max(
      1.6,
      Math.min((MAP_WIDTH * 0.56) / width, (MAP_HEIGHT * 0.64) / height),
    ),
  );
  const center: Coordinate = [(minX + maxX) / 2, (minY + maxY) / 2];
  const translateX = MAP_WIDTH / 2 - scale * center[0];
  const translateY = MAP_HEIGHT / 2 - scale * center[1];

  return cameraFromTransform(scale, translateX, translateY);
}

function transformPoint(point: Coordinate, camera: MapCamera): Coordinate {
  return [
    point[0] * camera.scale + camera.translate[0],
    point[1] * camera.scale + camera.translate[1],
  ];
}

function distance(a: Coordinate, b: Coordinate) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function layoutCityMarkers(
  cities: JourneyCity[],
  camera: MapCamera,
): MarkerLayout[] {
  const offsets: Coordinate[] = [
    [0, 0],
    [92, 0],
    [-92, 0],
    [0, -82],
    [0, 82],
    [78, -62],
    [-78, -62],
  ];
  const placed: Coordinate[] = [];

  return cities.map((city) => {
    const actual = transformPoint(projectCoordinate(city.coordinates), camera);
    const candidate = offsets
      .map(
        ([offsetX, offsetY]) =>
          [
            Math.min(962, Math.max(38, actual[0] + offsetX)),
            Math.min(462, Math.max(38, actual[1] + offsetY)),
          ] as Coordinate,
      )
      .find((point) => placed.every((other) => distance(point, other) >= 86));
    const display = candidate ?? actual;
    placed.push(display);
    return { city, actual, display };
  });
}

function topologyCodeForId(id: string): JourneyCountryCode | null {
  return (
    JOURNEY_COUNTRY_CODES.find(
      (code) => COUNTRY_META[code].topologyId === id,
    ) ?? null
  );
}

function countryAccessibleLabel(code: JourneyCountryCode) {
  const cityCount = getCountryCityCount(code);
  const chapterCount = getCountryChapterCount(code);
  const cityLabel = cityCount === 1 ? "city" : "cities";
  const chapterLabel = chapterCount === 1 ? "life chapter" : "life chapters";
  return `${COUNTRY_META[code].name}, ${cityCount} ${cityLabel}, ${chapterCount} ${chapterLabel}`;
}

function CountrySummary({
  selectedCountry,
  onSelectCity,
  onBackToWorld,
}: {
  selectedCountry: JourneyCountryCode | null;
  onSelectCity: (city: JourneyCity, trigger: HTMLButtonElement) => void;
  onBackToWorld: () => void;
}) {
  if (!selectedCountry) {
    const stats = getJourneyStats();

    return (
      <aside className="rounded-[1.5rem] border border-[rgba(24,24,24,0.11)] bg-[#f5f3ef] p-4 sm:p-5 lg:sticky lg:top-24">
        <div className="flex items-start gap-3 lg:block">
          <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#181818] text-[#06b56b]">
            <Globe2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-black tracking-[-0.03em] text-[#181818] lg:mt-5 lg:text-xl">
              Explore the journey
            </h3>
            <p className="mt-1.5 text-sm leading-6 text-[#6f6a61] lg:mt-2">
              Select a highlighted country, adjust the map, then open a city to
              read its grouped life chapters.
            </p>
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "Countries", value: stats.countryCount },
            { label: "Cities", value: stats.cityCount },
            { label: "Chapters", value: stats.chapterCount },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-[rgba(24,24,24,0.08)] bg-white px-2 py-2.5 text-center"
            >
              <dd className="font-heading text-lg font-black text-[#181818]">
                {stat.value}
              </dd>
              <dt className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#817b72]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <ol className="mt-4 grid gap-2 text-xs text-[#4e4a44] sm:grid-cols-3 lg:grid-cols-1">
          {[
            "Hover or focus a country for a summary",
            "Select a country to reveal its cities",
            "Open a city to view every chapter",
          ].map((step, index) => (
            <li key={step} className="flex items-start gap-2.5">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-[#048c55]">
                {index + 1}
              </span>
              <span className="leading-5">{step}</span>
            </li>
          ))}
        </ol>
      </aside>
    );
  }

  const meta = COUNTRY_META[selectedCountry];
  const cities = getConfirmedCitiesByCountry(selectedCountry);
  const pending = getPendingCityEntries(selectedCountry);

  return (
    <aside className="rounded-[1.5rem] border border-[rgba(24,24,24,0.11)] bg-[#f5f3ef] p-4 sm:p-5 lg:sticky lg:top-24">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#048c55]">
            Selected country
          </p>
          <h3 className="mt-2 font-heading text-2xl font-black tracking-[-0.04em] text-[#181818]">
            {meta.name}
          </h3>
          <p className="mt-2 text-sm text-[#6f6a61]">
            {countryAccessibleLabel(selectedCountry)}
          </p>
        </div>
        <button
          type="button"
          onClick={onBackToWorld}
          aria-label="Back to world map"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[rgba(24,24,24,0.13)] bg-white text-[#181818] transition hover:border-[#181818]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div
        className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1"
        aria-label={`Cities in ${meta.name}`}
      >
        {cities.map((city) => (
          <button
            key={city.key}
            type="button"
            onClick={(event) => onSelectCity(city, event.currentTarget)}
            className="flex min-h-11 w-full items-center justify-between rounded-xl border border-[rgba(24,24,24,0.1)] bg-white px-3 py-2 text-left text-sm font-semibold text-[#181818] transition hover:border-[#06b56b]"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#06b56b]" aria-hidden="true" />
              {city.city}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#817b72]">
              {city.entries.length}
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>

      {pending.length ? (
        <div className="mt-4 space-y-2.5">
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[#817b72]">
            {pending.length} {pending.length === 1 ? "chapter" : "chapters"}{" "}
            with city details pending
          </p>
          {pending.map((entry) => (
            <article
              key={entry.id}
              className="rounded-xl border border-dashed border-[rgba(24,24,24,0.18)] bg-white p-3.5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#048c55]">
                  Location details pending
                </span>
                <span className="text-xs font-semibold text-[#817b72]">
                  {entry.dateLabel}
                </span>
              </div>
              <h4 className="mt-2 text-sm font-bold text-[#181818]">
                {entry.title}
              </h4>
              <p className="mt-2 text-xs leading-5 text-[#6f6a61]">
                {entry.summary}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </aside>
  );
}

export function JourneyMap() {
  const reducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastCityTriggerRef = useRef<HTMLButtonElement | null>(null);
  const mapViewportRef = useRef<HTMLDivElement>(null);
  const countryPathRefs = useRef<
    Partial<Record<JourneyCountryCode, SVGPathElement | null>>
  >({});
  const initialCameraRef = useRef(buildViewTransform());
  const cameraRef = useRef(initialCameraRef.current);
  const activePointersRef = useRef(new Map<number, Coordinate>());
  const gestureRef = useRef<MapGesture | null>(null);
  const suppressClickRef = useRef(false);
  const [countries, setCountries] = useState<RenderedCountry[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [camera, setCamera] = useState(initialCameraRef.current);
  const [isPointerInteracting, setIsPointerInteracting] = useState(false);
  const [hoveredCountry, setHoveredCountry] =
    useState<JourneyCountryCode | null>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<JourneyCountryCode | null>(null);
  const [selectedCityKey, setSelectedCityKey] = useState<string | null>(null);

  const allCities = useMemo(() => getAllConfirmedCities(), []);
  const selectedCities = useMemo(
    () => (selectedCountry ? getConfirmedCitiesByCountry(selectedCountry) : []),
    [selectedCountry],
  );
  const selectedCity = useMemo(
    () => allCities.find((city) => city.key === selectedCityKey) ?? null,
    [allCities, selectedCityKey],
  );

  useEffect(() => {
    if (countries.length) return;
    const controller = new AbortController();

    async function loadMap() {
      try {
        const response = await fetch("/maps/world-110m.json", {
          cache: "force-cache",
          signal: controller.signal,
        });
        if (!response.ok)
          throw new Error(`Map request failed (${response.status})`);
        const topology: unknown = await response.json();
        if (!isWorldTopology(topology))
          throw new Error("Map data is not valid TopoJSON");
        setCountries(topologyToRenderedCountries(topology));
      } catch (error) {
        if (controller.signal.aborted) return;
        setMapError(
          error instanceof Error
            ? error.message
            : "The map could not be loaded",
        );
      }
    }

    void loadMap();
    return () => controller.abort();
  }, [countries.length]);

  const markerLayouts = useMemo(
    () => layoutCityMarkers(selectedCities, camera),
    [camera, selectedCities],
  );

  const applyCamera = useCallback((nextCamera: MapCamera) => {
    cameraRef.current = nextCamera;
    setCamera(nextCamera);
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const topologyId = COUNTRY_META[selectedCountry].topologyId;
    const selectedShape = countries.find(
      (country) => country.id === topologyId,
    );
    if (selectedShape) applyCamera(buildViewTransform(selectedShape));
  }, [applyCamera, countries, selectedCountry]);

  const closeCity = useCallback(() => {
    setSelectedCityKey(null);
    window.requestAnimationFrame(() => lastCityTriggerRef.current?.focus());
  }, []);

  const resetWorld = useCallback(() => {
    const previousCountry = selectedCountry;
    setSelectedCityKey(null);
    setSelectedCountry(null);
    setHoveredCountry(null);
    applyCamera(buildViewTransform());
    if (previousCountry) {
      window.requestAnimationFrame(() =>
        countryPathRefs.current[previousCountry]?.focus(),
      );
    }
  }, [applyCamera, selectedCountry]);

  const selectCountry = useCallback((countryCode: JourneyCountryCode) => {
    setSelectedCityKey(null);
    setSelectedCountry(countryCode);
    setHoveredCountry(countryCode);
  }, []);

  const zoomBy = useCallback(
    (factor: number, anchor?: Coordinate) => {
      applyCamera(zoomCamera(cameraRef.current, factor, anchor));
    },
    [applyCamera],
  );

  const clientPointToMap = useCallback(
    (element: HTMLDivElement, point: Coordinate): Coordinate => {
      const rect = element.getBoundingClientRect();
      return [
        ((point[0] - rect.left) / rect.width) * MAP_WIDTH,
        ((point[1] - rect.top) / rect.height) * MAP_HEIGHT,
      ];
    },
    [],
  );

  const beginPan = useCallback((pointerId: number, point: Coordinate) => {
    gestureRef.current = {
      kind: "pan",
      pointerId,
      start: point,
      camera: cameraRef.current,
    };
  }, []);

  const beginPinch = useCallback(
    (element: HTMLDivElement) => {
      const points = Array.from(activePointersRef.current.values());
      if (points.length < 2) return;
      const [first, second] = points;
      const midpoint: Coordinate = [
        (first[0] + second[0]) / 2,
        (first[1] + second[1]) / 2,
      ];
      gestureRef.current = {
        kind: "pinch",
        distance: Math.max(1, distance(first, second)),
        midpoint,
        anchor: clientPointToMap(element, midpoint),
        camera: cameraRef.current,
      };
    },
    [clientPointToMap],
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (
        event.target instanceof Element &&
        event.target.closest("button, a, [role='button']")
      ) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      const point: Coordinate = [event.clientX, event.clientY];
      activePointersRef.current.set(event.pointerId, point);
      setIsPointerInteracting(true);

      if (activePointersRef.current.size > 1) {
        beginPinch(event.currentTarget);
      } else {
        beginPan(event.pointerId, point);
      }
    },
    [beginPan, beginPinch],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!activePointersRef.current.has(event.pointerId)) return;
      const point: Coordinate = [event.clientX, event.clientY];
      activePointersRef.current.set(event.pointerId, point);
      const gesture = gestureRef.current;
      if (!gesture) return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (activePointersRef.current.size > 1) {
        if (gesture.kind !== "pinch") {
          beginPinch(event.currentTarget);
          return;
        }
        const points = Array.from(activePointersRef.current.values());
        const [first, second] = points;
        const midpoint: Coordinate = [
          (first[0] + second[0]) / 2,
          (first[1] + second[1]) / 2,
        ];
        const factor = distance(first, second) / gesture.distance;
        const zoomed = zoomCamera(gesture.camera, factor, gesture.anchor);
        const deltaX =
          ((midpoint[0] - gesture.midpoint[0]) / rect.width) * MAP_WIDTH;
        const deltaY =
          ((midpoint[1] - gesture.midpoint[1]) / rect.height) * MAP_HEIGHT;
        applyCamera(panCamera(zoomed, deltaX, deltaY));
        suppressClickRef.current = true;
        return;
      }

      if (gesture.kind !== "pan" || gesture.pointerId !== event.pointerId)
        return;
      const deltaClientX = point[0] - gesture.start[0];
      const deltaClientY = point[1] - gesture.start[1];
      if (Math.hypot(deltaClientX, deltaClientY) > 4) {
        suppressClickRef.current = true;
      }
      applyCamera(
        panCamera(
          gesture.camera,
          (deltaClientX / rect.width) * MAP_WIDTH,
          (deltaClientY / rect.height) * MAP_HEIGHT,
        ),
      );
    },
    [applyCamera, beginPinch],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      activePointersRef.current.delete(event.pointerId);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const remaining = Array.from(activePointersRef.current.entries());
      if (remaining.length === 1) {
        const [pointerId, point] = remaining[0];
        beginPan(pointerId, point);
      } else {
        gestureRef.current = null;
      }

      if (remaining.length === 0) {
        setIsPointerInteracting(false);
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    },
    [beginPan],
  );

  const openCity = useCallback(
    (city: JourneyCity, trigger: HTMLButtonElement) => {
      lastCityTriggerRef.current = trigger;
      setSelectedCityKey(city.key);
    },
    [],
  );

  useEffect(() => {
    if (!selectedCity) return;
    const frame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedCity) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedCity]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedCity) {
        event.preventDefault();
        closeCity();
      } else if (selectedCountry) {
        event.preventDefault();
        resetWorld();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeCity, resetWorld, selectedCity, selectedCountry]);

  const handleCountryKeyDown = (
    event: ReactKeyboardEvent<SVGPathElement>,
    countryCode: JourneyCountryCode,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCountry(countryCode);
    }
  };

  const activeTooltipCountry = hoveredCountry ?? selectedCountry;
  const activePendingCount = activeTooltipCountry
    ? getPendingCityEntries(activeTooltipCountry).length
    : 0;

  return (
    <div className="mt-7">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(260px,1fr)] lg:items-start xl:gap-5">
        <div className="min-w-0 space-y-4">
          <div className="story-nested-dark overflow-hidden rounded-[1.5rem] border border-[#2f2f2c] bg-[#1f1f1d] shadow-[0_18px_50px_rgba(24,24,24,0.18)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-medium text-white/70 sm:text-xs">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm bg-[#06b56b]"
                    aria-hidden="true"
                  />
                  Journey country
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-sm bg-[#484844]"
                    aria-hidden="true"
                  />
                  Other country
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full border-2 border-[#06b56b] bg-[#eafff4]"
                    aria-hidden="true"
                  />
                  Confirmed city
                </span>
              </div>

              {selectedCountry ? (
                <button
                  type="button"
                  onClick={resetWorld}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-[#f3eee6] transition hover:border-white/30 hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to world
                </button>
              ) : (
                <span className="hidden items-center gap-2 text-xs text-white/45 sm:inline-flex">
                  <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                  Select, drag, or use the zoom buttons
                </span>
              )}
            </div>

            <div
              ref={mapViewportRef}
              className={`relative aspect-[16/9] min-h-[190px] w-full overflow-hidden bg-[radial-gradient(circle_at_53%_42%,rgba(6,181,107,0.11),transparent_34%),linear-gradient(180deg,#242421,#181816)] sm:min-h-[320px] lg:aspect-[1.85/1] ${
                isPointerInteracting ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{ touchAction: "pan-y" }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
            >
              {mapError ? (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center text-white/75">
                  <CircleHelp
                    className="h-7 w-7 text-[#06b56b]"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-semibold">
                    The visual map is unavailable.
                  </p>
                  <p className="mt-1 text-xs text-white/50">
                    Use the country and city controls below.
                  </p>
                </div>
              ) : null}

              {!countries.length && !mapError ? (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  aria-live="polite"
                >
                  <span className="inline-flex items-center gap-2 text-xs text-white/55">
                    <span
                      className="h-2 w-2 animate-pulse rounded-full bg-[#06b56b]"
                      aria-hidden="true"
                    />
                    Loading the world map…
                  </span>
                </div>
              ) : null}

              <svg
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                role="img"
                aria-labelledby="journey-map-title journey-map-description"
                className="absolute inset-0 h-full w-full"
              >
                <title id="journey-map-title">
                  Interactive map of the global journey
                </title>
                <desc id="journey-map-description">
                  Five countries are highlighted. Select a highlighted country
                  to reveal confirmed cities and grouped life chapters.
                </desc>

                <g
                  transform={camera.svgTransform}
                  style={{
                    transform: camera.cssTransform,
                    transformBox: "view-box",
                    transformOrigin: "0 0",
                    transition:
                      reducedMotion || isPointerInteracting
                        ? "none"
                        : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {countries.map((country, countryIndex) => {
                    const countryCode = topologyCodeForId(country.id);
                    const isVisited = countryCode !== null;
                    const isSelected =
                      countryCode !== null && countryCode === selectedCountry;
                    const isHovered =
                      countryCode !== null && countryCode === hoveredCountry;
                    const hasSelection = selectedCountry !== null;
                    const fill = isSelected
                      ? "#06b56b"
                      : isVisited && isHovered
                        ? "#32ca8c"
                        : isVisited && hasSelection
                          ? "#426d5a"
                          : isVisited
                            ? "#0b9e60"
                            : hasSelection
                              ? "#33332f"
                              : "#484844";

                    return (
                      <path
                        key={`${country.id ?? "country"}-${countryIndex}`}
                        ref={(node) => {
                          if (countryCode)
                            countryPathRefs.current[countryCode] = node;
                        }}
                        d={country.path}
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill={fill}
                        stroke={
                          isSelected
                            ? "#d8fff0"
                            : isHovered && isVisited
                              ? "#9bf4cb"
                              : "#242421"
                        }
                        strokeWidth={isSelected ? 1.7 : isHovered ? 1.35 : 0.75}
                        vectorEffect="non-scaling-stroke"
                        tabIndex={isVisited ? 0 : undefined}
                        role={isVisited ? "button" : undefined}
                        aria-label={
                          countryCode
                            ? countryAccessibleLabel(countryCode)
                            : undefined
                        }
                        style={{
                          cursor: isVisited ? "pointer" : "default",
                          opacity: hasSelection && !isSelected ? 0.72 : 1,
                          transition: reducedMotion
                            ? "none"
                            : "fill 200ms ease, opacity 200ms ease, stroke 200ms ease",
                        }}
                        onPointerEnter={() =>
                          countryCode && setHoveredCountry(countryCode)
                        }
                        onPointerLeave={() => setHoveredCountry(null)}
                        onFocus={() =>
                          countryCode && setHoveredCountry(countryCode)
                        }
                        onBlur={() => setHoveredCountry(null)}
                        onClick={() => {
                          if (suppressClickRef.current) return;
                          if (countryCode) selectCountry(countryCode);
                        }}
                        onKeyDown={(event) =>
                          countryCode &&
                          handleCountryKeyDown(event, countryCode)
                        }
                      />
                    );
                  })}

                  {!selectedCountry
                    ? allCities.map((city) => {
                        const [x, y] = projectCoordinate(city.coordinates);
                        return (
                          <g
                            key={city.key}
                            aria-hidden="true"
                            pointerEvents="none"
                          >
                            <circle
                              cx={x}
                              cy={y}
                              r={5.2}
                              fill="#eafff4"
                              stroke="#11110f"
                              strokeWidth={1.5}
                              vectorEffect="non-scaling-stroke"
                            />
                            <circle
                              cx={x}
                              cy={y}
                              r={2.5}
                              fill="#06b56b"
                              vectorEffect="non-scaling-stroke"
                            />
                          </g>
                        );
                      })
                    : null}
                </g>

                <g aria-hidden="true" pointerEvents="none">
                  <rect
                    x="0"
                    y="0"
                    width={MAP_WIDTH}
                    height={MAP_HEIGHT}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                  />
                </g>

                {selectedCountry
                  ? markerLayouts.map(({ city, actual, display }) => (
                      <g key={city.key} aria-hidden="true" pointerEvents="none">
                        {distance(actual, display) > 6 ? (
                          <line
                            x1={actual[0]}
                            y1={actual[1]}
                            x2={display[0]}
                            y2={display[1]}
                            stroke="#58d99e"
                            strokeWidth={1.25}
                            strokeDasharray="4 4"
                            opacity={0.65}
                          />
                        ) : null}
                        <circle
                          cx={actual[0]}
                          cy={actual[1]}
                          r={3.5}
                          fill="#06b56b"
                          stroke="#eafff4"
                          strokeWidth={1.5}
                        />
                      </g>
                    ))
                  : null}
              </svg>

              <div
                className="absolute bottom-3 left-3 z-40 flex items-center gap-1 rounded-xl border border-white/15 bg-[#111]/90 p-1 shadow-xl backdrop-blur"
                role="group"
                aria-label="Map controls"
              >
                <button
                  type="button"
                  onClick={() => zoomBy(1.35)}
                  disabled={camera.scale >= MAX_ZOOM - 0.01}
                  aria-label="Zoom in"
                  title="Zoom in"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#f3eee6] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => zoomBy(1 / 1.35)}
                  disabled={camera.scale <= MIN_ZOOM + 0.01}
                  aria-label="Zoom out"
                  title="Zoom out"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#f3eee6] transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={resetWorld}
                  aria-label="Reset map to world view"
                  title="Reset to world"
                  className="inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-[#f3eee6] transition hover:bg-white/10"
                >
                  <LocateFixed className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {selectedCountry
                ? markerLayouts.map(({ city, display }, markerIndex) => {
                    const isSelectedMarker = selectedCityKey === city.key;
                    return (
                      <button
                        key={city.key}
                        type="button"
                        onClick={(event) => openCity(city, event.currentTarget)}
                        aria-pressed={isSelectedMarker}
                        aria-label={`Open ${city.city}, ${city.country}: ${city.entries.length} ${city.entries.length === 1 ? "chapter" : "chapters"}`}
                        className={`group absolute z-20 inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#b9f4d8] bg-[#111]/92 shadow-[0_5px_18px_rgba(0,0,0,0.35)] transition-transform hover:scale-110 focus-visible:scale-110 ${
                          isSelectedMarker
                            ? "scale-110 shadow-[0_0_0_4px_rgba(6,181,107,0.24),0_8px_22px_rgba(0,0,0,0.4)]"
                            : ""
                        }`}
                        style={{
                          left: `${(display[0] / MAP_WIDTH) * 100}%`,
                          top: `${(display[1] / MAP_HEIGHT) * 100}%`,
                        }}
                      >
                        <span
                          className={`absolute inset-1 rounded-full border border-[#06b56b] transition-opacity ${
                            isSelectedMarker
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`relative h-3.5 w-3.5 rounded-full border-2 border-[#eafff4] bg-[#06b56b] transition-transform ${
                            isSelectedMarker ? "scale-110" : ""
                          }`}
                          aria-hidden="true"
                        />
                        {city.entries.length > 1 ? (
                          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[#111] bg-[#eafff4] px-1 text-[0.58rem] font-black text-[#047345]">
                            {city.entries.length}
                          </span>
                        ) : null}
                        <span
                          className={`pointer-events-none absolute whitespace-nowrap rounded-md border border-white/10 bg-[#111]/95 px-2 py-1 text-[0.62rem] font-bold text-[#f3eee6] shadow-lg ${MARKER_LABEL_POSITIONS[markerIndex % MARKER_LABEL_POSITIONS.length]}`}
                        >
                          {city.city}
                        </span>
                      </button>
                    );
                  })
                : null}

              {activeTooltipCountry ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={`absolute right-3 top-3 z-30 max-w-[13rem] rounded-xl border border-white/15 bg-[#111]/92 px-3 py-2.5 text-[#f3eee6] shadow-xl backdrop-blur sm:right-4 sm:top-4 ${selectedCountry ? "hidden sm:block" : ""}`}
                >
                  <p className="text-xs font-bold sm:text-sm">
                    {COUNTRY_META[activeTooltipCountry].name}
                  </p>
                  <p className="mt-1 text-[0.65rem] leading-5 text-white/65 sm:text-xs">
                    {getCountryCityCount(activeTooltipCountry)}{" "}
                    {getCountryCityCount(activeTooltipCountry) === 1
                      ? "city"
                      : "cities"}{" "}
                    · {getCountryChapterCount(activeTooltipCountry)} life{" "}
                    {getCountryChapterCount(activeTooltipCountry) === 1
                      ? "chapter"
                      : "chapters"}
                  </p>
                  {activePendingCount ? (
                    <p className="text-[0.62rem] leading-4 text-[#9bf4cb]">
                      {activePendingCount}{" "}
                      {activePendingCount === 1 ? "chapter" : "chapters"} with
                      city details pending
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/55 sm:px-5">
              {selectedCountry ? (
                <p>
                  Showing confirmed cities in{" "}
                  <strong className="text-[#f3eee6]">
                    {COUNTRY_META[selectedCountry].name}
                  </strong>
                  . Select a marker to open its chapters.
                </p>
              ) : (
                <p>
                  Country color marks a meaningful life chapter; city points use
                  verified coordinates only.
                </p>
              )}
              <span className="shrink-0 font-mono text-[0.62rem] text-white/35">
                {Math.round(camera.scale * 100)}%
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedCity ? (
            <JourneyCityPanel
              key={selectedCity.key}
              city={selectedCity}
              onClose={closeCity}
              panelRef={panelRef}
              closeButtonRef={closeButtonRef}
            />
          ) : (
            <motion.div
              key={selectedCountry ?? "world"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
            >
              <CountrySummary
                selectedCountry={selectedCountry}
                onSelectCity={openCity}
                onBackToWorld={resetWorld}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 rounded-[1.1rem] border border-[rgba(24,24,24,0.09)] bg-[#fbfaf7] px-3.5 py-3 sm:px-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex min-w-[12rem] items-center gap-2.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(24,24,24,0.08)] bg-white text-[#048c55]">
              <Globe2 className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#181818]">
                Browse journey locations
              </h3>
              <p className="text-[0.66rem] leading-4 text-[#817b72]">
                Same locations, without using the map.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-wrap gap-2 lg:border-l lg:border-[rgba(24,24,24,0.09)] lg:pl-4">
            <div
              className="flex flex-wrap gap-2"
              aria-label="Journey countries"
            >
              {JOURNEY_COUNTRY_CODES.map((countryCode) => (
                <button
                  key={countryCode}
                  type="button"
                  aria-pressed={selectedCountry === countryCode}
                  onClick={() => selectCountry(countryCode)}
                  className={`min-h-11 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                    selectedCountry === countryCode
                      ? "border-[#181818] bg-[#181818] text-[#f3eee6]"
                      : "border-[rgba(24,24,24,0.12)] bg-white text-[#4e4a44] hover:border-[#06b56b] hover:text-[#048c55]"
                  }`}
                >
                  {COUNTRY_META[countryCode].name}
                </button>
              ))}
            </div>

            {selectedCountry ? (
              <div
                className="flex flex-wrap gap-2 border-l border-[rgba(24,24,24,0.09)] pl-2"
                aria-label={`Confirmed cities in ${COUNTRY_META[selectedCountry].name}`}
              >
                {selectedCities.map((city) => (
                  <button
                    key={city.key}
                    type="button"
                    onClick={(event) => openCity(city, event.currentTarget)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[rgba(24,24,24,0.12)] bg-white px-3.5 py-2 text-xs font-semibold text-[#181818] transition hover:border-[#06b56b]"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full border-2 border-[#b9f4d8] bg-[#06b56b]"
                      aria-hidden="true"
                    />
                    {city.city}
                    <span className="text-[#817b72]">
                      ({city.entries.length})
                    </span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
