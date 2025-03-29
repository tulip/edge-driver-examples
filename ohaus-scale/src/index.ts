/* Driver for the Ohaus Scout STX 621 scale.

   Instruction manual:
   http://dmx.ohaus.com/WorkArea/showcontent.aspx?id=4294972844

   USB Device Interface Manual:
   http://dmx.ohaus.com/WorkArea/DownloadAsset.aspx?id=4294974226

   Note that this device has many configurable states, not all
   configurations have been tested. This driver covers the base
   case of measurment in any supported units terminated by "\r\n".
 */
import _ from 'lodash';

const SCALE_BAUD_RATE = 9600;

/* This is a high precision scale. The scale reports if the
      measured value is stable or unstable. Unstable may not
      be a valid measurement, yet it may be good to know that the
      scale is not stable, so unstable measurements are passed along
      by this driver.
    */
const UNSTABLE = '?';
const OP_GROSS = 'G';
const OP_NET = 'N';
const OP_TARE = 'T';
const OP_PRESET_TARE = 'PT';

/* disclaimer: these are characters from two fields mixed together
      each reading always contains these fields: weight, unit, stability, and an operation type
    */
const SCALE_INDICATORS = [UNSTABLE, OP_GROSS, OP_NET, OP_TARE, OP_PRESET_TARE];

/* the following conversion constants were taken from Google's online conversion utility
      except for the constant for Newtons which came from Wikipedia
   */
const OUNCES_TO_GRAMS = 28.3495;
const POUNDS_TO_GRAMS = 453.592;
const CARATS_TO_GRAMS = 0.2;
const TROY_OUNCES_TO_GRAMS = 31.1035;
const PENNYWEIGHTS_TO_GRAMS = 1.55517;
const GRAINS_TO_GRAMS = 0.0647989;
/* 1000 grams in a kg divided by gravitational acceleration
      only correct at certain places on Earth
    */
const NEWTONS_TO_GRAMS = 1000 / 9.80665;

const should = (message: string, condition: boolean) => {
  if (!condition) {
    console.warn(`should ${message}`);
  }
};

/**
 * Represents the ohaus scale
 */
