let modbusClient: edgeDriverSdk.ModbusRtuClient | undefined = undefined;

const boolArrayToNumber = (array: boolean[]): number =>
  array
    .reverse()
    .reduce((res: number, x: boolean) => (res << 1) | (x ? 1 : 0), 0);

/**
 * WARNING: This function times out if not addr=0 & n=8
 */
async function readCoils({
  deviceId,
  address,
  n,
}: {
  deviceId: number;
  address: number;
  n: number;
}): Promise<{ resultAsNumber: number; resultAsBoolArray: boolean[] }> {
  console.log(
    `Reading coils ${address} to ${address + n - 1} for deviceId ${deviceId}`
  );
  const result = await modbusClient.readCoils(deviceId, address, n);
  console.debug('Got result!', JSON.stringify(result));
  return {
    resultAsNumber: boolArrayToNumber(result),
    resultAsBoolArray: result,
  };
}

/**
 * WARNING: The relay does not support this function & times out.
 */
async function readDiscreteInputs({
  deviceId,
  address,
  n,
}: {
  deviceId: number;
  address: number;
  n: number;
}): Promise<{ result: boolean[] }> {
  console.log(
    `Reading inputs ${address} to ${address + n - 1} for deviceId ${deviceId}`
  );
  const result = await modbusClient.readDiscreteInputs(deviceId, address, n);
  console.debug('Got result!', JSON.stringify(result));
  return { result };
}

async function writeSingleCoil({
  deviceId,
  address,
  value,
}: {
  deviceId: number;
  address: number;
  value: number;
}) {
  console.log(
    `Writing coil ${address} for deviceId ${deviceId} to value ${value}`
  );
  await modbusClient.writeSingleCoil(deviceId, address, !!value);
}

async function writeMultipleCoils({
  deviceId,
  address,
  values,
}: {
  deviceId: number;
  address: number;
  values: boolean[];
}) {
  const n = values.length;
  console.log(
    `Writing coils ${address} to ${
      address + n - 1
    } for deviceId ${deviceId} to values: ${JSON.stringify(values)}`
  );
  await modbusClient.writeMultipleCoils(deviceId, address, values);
}

async function registerRtu({
  path,
  baudRate,
}: {
  path: string;
  baudRate: number;
}) {
  console.log('Registering RTU!', JSON.stringify({ path, baudRate }));
  if (modbusClient) {
    console.warn(
      'Modbus client already exists, disconnecting to connect new client',
      JSON.stringify({ name: modbusClient.name })
    );
    await modbusClient.close();
    modbusClient = undefined;
  }

  console.log('Actually registering RTU!', JSON.stringify({ path, baudRate }));
  modbusClient = new edgeDriverSdk.ModbusRtuClient({
    path,
    name: 'modbustTestDevice',
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

// Open the device

console.debug('modbusRtuRelay driver loaded');
edgeDriverSdk.registerDriverFunction('Read Coils', readCoils);
edgeDriverSdk.registerDriverFunction(
  'Read Discrete Inputs',
  readDiscreteInputs
);
edgeDriverSdk.registerDriverFunction('Write Single Coil', writeSingleCoil);
edgeDriverSdk.registerDriverFunction(
  'Write Multiple Coils',
  writeMultipleCoils
);
edgeDriverSdk.registerDriverFunction('Register RTU', registerRtu);

edgeDriverSdk.fireEvent('Driver Started', null);
edgeDriverSdk.fireEvent('Message', 'Driver Started!');
