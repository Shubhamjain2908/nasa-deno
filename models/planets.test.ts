/**
 * Deno includes:
 * 
 * 1. The test runner in the CLI.
 * 2. Assertions in the standard library.
 * 3. Built-in test fixtures with Deno.test().
 */

import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

Deno.test("short example test", () => {
  assertNotEquals({
    runtime: "deno",
  }, {
    runtime: "node",
  });
});

Deno.test({
  name: "long example test",
  ignore: false,
  fn() {
    assertEquals("deno", "deno");
    assertNotEquals({
      runtime: "deno",
    }, {
      runtime: "node",
    });
  },
});

Deno.test({
  name: "only run on linux",
  ignore: !(Deno.build.os === "linux"),
  fn() {
    assertEquals("deno", "deno");
    assertNotEquals({
      runtime: "deno",
    }, {
      runtime: "node",
    });
  },
});

Deno.test({
  name: "async ops leak",
  sanitizeOps: false,
  fn() {
    setTimeout(console.log, 10000);
  },
});

Deno.test({
  name: "resource leak",
  sanitizeResources: false,
  async fn() {
    await Deno.open("./models/planets.ts");
  },
});
