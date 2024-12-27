init:
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
	npm build:babel

log:
	git log --oneline