class ScaleDriver {
  /* properties */
  path: string;
  port: edgeDriverSdk.SerialPort;
  lastWeightData: Object;
  unsubOnData: () => void;
  firstLine: boolean;
  /**
   * creates a scale to send data back to factory
   * @param {string} path - phyiscal path to ohaus
   */
  constructor(path: string) {
    this.path = path;
    this.firstLine = true;

    // try catch used for issue related to rapid plug cycles throwing an exceptions
    // on rapid plug cycles to prevent gateway crash
    try {
      console.info(`Opening port: "${this.path}"`);

      this.port = new edgeDriverSdk.SerialPort(this.path, {
        baudRate: SCALE_BAUD_RATE,
        delimiter: '\r\n',
      });

      const unsubOnOpen = this.port.onOpen(() => {
        console.log('Port was opened!', this.port);
        unsubOnOpen();
      });
      this.port.open().catch((err) => {
        console.error(err);
      });
      this.unsubOnData = this.port.onData((data) => {
        const decoder = new TextDecoder();
        const decodedData = decoder.decode(new Uint8Array(data));
        let scaleData = this.parseScaleData(decodedData);
        if (scaleData === undefined || scaleData.unstable) {
          /* This is normal most of the time */
          return;
        }
        let weightData: object;
        if (scaleData.overloaded) {
          /* this sucks because we cannot express undefined on Factory-side
                just send zeroes and assume the user treats values with overloaded set to true
                as junk
              */
          weightData = {
            overloaded: true,
            grams: 0,
            oz: 0,
          };
        } else if ('pieces' in scaleData) {
          weightData = {
            overloaded: scaleData.overloaded,
            pieces: scaleData.pieces,
          };
        } else {
          weightData = {
            overloaded: scaleData.overloaded,
            grams: scaleData.weightInGrams,
            oz: scaleData.weightInGrams / OUNCES_TO_GRAMS,
          };
        }

        // the scale sends updates continuously but we only want to emit changes
        if (!_.isEqual(this.lastWeightData, weightData)) {
          this.lastWeightData = weightData;
          edgeDriverSdk.fireEvent(
            'pieces' in weightData ? 'pieces' : 'weight',
            weightData
          );
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * close is used to disconnect from ohaus
   */
  async close() {
    if (this.path !== undefined) {
      if (this.unsubOnData) {
        this.unsubOnData();
      }
      await this.port.close();
    }
  }

  parseScaleData(message: string) {
    if (this.firstLine) {
      this.firstLine = false;
      return undefined;
    }

    const oneOrMoreSpaces = /\s+/g;

    const empty = message.length === 0;
    should('not be empty', !empty);

    if (empty) {
      return undefined;
    }

    const parts = message
      .split(oneOrMoreSpaces)
      .filter((part) => part.length !== 0);

    const oneOrMoreParts = parts.length >= 1;
    should('have one or more elements', oneOrMoreParts);

    if (!oneOrMoreParts) {
      return undefined;
    }

    if (parts.slice(0, 2).join(' ') === 'Over Load') {
      return { overloaded: true };
    }

    const weight = parts[0];
    const units = parts[1];
    const scaleOperationField = parts[2];

    should(
      'be one of the indicator characters or nothing',
      scaleOperationField === undefined ||
        scaleOperationField === '' ||
        SCALE_INDICATORS.some(
          (opIndicator) => opIndicator === scaleOperationField
        )
    );

    const unstable = scaleOperationField === UNSTABLE;

    let grams: number;
    let pieces: number;

    switch (units) {
      case 'g': // grams
        grams = parseFloat(weight);
        break;
      case 'ct': // carats
        grams = CARATS_TO_GRAMS * parseFloat(weight);
        break;
      case 'oz': // ounces
        grams = OUNCES_TO_GRAMS * parseFloat(weight);
        break;
      case 'ozt': // troy ounces
        grams = TROY_OUNCES_TO_GRAMS * parseFloat(weight);
        break;
      case 'lb': // pounds
        grams = POUNDS_TO_GRAMS * parseFloat(weight);
        break;
      case 'lb:oz': {
        // pounds and ounces
        const poundsAndOunces = weight.split(':');
        should('have two elements', poundsAndOunces.length === 2);
        const pounds = parseFloat(poundsAndOunces[0]);
        const ounces = parseFloat(poundsAndOunces[1]);
        grams = pounds * POUNDS_TO_GRAMS + ounces * OUNCES_TO_GRAMS;
        break;
      }
      case 'dwt': // pennyweight
        grams = PENNYWEIGHTS_TO_GRAMS * parseFloat(weight);
        break;
      case 'Grain':
        grams = GRAINS_TO_GRAMS * parseFloat(weight);
        break;
      case 'N': // Newtons (from WolframAlpha)
        grams = NEWTONS_TO_GRAMS * parseFloat(weight);
        break;
      case 'PCS': // pieces
        pieces = parseInt(weight, 10);
        break;
      case '?': // overload
      case undefined: // also overload
        return { overloaded: true };
      default:
        console.warn(`Unknown units "${units}"`);
        return undefined;
    }

    if (units !== 'PCS') {
      should('not be a NaN', !Number.isNaN(grams));
      return {
        weightInGrams: grams,
        overloaded: false,
        unstable,
      };
    } else {
      return {
        pieces,
        overloaded: false,
        unstable,
      };
    }
  }
}

let ohausScaleInstance: ScaleDriver;

edgeDriverSdk.onPlugEvent(async (plugEventInfo) => {
  if (plugEventInfo.port == null) {
    console.error(
      `Plug event did not contain port, can't start SerialPort. PlugEventInfo: ${JSON.stringify(
        plugEventInfo
      )}`
    );
    return;
  }
  if (!ohausScaleInstance) {
    console.log(`Ohaus Scale at port: ${plugEventInfo.port}`);
    ohausScaleInstance = new ScaleDriver(plugEventInfo.port);
  } else {
    console.log(
      `Ignoring Ohaus Scale plug event, driver already open at port ${ohausScaleInstance.port}`
    );
  }
});

edgeDriverSdk.onUnplugEvent(async (plugEventInfo) => {
  if (ohausScaleInstance && ohausScaleInstance.path === plugEventInfo.port) {
    console.log(`Shutting down ohaus scale at port: ${plugEventInfo.port}`);
    await ohausScaleInstance.close();
  }
});
