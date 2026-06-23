import { test, expect } from "@playwright/test";
import { withAnimationObserver } from "../e2e/utils";

const LIST = '[data-testid="list"]';

test.describe("Marko <auto-animate> — SSR + resume", () => {
  test("server-renders the list, resumes, and animates a post-resume mutation", async ({
    page,
    request,
  }) => {
    // (1) Server-rendered: the raw HTML (no client JS executed) already contains the list
    //     and its items, and the resume marker reads "no".
    const html = await (await request.get("/")).text();
    expect(html).toMatch(/data-testid=["']?list["']?/);
    expect(html).toContain("Item 1");
    expect(html).toContain("Item 3");
    expect(html).toMatch(/data-testid=["']?resumed["']?>\s*no/); // marker before any client JS

    // (2) The page resumes — client JS runs and flips the marker to "yes".
    await page.goto("/");
    await expect(page.getByTestId("resumed")).toHaveText("yes");

    const list = page.getByTestId("list");
    await expect(list.locator("li")).toHaveCount(3);

    // (3) The server-rendered children are NOT animated on load — auto-animate animates
    //     mutations, never the children already present when it attaches.
    const observer = await withAnimationObserver(page, LIST);
    expect(await observer.count()).toBe(0);

    // (4) After resume, a mutation animates — proving onMount wired autoAnimate to the
    //     server-rendered <ul>. The tag reads its parent as a real DOM node via the ref, so
    //     the leaf-first resume order (which broke marko-query's effect-to-effect handoff)
    //     is not a problem here: there is no sibling effect to wait on.
    await page.getByTestId("add").click();
    await expect(list.locator("li")).toHaveCount(4);
    await page.waitForTimeout(50);
    expect(await observer.count()).toBeGreaterThan(0);
  });

  test("plain options object survives resume", async ({ page }) => {
    await page.goto("/plain-options");
    await expect(page.getByTestId("resumed")).toHaveText("yes");
    const list = page.getByTestId("list");
    await expect(list.locator("li")).toHaveCount(3);

    const observer = await withAnimationObserver(page, LIST);
    await page.getByTestId("add").click();
    await expect(list.locator("li")).toHaveCount(4);
    await page.waitForTimeout(50);
    // A plain options object ({ duration, easing }) written inline crossed resume and the
    // tag still animates.
    expect(await observer.count()).toBeGreaterThan(0);
  });

  // Characterization (the run settles this). Per the marko-query finding, a function WRITTEN
  // INLINE in a template is compiled code and resumes, whereas a function arriving as a
  // separate runtime prop cannot be serialized across resume. An inline plugin is therefore
  // expected to resume and animate. If instead the server render throws a serialization error
  // (the route would 500 and this would fail at goto/resume), that confirms the opposite
  // boundary — and the documented contract becomes "plain options for SSR; a plugin needs a
  // client-only path."
  test("inline plugin option resumes and animates", async ({ page }) => {
    await page.goto("/plugin-options");
    await expect(page.getByTestId("resumed")).toHaveText("yes");
    const list = page.getByTestId("list");
    await expect(list.locator("li")).toHaveCount(3);

    const observer = await withAnimationObserver(page, LIST);
    await page.getByTestId("add").click();
    await expect(list.locator("li")).toHaveCount(4);
    await page.waitForTimeout(50);
    expect(await observer.count()).toBeGreaterThan(0);
  });
});
