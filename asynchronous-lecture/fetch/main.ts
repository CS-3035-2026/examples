/**
 * fetch: getting a resource from the network asynchronously
 *
 * Demos:
 *  - fetch() returns a Promise right away, so the UI stays responsive
 *  - use network throttling in the developer tools (Network tab,
 *    "Slow 4G" or "3G") to simulate a slow connection
 *  - doFetch1() uses Promises: fetch() with chained .then( ... ) and
 *    .catch( ... ) for error handling
 *  - doFetch2() does the same thing with async/await
 *
 * The last two URLs in the list show the two kinds of error:
 *  - the server answers with an error (404): the Promise still resolves,
 *    so check response.ok
 *  - the server can't be reached: the Promise is rejected
 */

const urlSelect = document.getElementById("url") as HTMLSelectElement;
const fetchButton = document.getElementById("fetch") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;

// using Promises: each .then( ... ) gets the result of the step before
function doFetch1(url: string) {
  console.log("doFetch1 start");
  fetch(url)
    .then((response) => {
      console.log("response", response.status);
      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }
      // reading the body is asynchronous too, so json() returns a Promise
      return response.json();
    })
    .then((json) => {
      output.textContent = JSON.stringify(json, null, 2);
    })
    .catch((error) => {
      console.error(error);
      output.textContent = `Error: ${error.message}`;
    });
  // this runs before the fetch is done
  console.log("doFetch1 end");
}

// using async/await: reads like synchronous code, but await gives
// control back to the event loop until the Promise is settled
async function doFetch2(url: string) {
  console.log("doFetch2 start");
  try {
    const response = await fetch(url);
    console.log("response", response.status);
    if (!response.ok) {
      throw new Error(`HTTP status ${response.status}`);
    }
    const json = await response.json();
    output.textContent = JSON.stringify(json, null, 2);
  } catch (error) {
    console.error(error);
    output.textContent = `Error: ${(error as Error).message}`;
  }
  // with await, this runs after the fetch is done
  console.log("doFetch2 end");
}

fetchButton.addEventListener("click", () => {
  output.textContent = "";
  doFetch1(urlSelect.value);
  // doFetch2(urlSelect.value);
});
