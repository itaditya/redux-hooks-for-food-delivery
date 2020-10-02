## Food delivery app with Mobx Hooks

This repo is used in my blog post to show how to test a React app built using MobX and React hooks. The tests are written with **@testing-library/react**.

#### Project Structure-
I have kept things simple for this toy app. All the relevant code for the post is in `src`. Here's what each file contains-

1. index.js - Bootstrapping code for the React app.
2. App.js - Entry point for our React app.
3. App.test.js - Tests for the app.
4. mobx.js - MobX related logic like store class, hooks.
5. Comps.js - React Components like list item, buttons, icons etc.
6. utils.js - Random JS utilities like api fetching wrappers.

The food app loads the menu list from a static `public/food-menu.json` file. In real apps data would be fetched from an API server.
