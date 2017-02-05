# What is this?

Made this to test Webpack 2. It's a little React app. It's not the most minimal thing I could build, but it's fairly practical for my purposes.

# Tech stuffs

- Webpack 2
- Babel
- React
- React-Router v4
- CSS Modules
- PostCSS
- Jest
- ESLint (w/ AirBnB config)

# Using the local https server

By default, the app is configured to redirect all traffic to HTTPS. As such, you will probably need to generate some SSL certs for the app to use:

- Generate SSL certificates: `openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365`
	- **NOTE**: when you see `Common Name (e.g. server FQDN or YOUR name) []:`, specify `localhost`.
- Set the cert password as an environment variable: `SSL_CERT_PASS=yourSslCertPass yarn run start:dev`
- Add the cert to Chrome to avoid warnings about it: [http://stackoverflow.com/a/15076602](http://stackoverflow.com/a/15076602)

# Environment variables

| key           | values | description                                          |
|---------------|------------------------------------------------------|-----|
| SSL_CERT_PASS | n/a | The password for the localhost https server's certs. |
| NODE_ENV | `production` `test` `development` | Stuff |

# Issues

## Some stuff doesn't hot reload 'til 2nd re-build

For example: the code-splitting happening [via `System.import`](https://github.com/tsnieman/webpack2test/blob/6be5a1e87e38e4c509f765a6ef92c0b3825cc7c8/src/components/app/RootRouter/RootRouter.jsx#L23) doesn't hot-reload.

Found a github issue that seems to be tracking this:

> "So to sum up, hot reloading system.imported code would only work on the second time the webpack builds."
via  https://github.com/gaearon/react-hot-loader/issues/303#issuecomment-253836872

## Chrome warns of 'non-secure connection' when navigating to `https://localhost` (local https server)

The cert is self-signed, just for this repo. Add the cert to Chrome: [http://stackoverflow.com/a/15076602](http://stackoverflow.com/a/15076602)

## I don't want to deal with HTTPS

Then disable the 'redirect to HTTPS' in the dev server.
