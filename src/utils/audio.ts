// Romantic synthesized wedding melody & sound effects using Web Audio API

class WeddingAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.4;
  private timerId: number | null = null;
  private currentStep = 0;
  private gainNode: GainNode | null = null;

  // Romantic chord progression in D Major / G Major (D - A - Bm - F#m - G - D - G - A)
  // Frequencies for a romantic harp / acoustic electric piano feel
  private readonly notes = [
    // Step 0: D major arpeggio
    [293.66, 369.99, 440.00, 587.33],
    // Step 1: A major
    [220.00, 277.18, 329.63, 440.00],
    // Step 2: B minor
    [246.94, 293.66, 369.99, 493.88],
    // Step 3: F# minor
    [185.00, 220.00, 277.18, 369.99],
    // Step 4: G major
    [196.00, 246.94, 293.66, 392.00],
    // Step 5: D major
    [220.00, 293.66, 369.99, 440.00],
    // Step 6: G major high
    [293.66, 392.00, 493.88, 587.33],
    // Step 7: A sus / A major resolution
    [220.00, 293.66, 329.63, 440.00, 554.37]
  ];

  private getContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public playNote(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine', decayTime = 1.6) {
    const ctx = this.getContext();
    if (!this.gainNode) return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // Warm harmonics: slight detune for lush chorus effect
    osc.detune.setValueAtTime((Math.random() - 0.5) * 8, startTime);

    // Envelope: soft bell/harp attack and long gentle release
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + decayTime);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration + decayTime + 0.1);
  }

  private scheduleNextMeasure = () => {
    if (!this.isPlaying) return;
    const ctx = this.getContext();
    const chord = this.notes[this.currentStep % this.notes.length];
    const now = ctx.currentTime;

    // Arpeggiate the 4 notes with gentle harp timing
    chord.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.28, 1.2, 'sine', 1.8);
      // Soft overtone
      if (idx === 0) {
        this.playNote(freq * 0.5, now, 2.0, 'triangle', 2.0); // Warm bass note
      }
    });

    this.currentStep = (this.currentStep + 1) % this.notes.length;
    // Step takes roughly 1.4 seconds
    this.timerId = window.setTimeout(this.scheduleNextMeasure, 1400);
  };

  public start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.getContext();
    this.scheduleNextMeasure();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Celebratory sound when scratch card reveals date or RSVP submitted
  public playCelebrationChime() {
    const ctx = this.getContext();
    const now = ctx.currentTime;
    // Ascending joyous harp sparkle: C5, E5, G5, B5, C6, E6
    const arpeggio = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];
    arpeggio.forEach((freq, i) => {
      this.playNote(freq, now + i * 0.09, 0.8, 'sine', 1.5);
    });
  }

  // Scratch sound effect (soft gentle noise burst)
  public playScratchTick() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }
}

export const weddingAudio = new WeddingAudioManager();
