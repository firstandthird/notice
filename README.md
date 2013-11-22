#Notice

Notice is a jQuery plugin for simple notifications

##Usage

```javascript
//info
$.notice('message');

//success
$.notice('success!', { level: 'success' });

//error
$.notice('error', { level: 'error' });
```

##Options

```javascript
$.notice.defaults = {
	//container to append notice to
	container: 'body',
	//template (shouldn't be changed)
	template: '<div class="notice"><span class="notice-text"></span><div class="notice-close"></div></div>',
	//height of notice
	height: 30,
	//timeout before auto closing, set to false to disable auto close
	timeout: 5000,
	//level (info, success, error)
	level: 'info',
	//top offset for notice
	offsetTop: 0,
	//bottom offset for notice
	offsetBottom: 0,
	//left offset for notice
	offsetLeft: 0,
	// Where to anchor the notice. top or bottom
	anchor: 'top',
	//width of notice
	width: '100%'
};
```

##Installation
CSS provides some default styles, it is optional.

- Development: [JS](https://raw.github.com/jgallen23/notice/master/dist/notice.js) | [CSS](https://raw.github.com/jgallen23/notice/master/dist/notice.css)
- Production: [JS](https://raw.github.com/jgallen23/notice/master/dist/notice.min.js) | [CSS](https://raw.github.com/jgallen23/notice/master/dist/notice.min.css)

##Building

```
npm install
./node_modules/.bin/grunt
```

##Development

```
./node_modules/.bin/grunt dev
```
