# CLog.js

Small (3 KB) Javascript library to color and organize your console.log in **Google Chrome** !

## Why should I use it ?

If you frequently use the console.log function in your projects, it might become tricky or confusing to read the log and find exactly what you're looking for at the first glance.
With my library you can now color code and organize your output by sections (eg. home, login, etc...) or type (eg. log, error, etc...) so you can easily find exactly what you're looking for in a matter of seconds

## How to install

Download from Bower or directly on GitHub.
```
bower install clog
```

## How to use CLog.

It's very simple to use. Declare a new CLog object with its options.

```javascript

var options = {
    group: false,            // The console.group mode of Google Chrome is set to false by default
    colors: {               // Define the color. (Default color: Black)
        log: "#31f095",
        home: "#e86024",
        error: "#e22f2f",
        network: "#08bce9",
    }
}

var CLog = new CLog(options);

```

When you want to log with CLog, use the .log() method.

```javascript

// The first argument need to be a color. 
CLog.log('log', 'String log', 12345, 'Another String', { id: '1234'}, ['a','b', 'c'], true, false);

//If you want, you can declare directly an hexadecimal 
CLog.log('#52361f', parameters...);

```

If the first argument isn't a color ( id or hex ), it uses the default color which is black.

## License

This software is released under MIT license terms.

---

Have fun coding!
