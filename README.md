# Musical Intent Protocol (MIP)

MIP is a canonical, versioned specification for expressing **musical intent** through a new, host-agnostic musical language. Alongside established musical communication protocols such as MIDI and OSC, MIP introduces a way to express *what you want to do musically*, rather than the specific messages or parameters used to achieve it. It provides a shared, structured language for describing musical actions, independent of any particular DAW, instrument or platform.

## Why MIP

- **Host-agnostic**: a consistent musical language that can be interpreted across different DAWs, instruments and environments.
- **Intent-first**: expresses musical actions and goals, from direct operations to higher-level requests like “quantize the drums” or “make the bass warmer”.
- **Expressive and precise**: supports both semantic musical concepts and concrete instructions, including track references, plugin parameters and values.
- **Perceptual timbre layer**: introduces continuous, human-readable controls for qualities such as warmth, width and tightness.

## Versioning

New versions are added in versioned folders under src (`src/v0_2`, `src/v0_3`). The package root and `./v0_3` export the latest version; `./v0_2` remains available as a versioned export.

**v0.3 adds the parameters domain.**

## Domains (v0.3)

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
- **parameters** (v0.3 only): explicit device-parameter control (increase/decrease/set a named parameter on a named device)

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
  "version": "0.3",
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

## Parameters (Explicit Device Control)

Parameters intents address a specific parameter on a specific device and carry a numeric `amount` with an optional `unit` (`db`, `hz`, `ms`, `%`). `increase` and `decrease` apply `amount` as a relative change; `set` applies it as an absolute value.

```json
{
  "domain": "parameters",
  "intent": {
    "action": "increase",
    "target": { "role": "bass", "device_name": "Compressor", "parameter_name": "Attack" },
    "amount": 5,
    "unit": "ms"
  }
}
```

The `target` combines track selection (`role`/`role_detail`/`track_name`/`track_id`/`index`), device selection (`device_name`/`device_index`) and parameter selection (`parameter_name`/`parameter_index`); at least one parameter selector is required.

**Parameters vs. timbre:** `parameters` is *explicit* device control: you name the device and parameter and the value to apply, so the intent is tied to what is loaded on the track. `timbre` is *perceptual*: you say “warmer” or “wider” and the interpreter decides which devices and parameters to move. Prefer `timbre` for host-agnostic intent and use `parameters` only when the exact control matters. This is also why the parameters target may include names and indices that other domains avoid.

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

- Types in src/v0_3/mip.ts
- Zod validators in src/v0_3/zod.ts
- JSON Schema in schema/mip-0.3.schema.json (earlier versions: src/v0_2, schema/mip-0.2.schema.json)

## Helpers

- `normalizeToArray(input)`
- `makeEnvelope(input)`
- `makeIntent(domain, intent)`
- `isValidIntent(value)`

## Examples

See the examples folder for JSON files that validate against v0.3.

## Build

- `npm run build`
- `npm run test`

## License

MIT
