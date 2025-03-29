// src/index.ts
// No explicit import needed for edgeDriverSdk

const DELIMITER = '\r\n';
let serial: edgeDriverSdk.SerialPort;
interface Weight {
  weight: number;
  unit: string;
  stable: boolean;
}

async function open(config): Promise<void> {
  console.log(`opening serial connection with ${JSON.stringify(config)}`);
  serial = new edgeDriverSdk.SerialPort(config.port, {
    baudRate: config.baudRate,
    delimiter: DELIMITER,
  });
  serial.onData((data: number[]) => {
    const decoder = new TextDecoder();
    const dataString = decoder.decode(new Uint8Array(data));
    handleData(dataString);
  });
  serial.onOpen(() => {
    console.log('Port opened.');
  });
  serial.onClose(() => {
    console.log('Port closed.');
  });
  await serial.open();
}
edgeDriverSdk.registerDriverFunction('open', open);

function handleData(data: string) {
  try {
    parseData(data);
  } catch (e) {
    console.log(`Invalid data received: ${JSON.stringify(e)}`);
  }
}

async function sendCommand(command: string): Promise<void> {
  await serial.send(`${command}\r\n`);
}
edgeDriverSdk.registerDriverFunction('sendCommand', sendCommand);

let cancelStarted = false;
function handleCancelResponse(response: RegExpMatchArray): void {
  if (response[2] === 'A') {
    // cancel started, but not complete
    cancelStarted = true;
  } else if (response[2] === 'B' && cancelStarted) {
    // cancel successful
    edgeDriverSdk.fireEvent('cancelSuccess', { value: true });
    cancelStarted = false;
  } else if (response[2] === 'E' && cancelStarted) {
    // cancel error
    console.error(`Error cancelling scale operations: ${response[4]}`);
    edgeDriverSdk.fireEvent('cancelSuccess', { value: false });
    cancelStarted = false;
  }
}

function handleTareResponse(
  response: RegExpMatchArray,
  immediate: boolean
): void {
  let eventName = immediate ? 'tareImmediateSuccess' : 'tareSuccess';
  if (response[2] === 'S') {
    // success
    edgeDriverSdk.fireEvent(eventName, { value: true });
    let tareValue = getWeightValue(response);
    edgeDriverSdk.fireEvent('tareValue', tareValue);
  }
  if (response[2] === 'D' && immediate) {
    // success but not stable (only when using TI)
    edgeDriverSdk.fireEvent(eventName, { value: true });
    let tareValue = getWeightValue(response);
    edgeDriverSdk.fireEvent('tareValue', tareValue);
  } else if (response[2] === 'I' || response[2] === 'L') {
    // Error. Unspecified.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Tare not executable.`);
  } else if (response[2] === '+') {
    // Error. High range.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Tare Weight too high.`);
  } else if (response[2] === '-') {
    // Error. Low range.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Tare Weight too low.`);
  } else {
    // catch all. log what it is for reference.
    console.log(`Unknown Tare response: ${response[2]}`);
  }
}

function handleZeroResponse(
  response: RegExpMatchArray,
  immediate: boolean
): void {
  let eventName = immediate ? 'zeroImmediateSuccess' : 'zeroSuccess';
  if (response[2] === 'A') {
    // Success and weight is zero
    edgeDriverSdk.fireEvent(eventName, { value: true });
  } else if (response[2] === 'S' && immediate) {
    // success and stable
    edgeDriverSdk.fireEvent(eventName, { value: true });
    let zeroValue = getWeightValue(response);
    edgeDriverSdk.fireEvent('zeroImmediateValue', zeroValue);
  } else if (response[2] === 'D' && immediate) {
    // success and not stable
    edgeDriverSdk.fireEvent(eventName, { value: true });
    let zeroValue = getWeightValue(response);
    edgeDriverSdk.fireEvent('zeroImmediateValue', zeroValue);
  } else if (response[2] === 'I') {
    // Error. Unspecified.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Zero not executable.`);
  } else if (response[2] === '+') {
    // Error. High range.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Zero Weight too high.`);
  } else if (response[2] === '-') {
    // Error. Low range.
    edgeDriverSdk.fireEvent(eventName, { value: false });
    console.error(`Zero Weight too low.`);
  } else {
    // catch all. log what it is for reference.
    console.log(`Unknown Zero response: ${response[2]}`);
  }
}

