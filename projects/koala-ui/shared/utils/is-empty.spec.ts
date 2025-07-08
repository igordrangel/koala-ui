import { test, expect } from "vitest"
import { isEmpty } from "./is-empty"

test('isEmpty', () => {
  expect(isEmpty(null)).toBe(true)
})
