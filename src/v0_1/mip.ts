export type Version = "0.1";

export type Source = "ui" | "speech" | "api" | "midi" | "osc" | "test";

export type Domain =
  | "transport"
  | "structure"
  | "music"
  | "harmony"
  | "rhythm"
  | "performance"
  | "timbre";

export type Role =
  | "drums"
  | "percussion"
  | "kick"
  | "snare"
  | "clap"
  | "hihat"
  | "toms"
  | "cymbals"
  | "bass"
  | "subbass"
  | "lead"
  | "pad"
  | "arp"
  | "pluck"
  | "keys"
  | "piano"
  | "organ"
  | "synth"
  | "guitar"
  | "acoustic_guitar"
  | "electric_guitar"
  | "strings"
  | "brass"
  | "woodwinds"
  | "orchestra"
  | "vocal"
  | "lead_vocal"
  | "backing_vocal"
  | "choir"
  | "fx"
  | "riser"
  | "impact"
  | "sweep"
  | "texture"
  | "atmosphere"
  | "ambience"
  | "noise"
  | "master"
  | "group"
  | "bus"
  | "reference";

export type RoleCategory =
  | "rhythm"
  | "bass"
  | "harmony"
  | "melody"
  | "vocal"
  | "texture"
  | "fx"
  | "utility";

export interface TargetRef {
  role?: Role;
  role_category?: RoleCategory;
  role_detail?: string;
  track_name?: string;
  track_id?: string;
}

export type TransportIntent =
  | { action: "play" }
  | { action: "stop" }
  | { action: "record" }
  | { action: "toggle_record" }
  | { action: "locate"; bars: number; beats?: number }
  | { action: "locate"; timecode: string }
  | { action: "set_tempo"; bpm: number }
  | { action: "set_time_signature"; numerator: number; denominator: number }
  | { action: "metronome_on" }
  | { action: "metronome_off" }
  | { action: "loop_on" }
  | { action: "loop_off" }
  | { action: "set_loop"; startBars: number; lengthBars: number };

export type StructureIntent =
  | { action: "create_track"; role: Role; type?: "audio" | "midi" }
  | { action: "select_track"; target: TargetRef }
  | { action: "arm_track"; target: TargetRef }
  | { action: "disarm_track"; target: TargetRef }
  | { action: "mute"; target: TargetRef }
  | { action: "unmute"; target: TargetRef }
  | { action: "solo"; target: TargetRef }
  | { action: "unsolo"; target: TargetRef }
  | { action: "load_device"; target: TargetRef; device: string; kind: "instrument" | "effect" };

export type MusicIntent =
  | { action: "quantize"; target: TargetRef; strength: number }
  | { action: "transpose"; target: TargetRef; semitones: number }
  | { action: "set_key_signature"; key: string; scale: "major" | "minor" };

export type PitchClass =
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab"
  | "A"
  | "A#"
  | "Bb"
  | "B";

export type ScaleType =
  | "major"
  | "minor"
  | "harmonic_minor"
  | "melodic_minor"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "locrian"
  | "pentatonic_major"
  | "pentatonic_minor"
  | "blues"
  | "chromatic"
  | "whole_tone"
  | "diminished";

export type HarmonyIntent =
  | { action: "set_key"; tonic: PitchClass; scale: ScaleType }
  | { action: "set_chord"; chord: string; target?: TargetRef }
  | {
      action: "set_chord_progression";
      progression: string[];
      notation?: "roman" | "symbols";
      target?: TargetRef;
    }
  | { action: "set_pitch_range"; low: string; high: string; target?: TargetRef };

export type RhythmIntent =
  | { action: "set_groove"; groove: "straight" | "swing" | "shuffle" | "triplet" | "dotted"; target?: TargetRef }
  | { action: "set_swing"; amount: number; target?: TargetRef }
  | {
      action: "set_subdivision";
      subdivision:
        | "1/1"
        | "1/2"
        | "1/4"
        | "1/8"
        | "1/16"
        | "1/32"
        | "1/8T"
        | "1/16T";
      target?: TargetRef;
    }
  | { action: "set_rhythm_pattern"; pattern: string; target?: TargetRef }
  | { action: "set_density"; density: number; target?: TargetRef }
  | { action: "humanize_timing"; amount: number; target?: TargetRef };

export type PerformanceIntent =
  | { action: "trigger_scene"; scene_name: string }
  | { action: "trigger_clip"; target: TargetRef; clip_name: string };

export type TimbreAttribute =
  | "warmth"
  | "brightness"
  | "punch"
  | "width"
  | "distance"
  | "space"
  | "energy"
  | "tightness";

export interface TimbreChange {
  attribute: TimbreAttribute;
  amount: number;
}

export type TimbreIntent =
  | {
      action: "adjust";
      target?: TargetRef;
      attribute: TimbreAttribute;
      amount: number;
      intensity?: number;
      confidence?: number;
      adjectives?: string[];
    }
  | {
      action: "adjust_many";
      target?: TargetRef;
      changes: TimbreChange[];
    };

export type DomainPayloadMap = {
  transport: TransportIntent;
  structure: StructureIntent;
  music: MusicIntent;
  harmony: HarmonyIntent;
  rhythm: RhythmIntent;
  performance: PerformanceIntent;
  timbre: TimbreIntent;
};

export type DomainPayload<D extends Domain> = DomainPayloadMap[D];

export type Intent =
  | { domain: "transport"; intent: TransportIntent }
  | { domain: "structure"; intent: StructureIntent }
  | { domain: "music"; intent: MusicIntent }
  | { domain: "harmony"; intent: HarmonyIntent }
  | { domain: "rhythm"; intent: RhythmIntent }
  | { domain: "performance"; intent: PerformanceIntent }
  | { domain: "timbre"; intent: TimbreIntent };

export type Envelope<D extends Domain = Domain> = {
  version: Version;
  id: string;
  timestamp: number;
  source: Source;
  domain: D;
  intent: DomainPayload<D>;
};

const fallbackId = () => `mip_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

const generateId = () => {
  if (
    typeof globalThis !== "undefined" &&
    "crypto" in globalThis &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }
  return fallbackId();
};

export const normalizeToArray = (input: Intent | Intent[]): Intent[] =>
  Array.isArray(input) ? input : [input];

export const makeIntent = <D extends Domain>(
  domain: D,
  intent: DomainPayload<D>,
): Extract<Intent, { domain: D }> => ({
  domain,
  intent,
}) as Extract<Intent, { domain: D }>;

export const makeEnvelope = <D extends Domain>(input: {
  domain: D;
  intent: DomainPayload<D>;
  source: Source;
  id?: string;
  timestamp?: number;
  version?: Version;
}): Envelope<D> => ({
  version: input.version ?? "0.1",
  id: input.id ?? generateId(),
  timestamp: input.timestamp ?? Date.now(),
  source: input.source,
  domain: input.domain,
  intent: input.intent,
});
