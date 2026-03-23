"use client";

import { useEffect, useRef, useState } from "react";
import videojs from "video.js";

import { SectionCard } from "@/components/SectionCard";

const SDK_VIDEO_SOURCE =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const playerOptions = {
  autoplay: false,
  controls: false,
  preload: "auto",
  responsive: false,
  fluid: false,
  controlBar: false,
  playsinline: true,
  userActions: {
    hotkeys: false
  },
  sources: [
    {
      src: SDK_VIDEO_SOURCE,
      type: "video/mp4"
    }
  ]
};

type EventItem = {
  id: string;
  label: string;
  value: string;
};

type ControlButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  tone?: "primary" | "secondary";
};

const capabilityPills = ["UI personnalisée", "API JS", "Hooks d'événements", "État du lecteur"];
const equalizerBars = [0, 1, 2, 3, 4, 5];

function ControlButton({
  label,
  onClick,
  disabled,
  tone = "secondary"
}: ControlButtonProps) {
  const toneClasses =
    tone === "primary"
      ? "border-emerald-300/35 bg-emerald-300/15 text-emerald-50 hover:bg-emerald-300/25"
      : "border-white/10 bg-white/5 text-white hover:bg-white/10";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex min-h-[54px] w-full items-center justify-center rounded-[18px] border px-3 py-3 text-center transition disabled:cursor-not-allowed disabled:opacity-50 ${toneClasses}`}
    >
      <span className="block text-sm font-semibold">{label}</span>
    </button>
  );
}

function formatTime(seconds: number) {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

export function SDKDemo() {
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<ReturnType<typeof videojs> | null>(null);
  const lastLoggedSecondRef = useRef(-1);
  const hideUiTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isPointerOver, setIsPointerOver] = useState(false);
  const [isTouchUiVisible, setIsTouchUiVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [events, setEvents] = useState<EventItem[]>([]);

  const pushEvent = (label: string, value: string) => {
    setEvents((previous) =>
      [
        {
          id: `${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          label,
          value
        },
        ...previous
      ].slice(0, 6)
    );
  };

  const clearHideUiTimeout = () => {
    if (hideUiTimeoutRef.current) {
      clearTimeout(hideUiTimeoutRef.current);
      hideUiTimeoutRef.current = null;
    }
  };

  const scheduleTouchUiHide = () => {
    clearHideUiTimeout();

    hideUiTimeoutRef.current = setTimeout(() => {
      setIsTouchUiVisible(false);
      hideUiTimeoutRef.current = null;
    }, 2200);
  };

  useEffect(() => {
    if (!playerHostRef.current || playerRef.current) {
      return;
    }

    const videoElement = document.createElement("video-js");
    videoElement.classList.add("video-js", "vjs-big-play-centered", "h-full", "w-full");
    playerHostRef.current.appendChild(videoElement);

    const player = videojs(videoElement, playerOptions);
    playerRef.current = player;

    const handlePlay = () => {
      setIsPlaying(true);
      setHasEnded(false);
      if (!isPointerOver) {
        scheduleTouchUiHide();
      }
      pushEvent("lecture", `Lecture démarrée à ${formatTime(player.currentTime() ?? 0)}`);
    };

    const handlePause = () => {
      clearHideUiTimeout();
      setIsPlaying(false);
      pushEvent("pause", `Lecture mise en pause à ${formatTime(player.currentTime() ?? 0)}`);
    };

    const handleTimeUpdate = () => {
      const nextTime = player.currentTime() ?? 0;
      const roundedTime = Math.floor(nextTime);

      setCurrentTime(nextTime);

      if (roundedTime !== lastLoggedSecondRef.current) {
        lastLoggedSecondRef.current = roundedTime;
        pushEvent("temps", `Temps actuel ${formatTime(nextTime)}`);
      }
    };

    const syncDuration = () => {
      setDuration(player.duration() ?? 0);
    };

    const handleError = () => {
      const error = player.error();
      pushEvent("erreur", error?.message ?? "La lecture a échoué dans le lecteur SDK.");
    };

    const handleEnded = () => {
      clearHideUiTimeout();
      setIsPlaying(false);
      setHasEnded(true);
      setIsTouchUiVisible(true);
      pushEvent("terminé", "La vidéo est arrivée à la fin.");
    };

    player.ready(() => {
      setIsReady(true);
      syncDuration();
      pushEvent("prêt", "Lecteur SDK initialisé");
    });
    player.on("play", handlePlay);
    player.on("pause", handlePause);
    player.on("timeupdate", handleTimeUpdate);
    player.on("loadedmetadata", syncDuration);
    player.on("durationchange", syncDuration);
    player.on("ended", handleEnded);
    player.on("error", handleError);

    return () => {
      clearHideUiTimeout();
      player.dispose();
      playerRef.current = null;
      setIsReady(false);
    };
  }, []);

  const playWithFallback = async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    try {
      await player.play();
      return;
    } catch {
      const mediaElement = player.el()?.querySelector("video");

      if (mediaElement instanceof HTMLVideoElement) {
        await mediaElement.play();
        return;
      }

      throw new Error("No playable media element found");
    }
  };

  const playVideo = async () => {
    if (!isReady) {
      pushEvent("attente", "Le lecteur est encore en cours d'initialisation.");
      return;
    }

    try {
      setHasEnded(false);
      await playWithFallback();
    } catch {
      pushEvent("bloqué", "La lecture a été bloquée ou le SDK n'a pas pu se connecter au média.");
    }
  };

  const pauseVideo = () => {
    playerRef.current?.pause();
  };

  const restartVideo = () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    setHasEnded(false);
    player.currentTime(0);
    void playWithFallback();
  };

  const handlePointerEnter = () => {
    clearHideUiTimeout();
    setIsPointerOver(true);
  };

  const handlePointerLeave = () => {
    setIsPointerOver(false);
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      clearHideUiTimeout();
      setIsTouchUiVisible(true);
    }
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if ((event.pointerType === "touch" || event.pointerType === "pen") && isPlaying) {
      scheduleTouchUiHide();
    }
  };

  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      scheduleTouchUiHide();
    }
  };

  const progressPercentage =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const latestEvent = events[0];
  const statusLabel = isReady ? (isPlaying ? "En lecture" : "En pause") : "Initialisation";
  const eventCountLabel = `${events.length.toString().padStart(2, "0")} événements`;
  const showPlayerUi =
    !isReady || !isPlaying || hasEnded || isPointerOver || isTouchUiVisible;

  return (
    <SectionCard
      id="sdk"
      accent="emerald"
      eyebrow="Approche 2"
      title="Intégration SDK"
      description="Contrôle total mais remplace l'expérience mobile native."
      footer={
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            Contrôle avancé
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            UI web personnalisée
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
            Pas de lecteur natif OS
          </span>
        </div>
      }
    >
      <div
        className="rounded-[24px] border border-emerald-300/15 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.18),_transparent_42%),linear-gradient(180deg,rgba(6,78,59,0.16),rgba(2,6,23,0.1))] p-2.5 shadow-[0_18px_50px_rgba(16,185,129,0.14)] sm:rounded-[28px] sm:p-3"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
       
          <div
            className={`overflow-hidden transition-all duration-200 ${
              showPlayerUi ? "mb-3 max-h-32 opacity-100" : "mb-0 max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Console SDK
                </p>
                <p className="mt-1 text-sm text-white">Lecteur web piloté en JavaScript</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-emerald-50">
                  {statusLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300">
                  {eventCountLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="sdk-player relative overflow-hidden rounded-[22px] border border-white/10 bg-black">
            <div ref={playerHostRef} className="aspect-video" />
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
                showPlayerUi ? "opacity-100" : "opacity-0"
              } bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.18)),radial-gradient(circle_at_top,_rgba(52,211,153,0.1),_transparent_30%)]`}
            />
            <div
              className={`pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2 transition-opacity duration-200 ${
                showPlayerUi ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-100">
                UI SDK
              </span>
            </div>
            <div
              className={`pointer-events-none absolute right-3 top-3 hidden items-end gap-1 rounded-full border border-white/10 bg-slate-950/65 px-3 py-2 transition-opacity duration-200 sm:flex ${
                showPlayerUi ? "opacity-100" : "opacity-0"
              }`}
            >
              {equalizerBars.map((bar) => (
                <span
                  key={bar}
                  className={`sdk-eq-bar h-4 w-1 rounded-full bg-emerald-300/90 ${isPlaying ? "opacity-100" : "opacity-40"}`}
                  style={{ animationDelay: `${bar * 120}ms` }}
                />
              ))}
            </div>
            <div
              className={`pointer-events-none absolute inset-x-2 bottom-2 rounded-[16px] border border-white/10 bg-slate-950/65 px-3 py-2 backdrop-blur transition-all duration-200 ${
                showPlayerUi ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-200">
                <span>Progression</span>
                <span className="text-slate-100">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(167,243,208,0.95),rgba(16,185,129,0.9),rgba(20,184,166,0.9))] shadow-[0_0_18px_rgba(52,211,153,0.45)] transition-[width] duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              showPlayerUi ? "mt-3 max-h-[420px] opacity-100" : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-3 gap-2">
              <ControlButton
                label="Lecture"
                onClick={() => void playVideo()}
                disabled={!isReady}
                tone="primary"
              />
              <ControlButton label="Pause" onClick={pauseVideo} disabled={!isReady} />
              <ControlButton label="Rejouer" onClick={restartVideo} disabled={!isReady} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-[16px] border border-white/10 bg-slate-950/70 px-3 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  État
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  {statusLabel}
                </span>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-slate-950/70 px-3 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Temps
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  {formatTime(currentTime)}
                </span>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-slate-950/70 px-3 py-3">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Durée
                </span>
                <span className="mt-1 block text-sm font-semibold text-white">
                  {formatTime(duration)}
                </span>
              </div>
            </div>
          </div>
        
      </div>

      <div className="mt-4 grid gap-4">
        <div className="rounded-[24px] border border-white/10 bg-black/20 p-4">
          <div className="mb-3 flex flex-col items-start gap-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Événements En Direct
              </h3>
              <p className="mt-1 text-sm text-slate-300">
                Les hooks du SDK remontent dans l'interface en temps réel.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-50">
              {latestEvent?.label ?? "inactif"}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {capabilityPills.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-300"
              >
                {pill}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            {events.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-white/10 bg-white/[0.02] px-4 py-6 text-sm text-slate-400">
                En attente des événements SDK...
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col items-start gap-2 rounded-[20px] border border-white/5 bg-white/[0.03] px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="sdk-signal-dot h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      {event.label}
                    </span>
                  </div>
                  <span className="text-sm text-slate-300">
                    {event.value}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
