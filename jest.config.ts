import type { Config } from '@jest/types';

const config = async (): Promise<Config.InitialOptions> => {
	return {
		preset: 'ts-jest',
		testEnvironment: 'node',
		testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s?(x)'],
	};
};

export default config;
