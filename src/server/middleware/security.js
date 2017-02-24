// File inspired by https://github.com/ctrlplusb/react-universally/blob/master/src/server/middleware/security.js
// TODO add helmet https://github.com/helmetjs/helmet

const hpp = require('hpp');

module.exports = [
  // Prevent HTTP Parameter pollution.
  // https://speakerdeck.com/ckarande/top-overlooked-security-threats-to-node-dot-js-web-applications?slide=48
  hpp(),
];
