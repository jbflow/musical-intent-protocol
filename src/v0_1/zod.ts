import { z } from "zod";
import { Role, Source, TargetRef, TimbreAttribute, TimbreChange } from "./mip";

const roleValues = [
  "drums",
  "percussion",
  "kick",
  "snare",
  "clap",
  "hihat",
  "toms",
  "cymbals",
  "bass",
  "subbass",
  "lead",
  "pad",
  "arp",
  "pluck",
  "keys",
  "piano",
  "organ",
  "synth",
  "guitar",
  "acoustic_guitar",
  "electric_guitar",
  "strings",
  "brass",
  "woodwinds",
  "orchestra",
  "vocal",
  "lead_vocal",
  "backing_vocal",
  "choir",
  "fx",
  "riser",
  "impact",
  "sweep",
  "texture",
  "atmosphere",
  "ambience",
  "noise",
  "master",
  "group",
  "bus",
  "reference",
 ] as const satisfies readonly Role[];

const roleCategoryValues = [
  "rhythm",
  "bass",
  "harmony",
  "melody",
  "vocal",
  "texture",
  "fx",
  "utility",
] as const;

const sourceValues = ["ui", "speech", "api", "midi", "osc", "test"] as const satisfies readonly Source[];

const timbreAttributes = [
  "warmth",
  "brightness",
  "punch",
  "width",
  "distance",
  "space",
  "energy",
  "tightness",
] as const satisfies readonly TimbreAttribute[];

export const TargetRefSchema: z.ZodType<TargetRef> = z
  .object({
    role: z.enum(roleValues).optional(),
    role_category: z.enum(roleCategoryValues).optional(),
    role_detail: z.string().optional(),
    track_name: z.string().optional(),
    track_id: z.string().optional(),
  })
  .strict();

const TransportPlaySchema = z.object({ action: z.literal("play") }).strict();
const TransportStopSchema = z.object({ action: z.literal("stop") }).strict();
const TransportRecordSchema = z.object({ action: z.literal("record") }).strict();
const TransportToggleRecordSchema = z
  .object({ action: z.literal("toggle_record") })
  .strict();
const TransportLocateBarsSchema = z
  .object({
    action: z.literal("locate"),
    bars: z.number(),
    beats: z.number().optional(),
  })
  .strict();
const TransportLocateTimecodeSchema = z
  .object({
    action: z.literal("locate"),
    timecode: z.string(),
  })
  .strict();
const TransportSetTempoSchema = z
  .object({
    action: z.literal("set_tempo"),
    bpm: z.number(),
  })
  .strict();
const TransportSetTimeSignatureSchema = z
  .object({
    action: z.literal("set_time_signature"),
    numerator: z.number().int().positive(),
    denominator: z.number().int().positive(),
  })
  .strict();
const TransportMetronomeOnSchema = z
  .object({ action: z.literal("metronome_on") })
  .strict();
const TransportMetronomeOffSchema = z
  .object({ action: z.literal("metronome_off") })
  .strict();
const TransportLoopOnSchema = z.object({ action: z.literal("loop_on") }).strict();
const TransportLoopOffSchema = z
  .object({ action: z.literal("loop_off") })
  .strict();
const TransportSetLoopSchema = z
  .object({
    action: z.literal("set_loop"),
    startBars: z.number(),
    lengthBars: z.number(),
  })
  .strict();

export const TransportIntentSchema = z.union([
  TransportPlaySchema,
  TransportStopSchema,
  TransportRecordSchema,
  TransportToggleRecordSchema,
  TransportLocateBarsSchema,
  TransportLocateTimecodeSchema,
  TransportSetTempoSchema,
  TransportSetTimeSignatureSchema,
  TransportMetronomeOnSchema,
  TransportMetronomeOffSchema,
  TransportLoopOnSchema,
  TransportLoopOffSchema,
  TransportSetLoopSchema,
]);

const StructureCreateTrackSchema = z
  .object({
    action: z.literal("create_track"),
    role: z.enum(roleValues),
    type: z.enum(["audio", "midi"]).optional(),
  })
  .strict();
const StructureSelectTrackSchema = z
  .object({ action: z.literal("select_track"), target: TargetRefSchema })
  .strict();
