# Number Shuffler [[Site Link](https://number-shuffler.azurewebsites.net/)]

Provides artisanal lists of specially shuffled numbers.
Generates and displays lists of the first `N` integers, but in random order.

Full stack solution using express as a back-end; React, Redux, and MUI for the front end.

## Problem Solution [[Solution Code](https://github.com/StasTserk/Number-Shuffler/blob/main/src/server/NumberProvider.ts)]

For good performance, we are aiming at an algorithm with an O(n) complexity. The approach is pretty simple:

1. Start with an ordered array containing all of the numbers. `[1, 2, 3, ... 10000]`
2. Swap the number in the first index with one in a random other index. `[200, 2, 3, ... , 199, 1, 201, ... , 10000]`
3. Move on to the next index and swap it with another random one.

Because we never add or remove numbers, each number is guaranteed to still be in the array when finished. Because randomly swap
every number, and each number has a uniform chance to end up in any array index after the swap, we end up each array index
having as likely a chance to hold any given integer as any other.

One minor optimization added to the algorithm is we don't bother to initialize the array after it is created;
starting off with `[undefined x 10,000]` instead of the integers between 1 and 10,000. Each time we encounter a given index, if
we see it is not already initialized, we initialize it then -- though initializing the array beforehand does not up the complexity
of the algorithm.

## Other Solution Details

-   Backend details:
    -   Basic express server application.
    -   Statically serves any documents to the site root `/`.
    -   Defines a `NumbersApi` class which handles GET requests to `/numbers/`. Does validation of the query parameter
    -   Defines a `NumberProvider` class which is the actual implementation of the number generation algorithm.
        Performs business logic validation on the amount of numbers requested (should be positive, should be <= 1M record).
        Returns a Result object that is either `Success` with the number array, or `Failure` with an error message.
-   Front End Details:
    -   Uses React as the base framework with MaterialUI as a UI framework on top.
    -   Though it's overkill for a project of this size, uses Redux for managing state, and an async thunk for fetching
        the data from the server.
    -   Uses `react-window` to improve the performance of the grid of numbers. Rendering 10k+ of something can be quite
        taxing in React even if it's a simple div. React window allows for only ever rendering a part of the list at any
        one time, reducing the overall time to render.
    -   Has support for swapping themes, both light and dark, as well as defaulting to the system preference.
    -   Looks quite reasonable on both desktop and mobile.
-   Other Details:
    -   Hosted on Azure at https://number-shuffler.azurewebsites.net/
    -   Incorporates CircleCi automated build pipeline. Each commit pushed to github is automatically built and tested.
    -   Any PR merged into master is automatically deployed to Azure via a Service Principal as long as the build and
        test steps pass.
    -   Tasks and progress for the project tracked in [a corresponding project](https://github.com/users/StasTserk/projects/1) on github.

## Installation

Ensure node and npm are installed globally on the machine.

Run `npm install`

## Running the project

Run `npm run build`
Run `npm start`

Default URL the site runs at is `localhost:3000`

## Running tests

Run `npm run test`

## Development

Recommend using `VSCode` as the IDE,
See [tasks.json](https://github.com/StasTserk/Number-Shuffler/blob/main/.vscode/tasks.json) for run/build/test tasks, and [launch.json](https://github.com/StasTserk/Number-Shuffler/blob/main/.vscode/launch.json) for test debug scripts.

Aside from that, `package.json` defines a number of other useful commands:

-   `npm run watch` - builds the codebase in development mode (with sourcemaps, etc.), watching files for changes to rebuild.
-   `npm run start-dev` - Starts up a dev server using `nodemon` to watch for server side build changes. restarts the server each time a change is detected.
-   `npm run test-watch` - Starts up a watch task on the source code, running the test suite whenever new changes are detected.