function handleWeightResponse(response: RegExpMatchArray): void {
  if (response[2] === 'S' || response[2] === 'D') {
    // Success
    let weight = getWeightValue(response);
    edgeDriverSdk.fireEvent('currentWeight', weight);
  } else if (response[2] === 'I' || response[2] === 'L') {
    // Error. Unspecified.
    edgeDriverSdk.fireEvent('weightError', { value: 'Unknown Error' });
    console.error(`Weight command not executable.`);
  } else if (response[2] === '+') {
    // Error. High range.
    edgeDriverSdk.fireEvent('weightError', { value: 'Weight High' });
    console.error(`Weight too high.`);
  } else if (response[2] === '-') {
    // Error. Low range.
    edgeDriverSdk.fireEvent('weightError', { value: 'Weight Low' });
    console.error(`Weight too low.`);
  } else {
    // catch all. log what it is for reference.
    console.log(`Unknown Tare response: ${response[2]}`);
  }
}

function getWeightValue(response: RegExpMatchArray): Weight {
  const stable = response[2] === 'S' ? true : false;
  const weight = parseFloat(response[4]);
  const unit = response[5] ?? '';
  const finalWeight = response[3] === '-' ? -weight : weight;
  let currentWeight = { weight: finalWeight, unit: unit, stable: stable };
  return currentWeight;
}

function parseData(data: string): void {
  try {
    const goodMatch = data.match(
      /^(C|S|T|TI|Z|ZI)\s+(A|B|D|E|I|L|S|\+|\-)*\s+(\-)?(\d*\.?\d+)?\s*(\w+)?/
    );
    if (goodMatch) {
      // Part of the functions we've defined in the driver.
      switch (goodMatch[1]) {
        case 'C':
          // Cancel response
          handleCancelResponse(goodMatch);
          break;
        case 'T':
          // Tare response
          handleTareResponse(goodMatch, false);
          break;
        case 'TI':
          // Tare Immediate response
          handleTareResponse(goodMatch, true);
          break;
        case 'Z':
          // Zero response
          handleZeroResponse(goodMatch, false);
          break;
        case 'ZI':
          // Zero Immediate response
          handleZeroResponse(goodMatch, true);
          break;
        case 'S':
          // Weight measurement
          handleWeightResponse(goodMatch);
          break;
        default:
          // Log to see what's up.
          console.log(`Unknown match: ${goodMatch[1]}`);
      }
    } else {
      // Extra functionality not defined in this driver, but usable via the sendCommand.
      // Emit as a genericEvent that returns a string that can be parsed in a Tulip Trigger.
      edgeDriverSdk.fireEvent('genericEvent', { value: data });
    }
  } catch (error) {
    console.error('Error parsing data: ', error);
  }
}

async function monitorWeight(): Promise<void> {
  console.log('Monitoring weight');
  await sendCommand('SIR');
}
edgeDriverSdk.registerDriverFunction('monitorWeight', monitorWeight);

async function stop(): Promise<void> {
  console.log('Stopping');
  await sendCommand('C');
}
edgeDriverSdk.registerDriverFunction('cancel', stop);

async function tare(): Promise<void> {
  console.log('Taring scale');
  await sendCommand('T');
}
edgeDriverSdk.registerDriverFunction('tare', tare);

async function tareImmediate(): Promise<void> {
  console.log('Taring scale');
  await sendCommand('TI');
}
edgeDriverSdk.registerDriverFunction('tareImmediate', tareImmediate);

async function getWeight(): Promise<void> {
  console.log('Getting weight');
  await sendCommand('S');
}
edgeDriverSdk.registerDriverFunction('getWeight', getWeight);

async function getWeightImmediate(): Promise<void> {
  console.log('Getting weight');
  await sendCommand('SI');
}
edgeDriverSdk.registerDriverFunction('getWeightImmediate', getWeightImmediate);

async function zero(): Promise<void> {
  console.log('Zeroing scale');
  await sendCommand('Z');
}
edgeDriverSdk.registerDriverFunction('zero', zero);

async function zeroImmediate(): Promise<void> {
  console.log('Zeroing Immediate scale');
  await sendCommand('ZI');
}
edgeDriverSdk.registerDriverFunction('zeroImmediate', zeroImmediate);
