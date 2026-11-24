/**
 * blocking: what happens when a long task is NOT handled asynchronously
 * DO NOT DO THIS!
 *
 * Demos (press Generate, then try each of these right away):
 *  - dispatch is blocked: try typing in the textarea
 *  - the Cancel button can't be clicked
 *  - even updating the DOM is blocked: "Starting ..." never appears,
 *    because the browser only redraws once the call stack is empty
 */

const countInput = document.getElementById("count") as HTMLInputElement;
const generateButton = document.getElementById("generate") as HTMLButtonElement;
const cancelButton = document.getElementById("cancel") as HTMLButtonElement;
const reloadButton = document.getElementById("reload") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLDivElement;

// intentionally inefficient: tests every possible divisor
function isPrime(n: number) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

// generate the first n primes (returns the largest one)
function generatePrimes(n: number) {
  let count = 0;
  let i = 1;
  while (count < n) {
    i++;
    if (isPrime(i)) count++;
  }
  return i;
}

generateButton.addEventListener("click", () => {
  const n = countInput.valueAsNumber;
  generateButton.disabled = true;
  cancelButton.disabled = false;

  // this DOM update doesn't appear: the long task below runs first
  output.textContent = "Starting ...";

  const start = performance.now();
  const largest = generatePrimes(n); // the long task
  const seconds = ((performance.now() - start) / 1000).toFixed(1);

  output.textContent = `Generated ${n} primes in ${seconds} s (the largest is ${largest})`;
  generateButton.disabled = false;
  cancelButton.disabled = true;
});

// never runs during the long task, so it can't stop it
cancelButton.addEventListener("click", () => {
  console.log("cancel");
});

reloadButton.addEventListener("click", () => location.reload());
