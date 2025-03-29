let modbusClient: edgeDriverSdk.ModbusRtuClient | undefined = undefined;

async function writeMode({ id, mode }: { id: number; mode: number }) {
  console.log(`Write mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 5) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 5 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3200, mode);
}

async function updateID({ old, new_ }: { old: number; new_: number }) {
  console.log(`UpdateID old: ${old} new: ${new_}`);
  await modbusClient.writeSingleRegister(old, 6100, new_);
}

async function colorAnimation({ id, mode }: { id: number; mode: number }) {
  console.log(`Color Animation mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 9) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 9 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3060, mode);
}

async function color1Color({ id, color }: { id: number; color: number }) {
  console.log(`Color 1 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3070, color);
}

async function color1Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Color 1 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3071, intensity);
}

async function color2Color({ id, color }: { id: number; color: number }) {
  console.log(`Color 2 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3072, color);
}

async function color2Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Color 2 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 3073, intensity);
}

async function deviceEnableStates({ id, mode }: { id: number; mode: number }) {
  console.log(`Device State mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 1) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 1 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6300, mode);
}

async function deviceChangeState({ id, mode }: { id: number; mode: number }) {
  console.log(`Device State Change mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 3) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 8700, mode);
}

async function waitingColorAnimation({ id, mode }: { id: number; mode: number }) {
  console.log(`Waiting Color Animation mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 9) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 9 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6301, mode);
}

async function waitingColor1Color({ id, color }: { id: number; color: number }) {
  console.log(`Waiting Color 1 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6302, color);
}

async function waitingColor1Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Waiting Color 1 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6304, intensity);
}

async function waitingColor2Color({ id, color }: { id: number; color: number }) {
  console.log(`Waiting Color 2 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6303, color);
}

async function waitingColor2Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Waiting Color 2 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6305, intensity);
}

async function waitingAnimationSpeed({ id, speed }: { id: number; speed: number }) {
  console.log(`Waiting Animation Speed: ${speed} for ${id}`);

  if (speed < 0 || speed > 2) {
    throw new Error(`Invalid: ${speed}. Must be between 0 and 2 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6306, speed);
}

async function waitingAnimationPattern({ id, pattern }: { id: number; pattern: number }) {
  console.log(`Waiting Animation Pattern: ${pattern} for ${id}`);

  if (pattern < 0 || pattern > 4) {
    throw new Error(`Invalid: ${pattern}. Must be between 0 and 4 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6307, pattern);
}

async function waitingAnimationDirection({ id, direction }: { id: number; direction: number }) {
  console.log(`Waiting Animation Direction: ${direction} for ${id}`);

  if (direction < 0 || direction > 1) {
    throw new Error(`Invalid: ${direction}. Must be between 0 and 1 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6308, direction);
}

async function waitingVisualOnDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Waiting Visual On Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6308, delay);
}

async function waitingVisualOffDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Waiting Visual Off Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6308, delay);
}

async function jobColorAnimation({ id, mode }: { id: number; mode: number }) {
  console.log(`Job Color Animation mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 9) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 9 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6323, mode);
}

async function jobColor1Color({ id, color }: { id: number; color: number }) {
  console.log(`Job Color 1 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6324, color);
}

async function jobColor1Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Job Color 1 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6326, intensity);
}

async function jobColor2Color({ id, color }: { id: number; color: number }) {
  console.log(`Job Color 2 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6325, color);
}

async function jobColor2Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Job Color 2 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6327, intensity);
}

async function jobAnimationSpeed({ id, speed }: { id: number; speed: number }) {
  console.log(`Job Animation Speed: ${speed} for ${id}`);

  if (speed < 0 || speed > 2) {
    throw new Error(`Invalid: ${speed}. Must be between 0 and 2 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6328, speed);
}

async function jobAnimationPattern({ id, pattern }: { id: number; pattern: number }) {
  console.log(`Job Animation Pattern: ${pattern} for ${id}`);

  if (pattern < 0 || pattern > 4) {
    throw new Error(`Invalid: ${pattern}. Must be between 0 and 4 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6329, pattern);
}

async function jobAnimationDirection({ id, direction }: { id: number; direction: number }) {
  console.log(`Job Animation Direction: ${direction} for ${id}`);

  if (direction < 0 || direction > 1) {
    throw new Error(`Invalid: ${direction}. Must be between 0 and 1 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6330, direction);
}

async function jobVisualOnDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Job Visual On Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6331, delay);
}

