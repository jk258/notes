文档：[https://rollupjs.org/guide/en/](https://rollupjs.org/guide/en/)
# rollup.config.js
```javascript

import json from 'rollup-plugin-json'
/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/boundle.umd.js',
			format: 'umd',
			name: 'rollup-utils',
		},
		{
			file: 'dist/boundle.esm.js',
			format: 'esm',
		},
		{
			file: 'dist/boundle.js',
			format: 'iife',
		},
	],
	plugins: [json()],
}
export default config

```
