import nextJest from 'next/jest'

const jestConfig = nextJest({
    dir: './',
})

/** @type { import('jest').Config } */
const config = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>jest.setup.js'],
    preset: 'ts-jest',
}

export default jestConfig(config)