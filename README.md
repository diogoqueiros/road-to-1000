## Prerequisites
*You will need to have [Node.js](https://nodejs.org) installed.*

## Get started

1. Clone this repository:
```bash
git clone https://github.com/diogoqueiros/road-to-1000.git
cd road-to-1000
```

2. Install the dependencies:

```bash
npm install
```

3. Run API locally

This project uses a little API to fetch data, you need to start the `server.js` file (on a separated terminal):

```bash
node server.js
```

4. Start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.