const StructureArmTrackSchema = z
  .object({ action: z.literal("arm_track"), target: TargetRefSchema })
  .strict();
const StructureDisarmTrackSchema = z
  .object({ action: z.literal("disarm_track"), target: TargetRefSchema })
  .strict();
const StructureMuteSchema = z
  .object({ action: z.literal("mute"), target: TargetRefSchema })
  .strict();
const StructureUnmuteSchema = z
  .object({ action: z.literal("unmute"), target: TargetRefSchema })
  .strict();
const StructureSoloSchema = z
  .object({ action: z.literal("solo"), target: TargetRefSchema })
  .strict();
const StructureUnsoloSchema = z
  .object({ action: z.literal("unsolo"), target: TargetRefSchema })
  .strict();
const StructureLoadDeviceSchema = z
  .object({
    action: z.literal("load_device"),
    target: TargetRefSchema,
    device: z.string(),
    kind: z.enum(["instrument", "effect"]),
  })
  .strict();

export const StructureIntentSchema = z.union([
  StructureCreateTrackSchema,
  StructureSelectTrackSchema,
  StructureArmTrackSchema,
  StructureDisarmTrackSchema,
  StructureMuteSchema,
  StructureUnmuteSchema,
  StructureSoloSchema,
  StructureUnsoloSchema,
  StructureLoadDeviceSchema,
]);

const MusicQuantizeSchema = z
  .object({
    action: z.literal("quantize"),
    target: TargetRefSchema,
    strength: z.number().min(0).max(1),
  })
  .strict();
const MusicTransposeSchema = z
  .object({
    action: z.literal("transpose"),
    target: TargetRefSchema,
    semitones: z.number().int(),
  })
  .strict();
const MusicSetKeySignatureSchema = z
  .object({
    action: z.literal("set_key_signature"),
    key: z.string(),
    scale: z.enum(["major", "minor"]),
  })
  .strict();

const pitchClassValues = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
] as const;

const scaleTypeValues = [
  "major",
  "minor",
  "harmonic_minor",
  "melodic_minor",
  "dorian",
  "phrygian",
  "lydian",
  "mixolydian",
  "locrian",
  "pentatonic_major",
  "pentatonic_minor",
  "blues",
  "chromatic",
  "whole_tone",
  "diminished",
] as const;

export const MusicIntentSchema = z.union([
  MusicQuantizeSchema,
  MusicTransposeSchema,
  MusicSetKeySignatureSchema,
]);

const HarmonySetKeySchema = z
  .object({
    action: z.literal("set_key"),
    tonic: z.enum(pitchClassValues),
    scale: z.enum(scaleTypeValues),
  })
  .strict();

const HarmonySetChordSchema = z
  .object({
    action: z.literal("set_chord"),
    chord: z.string(),
    target: TargetRefSchema.optional(),
  })
  .strict();

const HarmonySetChordProgressionSchema = z
  .object({
    action: z.literal("set_chord_progression"),
    progression: z.array(z.string()).min(1),
    notation: z.enum(["roman", "symbols"]).optional(),
    target: TargetRefSchema.optional(),
  })
  .strict();

const HarmonySetPitchRangeSchema = z
  .object({
    action: z.literal("set_pitch_range"),
    low: z.string(),
    high: z.string(),
    target: TargetRefSchema.optional(),
  })
  .strict();

export const HarmonyIntentSchema = z.union([
  HarmonySetKeySchema,
  HarmonySetChordSchema,
  HarmonySetChordProgressionSchema,
  HarmonySetPitchRangeSchema,
]);

const RhythmSetGrooveSchema = z
  .object({
    action: z.literal("set_groove"),
    groove: z.enum(["straight", "swing", "shuffle", "triplet", "dotted"]),
    target: TargetRefSchema.optional(),
  })
  .strict();

const RhythmSetSwingSchema = z
  .object({
    action: z.literal("set_swing"),
    amount: z.number().min(0).max(1),
    target: TargetRefSchema.optional(),
  })
  .strict();

const RhythmSetSubdivisionSchema = z
  .object({
    action: z.literal("set_subdivision"),
    subdivision: z.enum(["1/1", "1/2", "1/4", "1/8", "1/16", "1/32", "1/8T", "1/16T"]),
    target: TargetRefSchema.optional(),
  })
  .strict();

