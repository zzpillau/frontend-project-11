install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

start:
	npm start

babel:
	npm run build:babel

develop:
	npx webpack serve

build:
	NODE_ENV=production npx webpack

test:
	npm test
