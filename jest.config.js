module.exports = {
  setupFiles: ['<rootDir>/.jest/set-env-vars.js'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/domain/**/*',
    '!**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|webp)$': '<rootDir>/__mocks__/file-mock.js',
    '^.+\\.svg$': '<rootDir>/__mocks__/svg-mock.js',
    '^.+\\.css$': '<rootDir>/__mocks__/css-mock.js',
    '@/(.*)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.scss$': 'jest-scss-transform',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
  maxWorkers: '50%',
};
