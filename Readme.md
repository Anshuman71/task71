The Emoji Store
====

Steps to setup locally
----
1. `yarn`  or  `npm install`
2. `yarn build`
3. `yarn start-prod` to start production build and visit `http://localhost:5000`
4. `yarn start-dev` to start development build and visit `http://localhost:3000`

>No changes have been made to the `server`

>Styles are kept simple and `Ads` are not styled

>`/src` directory contains the frontend ReactJs code

I've used the new React feature `hooks` to keep the logic clean and simple


3rd party packages
---
- `styled-components` for styling
- `serve` to serve the build
- `concurrently` to run both servers parallely
