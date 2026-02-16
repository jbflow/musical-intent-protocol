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

export const musicQuantizeExample: Intent = {
  domain: "music",
  intent: {
    action: "quantize",
    target: { role: "drums" },
    strength: 0.8,
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

export const multiIntentExample: Intent[] = [
  transportPlayExample,
  musicQuantizeExample,
  harmonySetKeyExample,
  rhythmSetSwingExample,
  timbreWarmthExample,
];
