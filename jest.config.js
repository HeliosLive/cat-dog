module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    globals: {
        isolatedModules: true
    },
    roots: ['src'],
    setupFilesAfterEnv: [
        './src/setup-jest.ts'
    ],
    reporters: [
        'default',
        'jest-junit'
    ],
    collectCoverage: false,
    collectCoverageFrom: [
        '**/src/**/*.ts',
        '!**/node_modules/**',
        '!**/src/app/core/svg-register/**',
        '!**/src/app/shared/utils/**',
        '!**/src/main.ts',
        '!**/src/jestGlobalMocks.ts',
        '!**/src/**/*.module.ts',
        '!test/**',
        '!**/polyfills.ts',
        '!**/environments/**',
        '!**/src/setupJest.ts',
        '!**/index.ts',
        '!**/*.config.ts'
    ],
    testResultsProcessor: "jest-sonar-reporter",
    testPathIgnorePatterns: [
        '/node_modules/',
        '/src/environments/'
    ],
    restoreMocks: true,
    moduleDirectories: [
        ".",
        "src",
        "node_modules"
    ],
    moduleNameMapper: {
        '@core/(.*)': 'src/app/core/$1',
        '@shared/(.*)': 'src/app/shared/$1',
    }
};
