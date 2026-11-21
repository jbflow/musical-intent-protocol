# Musical Intent Protocol (MIP)

MIP is the canonical, versioned specification for expressing **musical intent** in a DAW-agnostic way. It sits above MIDI/OSC and plugin parameters, describing *what you want* rather than *how a specific host achieves it*.

## Why MIP

- **Host-agnostic**: no DAW IDs, no plugin parameters, no track indices.
- **Intent-first**: semantic actions like “quantize the drums” or “make the bass warmer”.
- **Perceptual timbre layer**: continuous, human-adjective controls (warmth, width, tightness).

## Versioning

This repo starts at **v0.2**. New versions will be added in versioned folders under src.

## Domains (v0.2)

- **transport**: play/stop/record/locate/tempo/time signature/loop/metronome
- **structure**: create/select/arm/mute/solo/load device/rename/duplicate/remove
- **music**: editing operations (quantize/transpose/key signature) plus note-level add/remove/edit
- **harmony**: 12-TET pitch language (keys, scales, chords, progressions, ranges)
- **rhythm**: groove/swing/subdivision/density/pattern/timing humanization
- **performance**: trigger clip/scene (reserved for growth)
- **analysis**: query/summarize/describe/list musical material for AI feedback
- **pitch**: parameter series for pitch-class or pitch sets (Babbitt-inspired)
- **duration**: parameter series for durations and rhythmic values
- **dynamics**: parameter series for intensity/velocity curves
- **articulation**: parameter series for performance character (legato, staccato, etc.)
- **instrumentation**: parameter series for instrument/voice assignment
- **time_point**: parameter series for time-point systems
- **timbre**: perceptual adjectives (warmth, brightness, punch, width, distance, space, energy, tightness)

## Roles

Roles cover common production layers while staying host-agnostic. To avoid an endlessly growing list, use:

- `role` for canonical, interoperable categories (e.g., `drums`, `bass`, `lead`, `pad`, `vocal`, `fx`, `strings`).
- `role_category` for broad musical function (`rhythm`, `harmony`, `melody`, `vocal`, `texture`, `fx`, `utility`).
- `role_detail` for extension beyond the core list (e.g., `snare`, `808`, `counter_melody`).

This keeps the protocol stable while letting interpreters support deeper naming when needed.

## Envelopes vs. Intents

A common envelope is recommended for engine use:

```json
{
  "version": "0.2",
  "id": "uuid",
  "timestamp": 1739579325000,
  "source": "ui",
  "domain": "timbre",
  "intent": {
    "action": "adjust",
    "target": { "role": "bass" },
    "attribute": "warmth",
    "amount": 0.35
  }
}
```

Raw intents can also be sent as single objects or arrays:

```json
{
  "domain": "transport",
  "intent": { "action": "play" }
}
```

## Timbre (Perceptual Layer)

Timbre intents are **semantic** and **continuous**. They never include EQ frequencies, compressor parameters, or plugin IDs.

```json
{
  "domain": "timbre",
  "intent": {
    "action": "adjust",
    "target": { "role": "bass" },
    "attribute": "warmth",
    "amount": 0.35
  }
}
```

Multi-attribute edit:

```json
{
  "domain": "timbre",
  "intent": {
    "action": "adjust_many",
    "target": { "role": "vocal" },
    "changes": [
      { "attribute": "warmth", "amount": 0.2 },
      { "attribute": "brightness", "amount": -0.15 },
      { "attribute": "space", "amount": 0.3 }
    ]
  }
}
```

## Harmony (12-TET)

Harmony intents express 12-TET structure (keys, scales, chords, and progressions):

```json
{
  "domain": "harmony",
  "intent": {
    "action": "set_key",
    "tonic": "D",
    "scale": "dorian"
  }
}
```

## Rhythm

Rhythm intents describe groove and timing behavior:

```json
{
  "domain": "rhythm",
  "intent": {
    "action": "set_swing",
    "amount": 0.6,
    "target": { "role": "drums", "role_detail": "hihat" }
  }
}
```

## TypeScript + Zod

- Types in src/v0_1/mip.ts
- Zod validators in src/v0_1/zod.ts
- JSON Schema in schema/mip-0.1.schema.json

## Helpers

- `normalizeToArray(input)`
- `makeEnvelope(input)`
- `makeIntent(domain, intent)`
- `isValidIntent(value)`

## Examples

See the examples folder for JSON files that validate against v0.2.

## Build

- `npm run build`
- `npm run test`

## License

MIT
