import { Intent } from "./mip";

export const transportPlayExample: Intent = {
  domain: "transport",
  intent: { action: "play" },
};

export const transportSetTempoExample: Intent = {
  domain: "transport",
  intent: { action: "set_tempo", bpm: 128 },
};

export const structureCreateTrackExample: Intent = {
  domain: "structure",
  intent: { action: "create_track", role: "drums", type: "audio" },
};

export const structureRenameTrackExample: Intent = {
  domain: "structure",
  intent: { action: "rename_track", target: { track_name: "Drums" }, name: "Beats" },
};

export const structureDuplicateTrackExample: Intent = {
  domain: "structure",
  intent: { action: "duplicate_track", target: { role: "bass" }, name: "Bass Double" },
};

export const musicQuantizeExample: Intent = {
  domain: "music",
  intent: {
    action: "quantize",
    target: { role: "drums" },
    strength: 0.8,
  },
};

export const musicAddNotesExample: Intent = {
  domain: "music",
  intent: {
    action: "add_notes",
    target: { role: "lead", clip_name: "Verse Lead" },
    notes: [
      { pitch: "C#4", start_beats: 0, duration_beats: 1, velocity: 0.8 },
      { pitch: "E4", start_beats: 1, duration_beats: 1, velocity: 0.78 },
      { pitch: "G#4", start_beats: 2, duration_beats: 2, velocity: 0.82 },
    ],
  },
};

export const musicEditNotesExample: Intent = {
  domain: "music",
  intent: {
    action: "edit_notes",
    target: { role: "lead", clip_name: "Verse Lead" },
    selection: { pitches: ["C#4", "E4"] },
    operation: { type: "set_velocity", velocity: 0.7 },
  },
};

export const harmonySetKeyExample: Intent = {
  domain: "harmony",
  intent: {
    action: "set_key",
    tonic: "D",
    scale: "dorian",
  },
};

export const rhythmSetSwingExample: Intent = {
  domain: "rhythm",
  intent: {
    action: "set_swing",
    amount: 0.6,
    target: { role: "drums", role_detail: "hihat" },
  },
};

export const timbreWarmthExample: Intent = {
  domain: "timbre",
  intent: {
    action: "adjust",
    target: { role: "bass" },
    attribute: "warmth",
    amount: 0.35,
  },
};

export const timbreWidthExample: Intent = {
  domain: "timbre",
  intent: {
    action: "adjust",
    target: { role: "master" },
    attribute: "width",
    amount: 0.2,
    intensity: 0.6,
  },
};

export const timbreMultiAdjustExample: Intent = {
  domain: "timbre",
  intent: {
    action: "adjust_many",
    target: { role: "vocal" },
    changes: [
      { attribute: "warmth", amount: 0.2 },
      { attribute: "brightness", amount: -0.15 },
      { attribute: "space", amount: 0.3 },
    ],
  },
};

export const analysisQueryExample: Intent = {
  domain: "analysis",
  intent: {
    action: "query",
    question: "What is the harmonic center of the chorus?",
    target: { scene_name: "Chorus" },
    format: "text",
  },
};

export const pitchSeriesExample: Intent = {
  domain: "pitch",
  intent: {
    action: "set_series",
    series: [0, 2, 5, 7, 11],
    target: { role: "pad" },
  },
};

export const durationSeriesExample: Intent = {
  domain: "duration",
  intent: {
    action: "set_series",
    series: [1, 0.5, 0.5, 2],
    target: { role: "pad" },
  },
};

export const dynamicsSeriesExample: Intent = {
  domain: "dynamics",
  intent: {
    action: "set_series",
    series: [0.4, 0.6, 0.5, 0.8],
    target: { role: "pad" },
  },
};

export const articulationSeriesExample: Intent = {
  domain: "articulation",
  intent: {
    action: "set_series",
    series: ["legato", "staccato", "tenuto"],
    target: { role: "strings" },
  },
};

export const instrumentationSeriesExample: Intent = {
  domain: "instrumentation",
  intent: {
    action: "set_series",
    series: ["piano", "synth", "strings"],
    target: { role: "pad" },
  },
};

export const timePointSeriesExample: Intent = {
  domain: "time_point",
  intent: {
    action: "set_series",
    series: [0, 1.5, 3, 4.5],
    target: { role: "lead" },
  },
};

export const multiIntentExample: Intent[] = [
  transportPlayExample,
  musicQuantizeExample,
  harmonySetKeyExample,
  rhythmSetSwingExample,
  timbreWarmthExample,
  analysisQueryExample,
];
