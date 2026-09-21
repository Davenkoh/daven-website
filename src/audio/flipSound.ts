import { useAudioStore } from '@/store/useAudioStore'

const SAMPLE_SRC = '/audio/page-flip.mp3'
let ctx: AudioContext | null = null
/** undefined = not tried yet, null = no file (use the synthesised swish) */
let sample: AudioBuffer | null | undefined

async function loadSample(audio: AudioContext) {
  try {
    const head = await fetch(SAMPLE_SRC, { method: 'HEAD' })
    if (!head.ok || !(head.headers.get('content-type') ?? '').startsWith('audio/')) return
    const bytes = await (await fetch(SAMPLE_SRC)).arrayBuffer()
    sample = await audio.decodeAudioData(bytes)
  } catch {
    /* keep the synthesised sound */
  }
}

/**
 * A short page-turn sound. Uses public/audio/page-flip.mp3 when that file exists,
 * otherwise a filtered noise burst that reads as paper sliding over paper.
 */
export function playFlipSound(volume = 0.32) {
  if (useAudioStore.getState().muted) return
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    if (sample === undefined) {
      sample = null
      void loadSample(ctx)
    }
    const now = ctx.currentTime
    const gain = ctx.createGain()
    gain.gain.value = volume
    gain.connect(ctx.destination)

    if (sample) {
      const src = ctx.createBufferSource()
      src.buffer = sample
      src.connect(gain)
      src.start(now)
      return
    }

    const dur = 0.22
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      const t = i / data.length
      const attack = t < 0.06 ? t / 0.06 : 1
      data[i] = (Math.random() * 2 - 1) * attack * Math.pow(1 - t, 1.7)
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    const highpass = ctx.createBiquadFilter()
    highpass.type = 'highpass'
    highpass.frequency.value = 600
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.Q.value = 0.8
    band.frequency.setValueAtTime(1000, now)
    band.frequency.exponentialRampToValueAtTime(3400, now + dur * 0.55)
    src.connect(highpass)
    highpass.connect(band)
    band.connect(gain)
    src.start(now)
    src.stop(now + dur)
  } catch {
    /* no audio available */
  }
}
