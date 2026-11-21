import { describe, expect, it } from "vitest";
import {
  EnvelopeSchema,
  IntentSchema,
  MIPMessageSchema,
  isValidIntent,
  makeEnvelope,
  makeIntent,
  normalizeToArray,
  type Intent,
  type NoteOperation,
  type SeriesTransformOperation
} from "../src/index";

const target = { role: "bass" } as const;
const selection = { pitches: ["C4"] };
const noteOperations: NoteOperation[] = [
  { type: "set_velocity", velocity: 0.8 },
  { type: "set_duration", duration_beats: 2 },
  { type: "set_start", start_beats: 1.5 },
  { type: "set_pitch", pitch: "D4" },
  { type: "transpose", semitones: 2 },
  { type: "quantize", strength: 0.5 },
  { type: "humanize", amount: 0.2 }
];
const transforms: SeriesTransformOperation[] = [
  "invert",
  "retrograde",
  "rotate",
  "shuffle",
  "stretch",
  "compress"
];

const intents: Array<{ name: string; intent: Intent }> = [
  { name: "transport.play", intent: { domain: "transport", intent: { action: "play" } } },
  { name: "transport.stop", intent: { domain: "transport", intent: { action: "stop" } } },
  { name: "transport.record", intent: { domain: "transport", intent: { action: "record" } } },
  { name: "transport.toggle_record", intent: { domain: "transport", intent: { action: "toggle_record" } } },
  { name: "transport.locate.bars", intent: { domain: "transport", intent: { action: "locate", bars: 4, beats: 2 } } },
  { name: "transport.locate.timecode", intent: { domain: "transport", intent: { action: "locate", timecode: "01:02:03.5" } } },
  { name: "transport.set_tempo", intent: { domain: "transport", intent: { action: "set_tempo", bpm: 128 } } },
  { name: "transport.set_time_signature", intent: { domain: "transport", intent: { action: "set_time_signature", numerator: 7, denominator: 8 } } },
  { name: "transport.metronome_on", intent: { domain: "transport", intent: { action: "metronome_on" } } },
  { name: "transport.metronome_off", intent: { domain: "transport", intent: { action: "metronome_off" } } },
  { name: "transport.loop_on", intent: { domain: "transport", intent: { action: "loop_on" } } },
  { name: "transport.loop_off", intent: { domain: "transport", intent: { action: "loop_off" } } },
  { name: "transport.set_loop", intent: { domain: "transport", intent: { action: "set_loop", startBars: 2, lengthBars: 4 } } },
  { name: "structure.create_track", intent: { domain: "structure", intent: { action: "create_track", role: "bass", type: "audio" } } },
  { name: "structure.rename_track", intent: { domain: "structure", intent: { action: "rename_track", target, name: "Low Bass" } } },
  { name: "structure.duplicate_track", intent: { domain: "structure", intent: { action: "duplicate_track", target, name: "Bass Copy" } } },
  { name: "structure.remove_track", intent: { domain: "structure", intent: { action: "remove_track", target } } },
  { name: "structure.select_track", intent: { domain: "structure", intent: { action: "select_track", target } } },
  { name: "structure.arm_track", intent: { domain: "structure", intent: { action: "arm_track", target } } },
  { name: "structure.disarm_track", intent: { domain: "structure", intent: { action: "disarm_track", target } } },
  { name: "structure.mute", intent: { domain: "structure", intent: { action: "mute", target } } },
  { name: "structure.unmute", intent: { domain: "structure", intent: { action: "unmute", target } } },
  { name: "structure.solo", intent: { domain: "structure", intent: { action: "solo", target } } },
  { name: "structure.unsolo", intent: { domain: "structure", intent: { action: "unsolo", target } } },
  { name: "structure.load_device", intent: { domain: "structure", intent: { action: "load_device", target, device: "Reverb", kind: "effect" } } },
  { name: "music.quantize", intent: { domain: "music", intent: { action: "quantize", target, strength: 0.5 } } },
  { name: "music.transpose", intent: { domain: "music", intent: { action: "transpose", target, semitones: 2 } } },
  { name: "music.set_key_signature", intent: { domain: "music", intent: { action: "set_key_signature", key: "C", scale: "major" } } },
  { name: "music.add_notes", intent: { domain: "music", intent: { action: "add_notes", target, notes: [{ pitch: "C4", start_beats: 0, duration_beats: 1 }] } } },
  { name: "music.remove_notes", intent: { domain: "music", intent: { action: "remove_notes", target, selection } } },
  ...noteOperations.map((operation) => ({
    name: `music.edit_notes.${operation.type}`,
    intent: { domain: "music", intent: { action: "edit_notes", target, selection, operation } } as Intent
  })),
  { name: "harmony.set_key", intent: { domain: "harmony", intent: { action: "set_key", tonic: "D", scale: "dorian" } } },
  { name: "harmony.set_chord", intent: { domain: "harmony", intent: { action: "set_chord", chord: "Cmaj7", target } } },
  { name: "harmony.set_chord_progression", intent: { domain: "harmony", intent: { action: "set_chord_progression", progression: ["I", "V"], notation: "roman", target } } },
  { name: "harmony.set_pitch_range", intent: { domain: "harmony", intent: { action: "set_pitch_range", low: "C2", high: "C6", target } } },
  { name: "rhythm.set_groove", intent: { domain: "rhythm", intent: { action: "set_groove", groove: "swing", target } } },
  { name: "rhythm.set_swing", intent: { domain: "rhythm", intent: { action: "set_swing", amount: 0.6, target } } },
  { name: "rhythm.set_subdivision", intent: { domain: "rhythm", intent: { action: "set_subdivision", subdivision: "1/16", target } } },
  { name: "rhythm.set_rhythm_pattern", intent: { domain: "rhythm", intent: { action: "set_rhythm_pattern", pattern: "boom bap", target } } },
  { name: "rhythm.set_density", intent: { domain: "rhythm", intent: { action: "set_density", density: 0.7, target } } },
  { name: "rhythm.humanize_timing", intent: { domain: "rhythm", intent: { action: "humanize_timing", amount: 0.3, target } } },
  { name: "performance.trigger_scene", intent: { domain: "performance", intent: { action: "trigger_scene", scene_name: "Chorus" } } },
  { name: "performance.trigger_clip", intent: { domain: "performance", intent: { action: "trigger_clip", target, clip_name: "Bass" } } },
  { name: "analysis.summarize", intent: { domain: "analysis", intent: { action: "summarize", target, detail: "detailed" } } },
  { name: "analysis.describe", intent: { domain: "analysis", intent: { action: "describe", target, focus: "rhythm" } } },
  { name: "analysis.query", intent: { domain: "analysis", intent: { action: "query", question: "What changed?", target, format: "json" } } },
  { name: "analysis.list", intent: { domain: "analysis", intent: { action: "list", kind: "tracks", target } } },
  ...(["pitch", "duration", "dynamics", "articulation", "instrumentation", "time_point"] as const).flatMap((domain) => [
    { name: `${domain}.set_value`, intent: { domain, intent: { action: "set_value", value: 1 } } as Intent },
    { name: `${domain}.set_series`, intent: { domain, intent: { action: "set_series", series: [1, "C4"] } } as Intent },
    ...transforms.map((operation) => ({
      name: `${domain}.transform_series.${operation}`,
      intent: { domain, intent: { action: "transform_series", operation, amount: 2 } } as Intent
    })),
    { name: `${domain}.map`, intent: { domain, intent: { action: "map", source: "source", destination: "destination" } } as Intent }
  ]),
  { name: "timbre.adjust", intent: { domain: "timbre", intent: { action: "adjust", attribute: "warmth", amount: 0.2 } } },
  { name: "timbre.adjust_many", intent: { domain: "timbre", intent: { action: "adjust_many", changes: [{ attribute: "warmth", amount: 0.2 }, { attribute: "width", amount: -0.1 }] } } }
];

