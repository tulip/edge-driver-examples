# edge-driver-examples

This repository contains example code for custom edge drivers designed to work with the Tulip platform.

>[!NOTE]
These examples are intended for reference only. We do not accept pull requests or provide official support for these example drivers.

## Overview
Tulip edge drivers allow you to integrate custom hardware and devices into the Tulip platform. This repository provides some illustrative examples of how edge drivers can be structured and implemented.

Each example is set up as a standalone project with:

- A `src/manifest.json` that defines the events and functions the driver provides, as well as the services that it needs ('Serial', for example)
- Driver implementation TypeScript source code in `src/index.ts` (and possibly additional files)
- Tooling to compile and bundle the TypeScript source code files and validate the manifest file.

These examples are useful for:

- Developers wanting to understand how custom edge drivers for Tulip work from a technical perspective
- Hardware integrators looking to add support for new devices in the Tulip platform
- Anyone interested in learning more about Tulip's extensibility options for device integration

## Important Notes
Custom edge driver functionality is rapidly evolving at the moment, and we'll be adding new functionality and responding to feedback around how we can structure our SDK and tooling to make creating edge drivers both easy and flexible. 

These examples reflect the current state of our edge driver SDK and will likely change soon. Please sign up for the [Tulip Developer Program](https://developer.tulip.co) to be kept up-to-date on future changes and features!

## License
Unless otherwise noted, code in this repository is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contributions
Since these examples are intended for reference only, contributions to this repository will not be accepted. For more information about contributing to the future of custom integrations in Tulip, please sign up for the [Tulip Developer Program](https://developer.tulip.co).
