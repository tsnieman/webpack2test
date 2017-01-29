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

# Issues

## Some stuff doesn't hot reload 'til 2nd re-build

For example: the code-splitting happening [via `System.import`](https://github.com/tsnieman/webpack2test/blob/6be5a1e87e38e4c509f765a6ef92c0b3825cc7c8/src/components/app/RootRouter/RootRouter.jsx#L23) doesn't hot-reload.

Found a github issue that seems to be tracking this:

> "So to sum up, hot reloading system.imported code would only work on the second time the webpack builds."
via  https://github.com/gaearon/react-hot-loader/issues/303#issuecomment-253836872
