import prettier from 'eslint-config-prettier';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		plugins: {
			'simple-import-sort': simpleImportSort,
			unicorn
		},
		rules: {
			'no-undef': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/no-explicit-any': 'error',
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						[
							'^node:',
							'^\\$app/',
							'^@?\\w',
							'^@styles/',
							'^@theme/',
							'^@components/',
							'^@assets/',
							'^@modules/',
							'^\\$lib/',
							'^\\.\\.',
							'^\\.',
							'^.*\\u0000$'
						]
					]
				}
			],
			'simple-import-sort/exports': 'error'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			'svelte/no-at-html-tags': 'error',
			'svelte/no-target-blank': 'error',
			'svelte/mustache-spacing': 'error',
			'svelte/prefer-class-directive': 'error',
			'svelte/shorthand-attribute': 'error',
			'svelte/shorthand-directive': 'error',
			'svelte/html-quotes': 'warn'
		}
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.svelte'],
		rules: {
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'default',
					format: ['camelCase'],
					leadingUnderscore: 'allow'
				},
				{
					selector: 'variable',
					format: ['camelCase', 'UPPER_CASE', 'PascalCase']
				},
				{
					selector: 'typeLike',
					format: ['PascalCase']
				},
				{
					selector: 'import',
					format: ['camelCase', 'PascalCase', 'kebab-case']
				}
			]
		}
	},
	{
		files: ['src/**/*.{ts,tsx,svelte,js,jsx}'],
		rules: {
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['^\\+']
				}
			]
		}
	}
);
