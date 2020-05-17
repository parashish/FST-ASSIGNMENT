module.exports = {
  rootDir: '../../',
  setupFiles: ['<rootDir>/config/test/jest.setup.js'],
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/public/',
    '<rootDir>/server/',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,jsx}',
    '!<rootDir>/src/**/index.{js,jsx}',
    '!<rootDir>/src/commons/**',
    '!<rootDir>/src/images/**',
    '!<rootDir>/src/styles/**',
    '!<rootDir>/src/utils/**',
    '!<rootDir>/src/*.js',
    '!<rootDir>/src/**/constants.js',
    '!**/node_modules/**',
  ],
  coverageReporters: ['lcov', 'json', 'text', 'text-summary'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>.*(node_modules).*$'],
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/mock/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/config/mock/styleMock.js',
    '^react$': '<rootDir>/node_modules/react/cjs/react.development.js',
    '^react-dom$':
      '<rootDir>/node_modules/react-dom/cjs/react-dom.development.js',
  },
  coverageThreshold: {
    global: {
      statements: 55,
      branches: 43,
      functions: 56,
      lines: 60,
    },
  },
};
