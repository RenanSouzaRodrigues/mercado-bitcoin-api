module.exports = {
    rootDir: "./",
    roots: ["<rootDir>"],
    testEnvironment: "node",
    setupFiles: [],
    collectCoverage: true,
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/$1",
    },
    modulePathIgnorePatterns: ["<rootDir>/dist"],
    testTimeout: 30000,
  };