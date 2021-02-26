//Jest's default jsdom test environment.
module.exports = {
    testEnvironment: 'node',
    verbose: true,
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/services"
      ]
  };