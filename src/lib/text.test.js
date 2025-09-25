import { describe, it, expect } from "vitest";
import { truncate } from "./text";

describe("truncate", () => {
  it("should return the string when short", () => {
    expect(truncate("hello", 10)).toBe("hello");
  })
  it("should truncate when long", () => {
    expect(truncate("a".repeat(60), 10)).toBe("aaaaaaaaaa...");
  })
})
