import { Config } from 'jest';
import nextJest from 'next/jest';

const jestConfig = nextJest({
    dir: './',
});

const config: Config = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>jest.setup.ts'],
    preset: 'ts-jest',
};

export default jestConfig(config);
