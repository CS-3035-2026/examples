/**
 * fetch (with loader): the fetch example with a busy indicator
 *
 * The loader is a <div class="loader"> styled in loader.css. It is shown
 * when the fetch starts and hidden when it is done, whether it
 * succeeded or failed.
 *
 * Use network throttling in the developer tools (Network tab, "Slow 4G"
 * or "3G") to see the loader for longer.
 */

const urlSelect = document.getElementById("url") as HTMLSelectElement;
const fetchButton = document.getElementById("fetch") as HTMLButtonElement;
const loader = document.getElementById("loader") as HTMLDivElement;
const output = document.getElementById("output") as HTMLDivElement;

async function doFetch(url: string) {
  // show the busy indicator and stop a second fetch from starting
  loader.hidden = false;
  fetchButton.disabled = true;
  output.textContent = "";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    const json = await response.json();
    output.textContent = JSON.stringify(json, null, 2);
  } catch (error) {
    console.error(error);
    output.textContent = `Error: ${(error as Error).message}`;
  } finally {
    // runs after success or error, so the loader always goes away
    loader.hidden = true;
    fetchButton.disabled = false;
  }
}

fetchButton.addEventListener("click", () => doFetch(urlSelect.value));