async function jobVisualOffDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Job Visual Off Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6332, delay);
}

async function mispickColorAnimation({ id, mode }: { id: number; mode: number }) {
  console.log(`Mispick Color Animation mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 9) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 9 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6312, mode);
}

async function mispickColor1Color({ id, color }: { id: number; color: number }) {
  console.log(`Mispick Color 1 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6313, color);
}

async function mispickColor1Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Mispick Color 1 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6315, intensity);
}

async function mispickColor2Color({ id, color }: { id: number; color: number }) {
  console.log(`Mispick Color 2 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6314, color);
}

async function mispickColor2Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Mispick Color 2 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6316, intensity);
}

async function mispickAnimationSpeed({ id, speed }: { id: number; speed: number }) {
  console.log(`Mispick Animation Speed: ${speed} for ${id}`);

  if (speed < 0 || speed > 2) {
    throw new Error(`Invalid: ${speed}. Must be between 0 and 2 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6317, speed);
}

async function mispickAnimationPattern({ id, pattern }: { id: number; pattern: number }) {
  console.log(`Mispick Animation Pattern: ${pattern} for ${id}`);

  if (pattern < 0 || pattern > 4) {
    throw new Error(`Invalid: ${pattern}. Must be between 0 and 4 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6318, pattern);
}

async function mispickAnimationDirection({ id, direction }: { id: number; direction: number }) {
  console.log(`Mispick Animation Direction: ${direction} for ${id}`);

  if (direction < 0 || direction > 1) {
    throw new Error(`Invalid: ${direction}. Must be between 0 and 1 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6319, direction);
}

async function mispickVisualOnDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Mispick Visual On Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6320, delay);
}

async function mispickVisualOffDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Mispick Visual Off Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6321, delay);
}

async function ackColorAnimation({ id, mode }: { id: number; mode: number }) {
  console.log(`Acknowledge Color Animation mode: ${mode} for ${id}`);

  if (mode < 0 || mode > 9) {
    throw new Error(`Invalid: ${mode}. Must be between 0 and 9 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6334, mode);
}

async function ackColor1Color({ id, color }: { id: number; color: number }) {
  console.log(`Acknowledge Color 1 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6335, color);
}

async function ackColor1Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Acknowledge Color 1 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6337, intensity);
}

