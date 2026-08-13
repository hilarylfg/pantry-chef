import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import fsdPlugin from 'eslint-plugin-fsd-lint'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
	fsdPlugin.configs.strict,
	...nextVitals,
  ...nextTs,
  {
		rules: {
			'fsd/ordered-imports': 'off'
		}
	},
	globalIgnores([
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts'
	]),
])

export default eslintConfig
