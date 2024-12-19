init:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

start:
	npm start

babel:
	npm build:babel

log:
	git log --oneline