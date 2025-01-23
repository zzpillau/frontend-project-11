install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

start:
	npm start

build:
	npm run build

babel:
	npm run build:babel
