module.exports = {
  verbose: true,
  // clearMocks: true,
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  roots: ['./src', './tests'],
  testMatch: ['**/*.test.ts']
}
