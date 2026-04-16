# _example_ Tulip Edge Driver

This is an example edge driver implementation that matches the "(Example) My Awesome Edge Driver" driver definition available in Tulip. To get this driver definition enabled on your Tulip instance, request it through the [Tulip Developer Program](https://developer.tulip.co).

Once the driver definition is enabled, you can use this repo as a starting point for writing your own custom edge driver code. The manifest defines a variety of event and function shapes (integer, float, string, boolean, object) that you can pick and choose from. You don't need to implement all of them, just the ones useful for your use case. As long as your events and functions match the shapes defined in the driver definition, they will work in Tulip Apps.

To test your driver locally, you'll need to build it and [side-load it into Tulip Player](https://support.tulip.co/docs/sdk-test).

## Testing in a Tulip App

Out of the box, this example driver fires an `integerEvent` every 5 seconds with a random value. To see it working in a Tulip App, create a trigger with the following configuration:

- **When** `device` > `(Example) My Awesome Edge Driver` > `outputs at` > `this station` > `with events` > `Generic Event (Integer)`
- **Then** `Show Message` > `Device Output` > `value`

This will display the integer value from the driver event as a message each time it fires.

This project was generated with [`@tulip/create-edge-driver`](https://www.npmjs.com/package/@tulip/create-edge-driver).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the required dependencies.

### `npm run build`

Builds the driver into the `dist/` directory. This compiles TypeScript, validates the manifest, and bundles your code for use in Tulip Player.

## Development

- Update `src/manifest.json` to declare your driver's events and functions.
- Edit `src/index.ts` to implement your device logic.

## More Information
- [Tulip Edge Driver Documentation](https://support.tulip.co/docs/edge-driver-sdk)
- Join the [Tulip Developer Program](https://developer.tulip.co) for the latest updates on custom edge drivers, APIs, and more.
- [Tulip Community](https://community.tulip.co) for support and to connect with other developers.