async function ackColor2Color({ id, color }: { id: number; color: number }) {
  console.log(`Acknowledge Color 2 Color: ${color} for ${id}`);

  if (color < 0 || color > 15) {
    throw new Error(`Invalid: ${color}. Must be between 0 and 15 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6336, color);
}

async function ackColor2Intensity({ id, intensity }: { id: number; intensity: number }) {
  console.log(`Acknowledge Color 2 Intensity: ${intensity} for ${id}`);

  if (intensity < 0 || intensity > 3) {
    throw new Error(`Invalid: ${intensity}. Must be between 0 and 3 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6338, intensity);
}

async function ackAnimationSpeed({ id, speed }: { id: number; speed: number }) {
  console.log(`Ack Animation Speed: ${speed} for ${id}`);

  if (speed < 0 || speed > 2) {
    throw new Error(`Invalid: ${speed}. Must be between 0 and 2 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6339, speed);
}

async function ackAnimationPattern({ id, pattern }: { id: number; pattern: number }) {
  console.log(`Ack Animation Pattern: ${pattern} for ${id}`);

  if (pattern < 0 || pattern > 4) {
    throw new Error(`Invalid: ${pattern}. Must be between 0 and 4 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6340, pattern);
}

async function ackAnimationDirection({ id, direction }: { id: number; direction: number }) {
  console.log(`Ack Animation Direction: ${direction} for ${id}`);

  if (direction < 0 || direction > 1) {
    throw new Error(`Invalid: ${direction}. Must be between 0 and 1 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6341, direction);
}

async function ackVisualOnDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Ack Visual On Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6342, delay);
}

async function ackVisualOffDelay({ id, delay }: { id: number; delay: number }) {
  console.log(`Ack Visual Off Delay: ${delay} for ${id}`);

  if (delay < 0 || delay > 66535) {
    throw new Error(`Invalid: ${delay}. Must be between 0 and 66535 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6343, delay);
}

async function sevenSegMode({ id, mode }: { id: number; mode: number }) {
  console.log(`SevenSegMode: ${mode} for ${id}`);

  if (mode < 0 || mode > 1) {
    throw new Error(`Invalid: ${mode}. Must be between either 0 or 1.`);
  }

  await modbusClient.writeSingleRegister(id, 6209, mode);
}

async function sevenSegWriteString({ id, value }: { id: number; value: string }) {
  console.log(`SevenSegWriteString: ${value} for ${id}`);

  if (value.length > 49) {
    throw new Error(`Passed String Cannot Be Longer than 49 Chars`);
  }

  await sevenSegMode({ id: id, mode: 2 });

  for (let i = 0; i < value.length; i++) {
    const asciiValue = value.charCodeAt(i);
    await modbusClient.writeSingleRegister(id, 8703 + i, asciiValue);
  }
}

async function sevenSegWriteValue({
  id,
  value,
  offset,
}: {
  id: number;
  value: number;
  offset: number;
}) {
  console.log(`SevenSegWriteValue: ${value} for ${id}`);

  if (offset < 0 || offset > 49) {
    throw new Error(`Invalid: ${offset}. Must be between 0 and 49 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 8703 + offset, value);
}

async function sevenSegDecimal1({ id, value }: { id: number; value: number }) {
  console.log(`SevenSegDecimal1: ${value} for ${id}`);

  if (value < 0 || value > 5) {
    throw new Error(`Invalid: ${value}. Must be between 0 and 5 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6206, value);
}

async function sevenSegDecimal2({ id, value }: { id: number; value: number }) {
  console.log(`SevenSegDecimal1: ${value} for ${id}`);

  if (value < 0 || value > 5) {
    throw new Error(`Invalid: ${value}. Must be between 0 and 5 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6207, value);
}

async function sevenSegDecimal3({ id, value }: { id: number; value: number }) {
  console.log(`SevenSegDecimal1: ${value} for ${id}`);

  if (value < 0 || value > 5) {
    throw new Error(`Invalid: ${value}. Must be between 0 and 5 (inclusive).`);
  }

  await modbusClient.writeSingleRegister(id, 6208, value);
}

async function registerRtu({ path, baudRate }: { path: string; baudRate: number }) {
  console.log('Registering RTU!', JSON.stringify({ path, baudRate }));
  if (modbusClient) {
    console.warn(
      'Modbus client already exists, disconnecting to connect new client',
      JSON.stringify({ name: modbusClient.name }),
    );
    await modbusClient.close();
    modbusClient = undefined;
  }

  console.log('Actually registering RTU!', JSON.stringify({ path, baudRate }));
  modbusClient = new edgeDriverSdk.ModbusRtuClient({
    path,
    name: 'bannerPtlDevice',
    config: {
      baudRate,
      timeoutMs: 10000,
    },
  });

  modbusClient.onClose(() => {
    console.log('Modbus client closed');
  });

  modbusClient.onOpen(() => {
    console.log('Modbus client opened', modbusClient.name);
  });

  console.log('Opening modbus client');
  await modbusClient.open();
  console.log('Opened modbus client!');
}

console.log('Banner PTL driver loaded');
// basic
edgeDriverSdk.registerDriverFunction('WriteMode', writeMode);
edgeDriverSdk.registerDriverFunction('ColorAnimation', colorAnimation);
edgeDriverSdk.registerDriverFunction('Color1Color', color1Color);
edgeDriverSdk.registerDriverFunction('Color1Intensity', color1Intensity);
edgeDriverSdk.registerDriverFunction('Color2Color', color2Color);
edgeDriverSdk.registerDriverFunction('Color2Intensity', color2Intensity);

// states primary
edgeDriverSdk.registerDriverFunction('EnableStates', deviceEnableStates);
edgeDriverSdk.registerDriverFunction('ChangeState', deviceChangeState);
edgeDriverSdk.registerDriverFunction('JobColorAnimation', jobColorAnimation);
edgeDriverSdk.registerDriverFunction('JobColor1Color', jobColor1Color);
edgeDriverSdk.registerDriverFunction('JobColor1Intensity', jobColor1Intensity);
edgeDriverSdk.registerDriverFunction('JobColor2Color', jobColor2Color);
edgeDriverSdk.registerDriverFunction('JobColor2Intensity', jobColor2Intensity);
edgeDriverSdk.registerDriverFunction('WaitingColorAnimation', waitingColorAnimation);
edgeDriverSdk.registerDriverFunction('WaitingColor1Color', waitingColor1Color);
edgeDriverSdk.registerDriverFunction('WaitingColor1Intensity', waitingColor1Intensity);
edgeDriverSdk.registerDriverFunction('WaitingColor2Color', waitingColor2Color);
edgeDriverSdk.registerDriverFunction('WaitingColor2Intensity', waitingColor2Intensity);
edgeDriverSdk.registerDriverFunction('MispickColorAnimation', mispickColorAnimation);
edgeDriverSdk.registerDriverFunction('MispickColor1Color', mispickColor1Color);
edgeDriverSdk.registerDriverFunction('MispickColor1Intensity', mispickColor1Intensity);
edgeDriverSdk.registerDriverFunction('MispickColor2Color', mispickColor2Color);
edgeDriverSdk.registerDriverFunction('MispickColor2Intensity', mispickColor2Intensity);
edgeDriverSdk.registerDriverFunction('AckColorAnimation', ackColorAnimation);
edgeDriverSdk.registerDriverFunction('AckColor1Color', ackColor1Color);
edgeDriverSdk.registerDriverFunction('AckColor1Intensity', ackColor1Intensity);
edgeDriverSdk.registerDriverFunction('AckColor2Color', ackColor2Color);
edgeDriverSdk.registerDriverFunction('AckColor2Intensity', ackColor2Intensity);

// states misc
edgeDriverSdk.registerDriverFunction('WaitingAnimationSpeed', waitingAnimationSpeed);
edgeDriverSdk.registerDriverFunction('WaitingAnimationPattern', waitingAnimationPattern);
edgeDriverSdk.registerDriverFunction('WaitingAnimationDirection', waitingAnimationDirection);
edgeDriverSdk.registerDriverFunction('WaitingVisualOnDelay', waitingVisualOnDelay);
edgeDriverSdk.registerDriverFunction('WaitingVisualOffDelay', waitingVisualOffDelay);
edgeDriverSdk.registerDriverFunction('JobAnimationSpeed', jobAnimationSpeed);
edgeDriverSdk.registerDriverFunction('JobAnimationPattern', jobAnimationPattern);
edgeDriverSdk.registerDriverFunction('JobAnimationDirection', jobAnimationDirection);
edgeDriverSdk.registerDriverFunction('JobVisualOnDelay', jobVisualOnDelay);
edgeDriverSdk.registerDriverFunction('JobVisualOffDelay', jobVisualOffDelay);
edgeDriverSdk.registerDriverFunction('MispickAnimationSpeed', mispickAnimationSpeed);
edgeDriverSdk.registerDriverFunction('MispickAnimationPattern', mispickAnimationPattern);
edgeDriverSdk.registerDriverFunction('MispickAnimationDirection', mispickAnimationDirection);
edgeDriverSdk.registerDriverFunction('MispickVisualOnDelay', mispickVisualOnDelay);
edgeDriverSdk.registerDriverFunction('MispickVisualOffDelay', mispickVisualOffDelay);
edgeDriverSdk.registerDriverFunction('AckAnimationSpeed', ackAnimationSpeed);
edgeDriverSdk.registerDriverFunction('AckAnimationPattern', ackAnimationPattern);
edgeDriverSdk.registerDriverFunction('AckAnimationDirection', ackAnimationDirection);
edgeDriverSdk.registerDriverFunction('AckVisualOnDelay', ackVisualOnDelay);
edgeDriverSdk.registerDriverFunction('AckVisualOffDelay', ackVisualOffDelay);

// seven segment
edgeDriverSdk.registerDriverFunction('SevenSegMode', sevenSegMode);
edgeDriverSdk.registerDriverFunction('SevenSegWriteString', sevenSegWriteString);
edgeDriverSdk.registerDriverFunction('SevenSegWriteValue', sevenSegWriteValue);
edgeDriverSdk.registerDriverFunction('SevenSegDecimal1', sevenSegDecimal1);
edgeDriverSdk.registerDriverFunction('SevenSegDecimal2', sevenSegDecimal2);
edgeDriverSdk.registerDriverFunction('SevenSegDecimal3', sevenSegDecimal3);
edgeDriverSdk.registerDriverFunction('RegisterRTU', registerRtu);
edgeDriverSdk.registerDriverFunction('UpdateID', updateID);
