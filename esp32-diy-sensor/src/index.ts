edgeDriverSdk.SerialPort.listAvailablePorts().then((ports) => {
  const esp32port = ports.find((port: any) => port.productId === 33128);
  const serial = new edgeDriverSdk.SerialPort(esp32port.path, {
    baudRate: 115200,
  });

  serial.onData((data) => {
    try {
      const decoder = new TextDecoder();
      const stringData = decoder.decode(new Uint8Array(data));
      const espData = JSON.parse(stringData.split('ESP: ')[1]);
      edgeDriverSdk.fireEvent('data', espData);
    } catch (error) {
      console.error(error);
    }
  });

  serial.open();
});
