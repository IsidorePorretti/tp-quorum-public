const Certificate = require("./Certificate");
const CheeseTraceability = require("./CheeseTraceability");

const CertificateTraceability = () => {
  return {
    certificate: Certificate.Certificate(),
    cheeseTraceability: CheeseTraceability.CheeseTraceability()
  }
};

module.exports = {
  CertificateTraceability
};
