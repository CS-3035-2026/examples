/**
 * The code the worker thread runs.
 *
 * Messages are arrays: [type, value]
 *  - main to worker:  ["generate", 100000]  start generating 100000 primes
 *  - worker to main:  ["progress", 0.5]     half done
 *  - worker to main:  ["done", 100000]      finished, with the number of primes
 *
 * The worker has no access to the DOM: it can only send messages.
 */

// intentionally inefficient: tests every possible divisor
function isPrime(n: number) {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) return false;
  }
  return true;
}

// generate the first n primes, sending progress messages as it goes
function generatePrimes(n: number) {
  let count = 0;
  let i = 1;
  let lastPercent = 0;
  while (count < n) {
    i++;
    if (isPrime(i)) {
      count++;
      // only send a message when the percentage changes,
      // not for every prime (that would flood the main thread)
      const percent = Math.floor((count / n) * 100);
      if (percent > lastPercent) {
        lastPercent = percent;
        postMessage(["progress", count / n]);
      }
    }
  }
  postMessage(["done", count]);
}

// receive messages from the main thread
addEventListener("message", (e: MessageEvent) => {
  const [type, value] = e.data;
  if (type === "generate") {
    generatePrimes(value);
  }
});
