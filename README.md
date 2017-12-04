# Notice

Notice is a plugin for simple notifications.

## Usage

Import notice:

```javascript
  import Notice form 'notice';

  Notice('Test Notification');
```

Import [default CSS styles](styles.css)

## Notice(message, [options])

`message` {string} - Notice text to display

List of options:

| Option      | Default                                                                         | Action                        |
|-------------|---------------------------------------------------------------------------------|-------------------------------|
| `level`     | _{string='default'}_ Options: 'default', 'info', 'success', 'warning', 'error'} | Type of alert                 |
| `timeout`   | _{number=5000}_                                                                 | Timeout before auto closing   |
| `container` | _{string&#124;Element&#124;NodeList='body'}_                                              | Container to append notice to |
| `showClose` | _{boolean=true}_                                                                | Display close button          |

```javascript
  Notice('My message', {
    level: 'info'
    timeout: 2000,
    container: document.body
    showClose: true
  });
};
```

## License

### MIT License

Copyright (c) 2016 First+Third

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
