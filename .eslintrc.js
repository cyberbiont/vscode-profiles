module.exports = {
	env: {
		es6: true,
		node: true,
		// jest: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	// plugins: ['jest'],
	extends: [
		// 'eslint:recommended',
		// 'standard',
		'airbnb-base',
		'plugin:import/errors',
		'plugin:import/warnings',
		// "plugin:node/recommended",
		// 'plugin:chai-expect/recommended',
		// 'plugin:chai-friendly/recommended',
		'plugin:prettier/recommended', // disables rules that conflict with Prettier. Make sure to put it last in the extends array, so it gets the chance to override other configs.
	],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: [
		// 'no-null'
	],
	rules: {
		// airbnb override
		'no-restricted-syntax': [
			'error',
			{
				selector: 'ForInStatement',
				message:
					'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
			},
			// {
			// 	selector: 'ForOfStatement',
			// 	message:
			// 		'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
			// },
			{
				selector: 'LabeledStatement',
				message:
					'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
			},
			{
				selector: 'WithStatement',
				message:
					'`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
			},
		],
		// 'no-null/no-null': 2,
		'class-methods-use-this': 'off',
		'func-names': 'off',
		'global-require': 'off',
		'no-bitwise': ['error', { allow: ['~'] }],
		'no-console': 'off',
		'no-debugger': 'off',
		'no-param-reassign': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'no-unused-vars': 'off',
		'max-classes-per-file': 'off',
		'no-plusplus': 'off',
		// 'no-use-before-define': 'off',
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: ['**/*.(test|spec).(js|jsx|ts|tsx)'] },
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
			// airbnb https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
		],
		'import/no-cycle': 'off',
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			extends: [
				'plugin:import/typescript',
				/* not all eslint core rules are compatible with TypeScript,
				so you need to add both eslint:recommended and plugin:@typescript-eslint/eslint-recommended
				(which will adjust the one from eslint appropriately for TypeScript) to your config */
				'plugin:@typescript-eslint/eslint-recommended',
				'plugin:@typescript-eslint/recommended', // enable all the recommended rules for our plugin.
				// 'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
			],
			parser: '@typescript-eslint/parser',
			rules: {
				'import/no-extraneous-dependencies': [
					'error',
					{ devDependencies: ['**/*.{test,spec}.{js,jsx,ts,tsx}'] },
				],
				'no-useless-constructor': 'off',
				'@typescript-eslint/no-useless-constructor': 'error',
				// нужны оба правила для no-useless-constructor: https://gitmemory.com/issue/facebook/create-react-app/6861/485597757
				'@typescript-eslint/no-unused-vars': 'off', // в пользу ts parser-а
				// '@typescript-eslint/no-use-before-define': 'off',
				// '@typescript-eslint/interface-name-prefix': [
				// 	'error',
				// 	{ prefixWithI: 'always' },
				// ],
				'lines-between-class-members': [
					'error',
					'always',
					{
						exceptAfterSingleLine: true,
					},
				],
			},
			settings: {
				'import/resolver': {
					node: {
						extensions: ['.js', '.jsx', '.ts', '.tsx'],
						moduleDirectory: ['node_modules', 'src/'],
					},
				},
				'import/core-modules': ['vscode'],
			},
		},
	],
};
