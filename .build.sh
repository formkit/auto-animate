rm -rf ./dist
npx rollup -c rollup.config.js
FRAMEWORK=vue npx rollup -c rollup.config.js
FRAMEWORK=react npx rollup -c rollup.config.js
DECLARATIONS=true npx rollup -c rollup.config.js
mv ./dist/src/index.d.ts ./dist/index.d.ts
mv ./dist/src/vue.d.ts ./dist/vue.d.ts
mv ./dist/src/react.d.ts ./dist/react.d.ts
rm -rf ./dist/src
rm ./dist/index.js
cp package.json ./dist/package.json
