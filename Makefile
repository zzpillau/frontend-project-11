install:
	npm ci

dev:
	npm run dev

lint:
	npx eslint .

build:
	NODE_ENV=production npm run build

test:
	echo no tests

fix:
	npx eslint --fix .

prew:
	npm run preview