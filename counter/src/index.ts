let count = 0;

async function hello(person: string) {
  return `Hello, ${person}!`;
}
edgeDriverSdk.registerDriverFunction('Hello', hello);

async function increment() {
  count += 1;
  return count;
}
edgeDriverSdk.registerDriverFunction('Increment', increment);

async function decrement() {
  count -= 1;
  return count;
}
edgeDriverSdk.registerDriverFunction('Decrement', decrement);

async function reset() {
  count = 0;
  return null;
}
edgeDriverSdk.registerDriverFunction('Reset', reset);

console.log('counter driver loaded');
edgeDriverSdk.fireEvent('Driver Started', `Current Count: ${count}`);