const RhythmSetPatternSchema = z
  .object({
    action: z.literal("set_rhythm_pattern"),
    pattern: z.string(),
    target: TargetRefSchema.optional(),
  })
  .strict();

const RhythmSetDensitySchema = z
  .object({
    action: z.literal("set_density"),
    density: z.number().min(0).max(1),
    target: TargetRefSchema.optional(),
  })
  .strict();

const RhythmHumanizeTimingSchema = z
  .object({
    action: z.literal("humanize_timing"),
    amount: z.number().min(0).max(1),
    target: TargetRefSchema.optional(),
  })
  .strict();

export const RhythmIntentSchema = z.union([
  RhythmSetGrooveSchema,
  RhythmSetSwingSchema,
  RhythmSetSubdivisionSchema,
  RhythmSetPatternSchema,
  RhythmSetDensitySchema,
  RhythmHumanizeTimingSchema,
]);

const PerformanceTriggerSceneSchema = z
  .object({
    action: z.literal("trigger_scene"),
    scene_name: z.string(),
  })
  .strict();
const PerformanceTriggerClipSchema = z
  .object({
    action: z.literal("trigger_clip"),
    target: TargetRefSchema,
    clip_name: z.string(),
  })
  .strict();

export const PerformanceIntentSchema = z.union([
  PerformanceTriggerSceneSchema,
  PerformanceTriggerClipSchema,
]);

export const TimbreChangeSchema: z.ZodType<TimbreChange> = z
  .object({
    attribute: z.enum(timbreAttributes),
    amount: z.number().min(-1).max(1),
  })
  .strict();

const TimbreAdjustSchema = z
  .object({
    action: z.literal("adjust"),
    target: TargetRefSchema.optional(),
    attribute: z.enum(timbreAttributes),
    amount: z.number().min(-1).max(1),
    intensity: z.number().min(0).max(1).optional(),
    confidence: z.number().min(0).max(1).optional(),
    adjectives: z.array(z.string()).optional(),
  })
  .strict();

const TimbreAdjustManySchema = z
  .object({
    action: z.literal("adjust_many"),
    target: TargetRefSchema.optional(),
    changes: z.array(TimbreChangeSchema).min(1),
  })
  .strict();

export const TimbreIntentSchema = z.union([
  TimbreAdjustSchema,
  TimbreAdjustManySchema,
]);

export const IntentSchema = z.discriminatedUnion("domain", [
  z.object({ domain: z.literal("transport"), intent: TransportIntentSchema }).strict(),
  z.object({ domain: z.literal("structure"), intent: StructureIntentSchema }).strict(),
  z.object({ domain: z.literal("music"), intent: MusicIntentSchema }).strict(),
  z.object({ domain: z.literal("harmony"), intent: HarmonyIntentSchema }).strict(),
  z.object({ domain: z.literal("rhythm"), intent: RhythmIntentSchema }).strict(),
  z.object({ domain: z.literal("performance"), intent: PerformanceIntentSchema }).strict(),
  z.object({ domain: z.literal("timbre"), intent: TimbreIntentSchema }).strict(),
]);

export const IntentOrArraySchema = z.union([
  IntentSchema,
  z.array(IntentSchema),
]);

export const EnvelopeSchema = z.discriminatedUnion("domain", [
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("transport"),
      intent: TransportIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("structure"),
      intent: StructureIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("music"),
      intent: MusicIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("harmony"),
      intent: HarmonyIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("rhythm"),
      intent: RhythmIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("performance"),
      intent: PerformanceIntentSchema,
    })
    .strict(),
  z
    .object({
      version: z.literal("0.1"),
      id: z.string(),
      timestamp: z.number(),
      source: z.enum(sourceValues),
      domain: z.literal("timbre"),
      intent: TimbreIntentSchema,
    })
    .strict(),
]);

export const EnvelopeOrArraySchema = z.union([
  EnvelopeSchema,
  z.array(EnvelopeSchema),
]);

export const MIPMessageSchema = z.union([
  IntentSchema,
  z.array(IntentSchema),
  EnvelopeSchema,
  z.array(EnvelopeSchema),
]);

export const isValidIntent = (input: unknown): boolean =>
  IntentOrArraySchema.safeParse(input).success;
