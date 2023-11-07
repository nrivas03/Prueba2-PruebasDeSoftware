module.exports = {
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  collectCoverageFrom: ['./src/**/*.js'],
  coveragePathIgnorePatterns: ['./src/routers/', './src/app.js', './src/configs/'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  setupFilesAfterEnv: ['./test/setup.js'],
};
