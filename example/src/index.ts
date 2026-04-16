// Functions

async function functionWithNoOutputValue(stringInput: string) {
  console.log(`functionWithNoOutputValue called with: ${stringInput}`);
}
edgeDriverSdk.registerDriverFunction('functionWithNoOutputValue', functionWithNoOutputValue);

async function functionWithStringOutputValue(stringInput: string) {
  return stringInput;
}
edgeDriverSdk.registerDriverFunction(
  'functionWithStringOutputValue',
  functionWithStringOutputValue,
);

async function functionWithIntegerOutputValue(integerInput: number) {
  return integerInput;
}
edgeDriverSdk.registerDriverFunction(
  'functionWithIntegerOutputValue',
  functionWithIntegerOutputValue,
);

async function functionWithFloatOutputValue(floatInput: number) {
  return floatInput;
}
edgeDriverSdk.registerDriverFunction('functionWithFloatOutputValue', functionWithFloatOutputValue);

async function functionWithBooleanOutputValue(booleanInput: boolean) {
  return booleanInput;
}
edgeDriverSdk.registerDriverFunction(
  'functionWithBooleanOutputValue',
  functionWithBooleanOutputValue,
);

async function functionWithObjectOutputValue(stringInput: string) {
  return {
    stringValue: stringInput,
    integerValue: 42,
    floatValue: 3.14,
    booleanValue: true,
  };
}
edgeDriverSdk.registerDriverFunction(
  'functionWithObjectOutputValue',
  functionWithObjectOutputValue,
);

async function functionWith2IntegerInputs(input1: number, input2: number) {
  return input1 + input2;
}
edgeDriverSdk.registerDriverFunction('functionWith2IntegerInputs', functionWith2IntegerInputs);

async function functionWith3IntegerInputs(input1: number, input2: number, input3: number) {
  return input1 + input2 + input3;
}
edgeDriverSdk.registerDriverFunction('functionWith3IntegerInputs', functionWith3IntegerInputs);

// Fire events periodically for testing
const INTERVAL_MS = 5000; // every 5 seconds
setInterval(() => {
  edgeDriverSdk.fireEvent('integerEvent', {
    name: 'integerEvent',
    value: Math.floor(Math.random() * 100),
  });
  // edgeDriverSdk.fireEvent('floatEvent', { name: 'floatEvent', value: Math.random() * 100 });
  // edgeDriverSdk.fireEvent('stringEvent', { name: 'stringEvent', value: `hello-${Date.now()}` });
  // edgeDriverSdk.fireEvent('booleanEvent', { name: 'booleanEvent', value: Math.random() > 0.5 });
  // edgeDriverSdk.fireEvent('objectEvent', {
  //   name: 'objectEvent',
  //   value: {
  //     stringValue: 'test',
  //     integerValue: 42,
  //     floatValue: 3.14,
  //     booleanValue: true,
  //   },
  // });
}, INTERVAL_MS);
