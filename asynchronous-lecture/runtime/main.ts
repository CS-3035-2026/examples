/**
 * runtime: a walkthrough of the JavaScript runtime environment
 * (call stack, Web APIs, task queue and event loop).
 * Open the developer tools console to see the output.
 *
 * Demos:
 *  1. What if the timer is 0ms?
 *  2. Uncomment long() in main
 *  3. Uncomment long() in the button callback
 */

// a long task: keeps the call stack busy for ms milliseconds
function long(ms = 5000) {
  console.log(`🐢 long task for ${ms} ms`);
  const end = performance.now() + ms;
  while (performance.now() < end) {
    // busy wait: nothing else can run on this thread
  }
  console.log("🐢 long task done");
}

console.log("start");

// the timer runs in the Web APIs; when it expires, the callback
// goes into the task queue, and the event loop moves it to the call
// stack once the call stack is empty
// (demo 1: what if the timer is 0ms?)
setTimeout(() => {
  console.log("⏰");
}, 2000);

function bar() {
  console.log("bar");
}

function foo() {
  bar();
  console.log("foo");
}

foo();

// input events are asynchronous too: the callback goes into the
// task queue when the button is clicked
const button = document.getElementById("button") as HTMLButtonElement;
button.addEventListener("click", () => {
  console.log("💥 button");
  // demo 3: a long task in a callback blocks everything after it
  // long();
});

// demo 2: a long task in main delays the timer and button callbacks
// long();

console.log("end");
