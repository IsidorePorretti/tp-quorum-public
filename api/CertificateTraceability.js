const Certificate = require("./Certificate");
const CheeseTraceability = require("./CheeseTraceability");

const CertificateTraceability = () => {
  return {
    certificate: Certificate(),
    cheeseTraceability: CheeseTraceability()
  }
};

module.exports = {
  CertificateTraceability
};