describe("MIP schema action coverage", () => {
  for (const { name, intent } of intents) {
    it(`accepts ${name}`, () => {
      const result = IntentSchema.safeParse(intent);
      if (!result.success) {
        throw new Error(`${name}: ${JSON.stringify(result.error.issues)}`);
      }
    });
  }

  it("creates a valid envelope and rejects an unknown action", () => {
    const envelope = makeEnvelope({
      id: "11111111-1111-4111-8111-111111111111",
      timestamp: 1,
      source: "test",
      domain: "transport",
      intent: { action: "play" }
    });

    expect(EnvelopeSchema.safeParse(envelope).success).toBe(true);
    expect(IntentSchema.safeParse({ domain: "transport", intent: { action: "launch" } }).success).toBe(false);
  });

  it("normalizes single and array intents and validates message unions", () => {
    const intent = makeIntent("transport", { action: "play" });
    const envelope = makeEnvelope({ domain: "transport", intent: intent.intent, source: "test" });

    expect(normalizeToArray(intent)).toEqual([intent]);
    expect(normalizeToArray([intent])).toEqual([intent]);
    expect(MIPMessageSchema.safeParse(intent).success).toBe(true);
    expect(MIPMessageSchema.safeParse([intent]).success).toBe(true);
    expect(MIPMessageSchema.safeParse(envelope).success).toBe(true);
    expect(MIPMessageSchema.safeParse([envelope]).success).toBe(true);
    expect(isValidIntent(intent)).toBe(true);
    expect(isValidIntent([intent])).toBe(true);
    expect(isValidIntent({ type: "unknown" })).toBe(false);
  });

  it("generates a fallback envelope ID when crypto.randomUUID is unavailable", () => {
    const cryptoDescriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");
    try {
      Object.defineProperty(globalThis, "crypto", { configurable: true, value: {} });
      const envelope = makeEnvelope({
        domain: "transport",
        intent: { action: "play" },
        source: "test"
      });

      expect(envelope.id).toMatch(/^mip_/);
      expect(envelope.version).toBe("0.2");
      expect(typeof envelope.timestamp).toBe("number");
    } finally {
      if (cryptoDescriptor) {
        Object.defineProperty(globalThis, "crypto", cryptoDescriptor);
      } else {
        Reflect.deleteProperty(globalThis, "crypto");
      }
    }
  });
});