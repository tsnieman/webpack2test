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
  - **NOTE**: application currently looking for `key.pem` and `cert.pem` in `./src/server`, so put those files there.
- Set the cert password as an environment variable: `SSL_CERT_PASS=yourSslCertPass yarn run start:dev`
- Add the cert to Chrome to avoid warnings about it: [http://stackoverflow.com/a/15076602](http://stackoverflow.com/a/15076602)

# Environment variables

| key           | values | description                                          |
|---------------|------------------------------------------------------|-----|
| SSL_CERT_PASS | n/a | The password for the localhost https server's certs. |
| NODE_ENV | `production` `test` `development` | Stuff |

# Issues

## Chrome warns of 'non-secure connection' when navigating to `https://localhost` (local https server)

The cert is self-signed, just for this repo. Add the cert to Chrome: [http://stackoverflow.com/a/15076602](http://stackoverflow.com/a/15076602)

## I don't want to deal with HTTPS

Then disable the 'redirect to HTTPS' in the dev server.
