import { execa } from 'execa'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import fs from 'node:fs/promises'
import path from 'node:path'

export async function getVideoDurationSec(videoPath: string): Promise<number> {
  const { stdout } = await execa('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1',
    videoPath,
  ])
  return parseFloat(stdout.trim())
}

export async function extractFrameAt(videoPath: string, timeSec: number, outPath: string): Promise<void> {
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await execa('ffmpeg', [
    '-loglevel', 'error',
    '-y',
    '-ss', timeSec.toFixed(3),
    '-i', videoPath,
    '-frames:v', '1',
    '-q:v', '2',
    outPath,
  ])
}

export async function diffImages(aPath: string, bPath: string): Promise<{ ratio: number; pixels: number }> {
  const [aBuf, bBuf] = await Promise.all([fs.readFile(aPath), fs.readFile(bPath)])
  const imgA = PNG.sync.read(aBuf)
  const imgB = PNG.sync.read(bBuf)
  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    throw new Error(`Image size mismatch: ${imgA.width}x${imgA.height} vs ${imgB.width}x${imgB.height}`)
  }
  const { width, height } = imgA
  const diff = new PNG({ width, height })
  const pixels = pixelmatch(imgA.data, imgB.data, diff.data, width, height, { threshold: 0.1 })
  const ratio = pixels / (width * height)
  return { ratio, pixels }
}


