/**
 * worker: the same long task as "blocking", but run in a worker thread
 *
 *  - create a dedicated worker; generate.ts has the code it runs
 *  - worker.postMessage( ... ) sends a message to the worker
 *  - worker.addEventListener("message", ... ) receives its messages
 *  - an HTML <progress> element shows the progress messages
 *
 * Press Generate: the textarea, Cancel button and progress bar all
 * keep working, because the main thread is free to handle events
 * and redraw.
 */

const countInput = document.getElementById("count") as HTMLInputElement;
const generateButton = document.getElementById("generate") as HTMLButtonElement;
const cancelButton = document.getElementById("cancel") as HTMLButtonElement;
const reloadButton = document.getElementById("reload") as HTMLButtonElement;
const progress = document.getElementById("progress") as HTMLProgressElement;
const output = document.getElementById("output") as HTMLDivElement;

let worker: Worker;
let start = 0;

function createWorker() {
  // { type: "module" } lets the worker be a TypeScript module (Vite
  // compiles it); new URL(...) finds generate.ts relative to this file
  worker = new Worker(new URL("./generate.ts", import.meta.url), {
    type: "module",
  });

  // receive messages from the worker
  worker.addEventListener("message", (e: MessageEvent) => {
    const [type, value] = e.data;
    switch (type) {
      case "progress":
        progress.value = value;
        output.textContent = `Generating primes... ${Math.round(value * 100)}% complete`;
        break;
      case "done": {
        const seconds = ((performance.now() - start) / 1000).toFixed(1);
        progress.value = 1;
        output.textContent = `Generated ${value} primes in ${seconds} s`;
        finished();
        break;
      }
    }
  });
}

function finished() {
  generateButton.disabled = false;
  cancelButton.disabled = true;
}

generateButton.addEventListener("click", () => {
  generateButton.disabled = true;
  cancelButton.disabled = false;
  progress.value = 0;
  // this DOM update appears right away
  output.textContent = "Starting ...";
  start = performance.now();

  // send a message to the worker to start the long task
  worker.postMessage(["generate", countInput.valueAsNumber]);
});

// the worker can't check for a cancel message while its loop is
// running, so stop it (terminate) and create a new one for next time
cancelButton.addEventListener("click", () => {
  worker.terminate();
  createWorker();
  output.textContent = "Cancelled";
  finished();
});

reloadButton.addEventListener("click", () => location.reload());

createWorker();
