// Much of this driver was based on the article at the following link:
// http://steventsnyder.com/reading-a-dymo-usb-scale-using-python/

const DRIVER_NAME = 'dymoM10USBScale';
const gramsInAnOunce = 28.3495;

// This next value was determined to be reasonable after using the scale. There is no notion of
// stability that seems to be sent to the computer despite a small icon on the scale itself
// indicating stability.
const numberOfMeasurementsNeededToBeStable = 4;
let device: edgeDriverSdk.HidDevice | undefined = undefined;
let lastMeasurement = { grams: null, ounces: null, stable: null };
let numberOfStableMeasurements = 0;

edgeDriverSdk.onPlugEvent(async (plugEventInfo) => {
  try {
    if (device == null) {
      device = new edgeDriverSdk.HidDevice(DRIVER_NAME, {
        registrationType: 'id',
        vid: plugEventInfo.vid,
        pid: plugEventInfo.pid,
      });
      await device.open();
    }
  } catch (err) {
    device.close().catch((_err) => {});
    device = undefined;
    edgeDriverSdk.fireEvent('error', {
      message: 'Error while opening the device.',
    });
  }

  // If we weren't able to open the device, return
  if (!device) {
    edgeDriverSdk.fireEvent('opened', false);
    return;
  }

  // Listen for data
  device.onData((hidData) => {
    const data = [hidData.report, ...Array.from(hidData.data)];
    // A value of 6 in data[1] indicates that the scale is overloaded. In this situation, we
    // short-circuit and return early.
    if (data[1] === 6) {
      edgeDriverSdk.fireEvent('measurement', {
        grams: null,
        ounces: null,
        stable: false,
        overloaded: true,
      });
      return;
    }

    // data[1] indicates the sign of the result. 5 is negative, 2 is 0, 4 is positive, and 6 is
    // overloaded (handled above).
    const isNegative = data[1] === 5;

    // data[2] indicates the units of the result. 11 is oz and 2 is grams. If the reading on the
    // scale is 0, the unit is always oz for some reason.
    const unit = data[2] === 11 ? 'oz' : 'g';

    // data[3] indicates if the measurement is a whole number or in tenths. 255 indicates that
    // the result should be divided by 10. I think the 255 is actually supposed to be a -1, in
    // which case the result is multiplied by a scaling factor of 10**(data[3]). Clever, but
    // documenting that behavior and all of the needed operations is far more complex for
    // handling the case here.
    const scalingFactor = data[3] === 0 ? 1 : 0.1;

    // Now we calculate the raw measurement.
    const rawMeasurement =
      (data[4] + 256 * data[5]) * scalingFactor * (isNegative ? -1 : 1);

    // Convert to both grams and ounces. Note that we round here to mimic the behavior of the
    // scale display.
    const grams = parseInt(
      (unit === 'oz'
        ? rawMeasurement * gramsInAnOunce
        : rawMeasurement
      ).toFixed(0),
      10
    );
    const ounces = parseFloat(
      (unit === 'oz' ? rawMeasurement : grams / gramsInAnOunce).toFixed(1)
    );

    // Now we determine if the result is stable or not. While this could technically be done
    // within the Tulip app, it's much easier to build this logic into the driver itself.
    if (grams === lastMeasurement.grams) {
      numberOfStableMeasurements += 1;
    } else {
      numberOfStableMeasurements = 0;
    }
    const stable =
      numberOfStableMeasurements >= numberOfMeasurementsNeededToBeStable;

    // If the current measurement is stable, and the last measurement was also stable, then
    // there is no need to emit this result because this information has already been sent to
    // Tulip.
    if (stable && lastMeasurement.stable) {
      return;
    }

    // Package our measurement into its final form
    const measurement = {
      grams,
      ounces,
      stable,
      overloaded: false,
    };

    // Emit our results.
    edgeDriverSdk.fireEvent('measurement', measurement);

    // Now save the current reading to compare with next time.
    lastMeasurement = measurement;
  });

  device.onClose(() => {
    device = undefined;
    edgeDriverSdk.fireEvent('opened', false);
    console.debug('Device closed');
  });

  console.debug('Device opened');
  edgeDriverSdk.fireEvent('opened', true);
});
