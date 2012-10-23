build: css js

js:
	node ./node_modules/.bin/dist -f notice.js -o dist -c lib/copyright.js < lib/notice.js 

css:
	node ./node_modules/.bin/stylus < lib/notice.styl > dist/notice.css

install:
	npm install stylus
	npm install dist
