import { test, expect } from '@playwright/test'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

test.describe('SVG type assignability (issue #100)', () => {
  test('autoAnimate and vAutoAnimate accept SVG elements', () => {
    const root = fileURLToPath(new URL('../..', import.meta.url))
    const tsc = path.join(root, 'node_modules/typescript/bin/tsc')
    let output = ''
    try {
      output = execFileSync(
        tsc,
        ['--pretty', 'false', '-p', 'tests/types/tsconfig.json'],
        { encoding: 'utf8', cwd: root },
      )
    } catch (err) {
      const error = err as { stdout?: string; stderr?: string }
      throw new Error(error.stdout || error.stderr || String(err))
    }
    expect(output).toBe('')
  })
})
