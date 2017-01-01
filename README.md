> "So to sum up, hot reloading system.imported code would only work on the second time the webpack builds."
@ https://github.com/gaearon/react-hot-loader/issues/303#issuecomment-253836872

so uhhh, not sure what that's about. Gotta dig around some more, but until then, `System.import`-ed files don't reload til the SECOND rebuild. This mostly effects the Router, which lazy-loads the various routes.
