//      CLog.js 1.0.0
//      https://github.com/CVarisco/CLog.js
//      http://www.christianvarisco.com
//      Copyright (c) 2016 Christian Varisco



// Creates the CLog object function
function CLog(options) {


    //On input it assigns a custom color, otherwise it sets the default color
    this.options = {
        group: options.group || null,
        colors: options.colors || null
    };

    this.options.colors.default = "#000000";
    /*
        Here You can write another options
    */

};

// Returns an array where argument[0] is always a color. 
// Color is set based on input (id or hex) or is set to default (black)
CLog.prototype.normalizeArguments = function(args) {

    var colors = this.options.colors;               // Get colors from options
    var color = '';                                 // Init color 
    var argumentsArray = [].slice.apply(args);      // Convert arguments into an Array

    // Search in options.colors or set color
    if (!!colors && typeof argumentsArray[0] === "string") {
        if (argumentsArray[0][0] === "#") {
            color = argumentsArray[0];
        } else {
            for (c in colors) {
                if (argumentsArray[0] === c) color = colors[argumentsArray[0]];
            }
        }
    }

    //If color in the arguments doesn't exist, unshift the default color
    if (color === '') argumentsArray.unshift(this.options.colors.default);
    else argumentsArray[0] = color;

    return argumentsArray;

};

//Here's comes the Magic!
CLog.prototype.log = function() {

    // Check if Browser is Chrome
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {

        var normalizedArguments = this.normalizeArguments(arguments); //Returns a normalized array (with [0] being a color)
        var outputArgs = [];
        var isGroupped = this.options.group;

        // Formats the output and prints to console
        function print(args) {
            var output = '%c ';
            for (var i = 1; i < args.length; i++) {
                switch (typeof args[i]) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                        output += args[i] + ' ';
                        break;
                    case 'undefined':
                        output += "'undefined' ";
                        break;
                    case 'object':
                    case 'array':
                    case 'function':
                        outputArgs.push(args[i]);
                        output += (isGroupped) ? '' : '(%O) ';
                        break;
                }

            }

            //If group is active, create group in console
            if (isGroupped) {
                console.groupCollapsed(output, "color:" + args[0] + ";");

                outputArgs.forEach(function(arg) {
                    console.dir(arg);
                });

                console.groupEnd();
            } else {
                outputArgs.splice(0, 0, output);
                outputArgs.splice(1, 0, "color:" + args[0] + ";");

                console.log.apply(console, outputArgs);
            }
        };

        print(normalizedArguments);

    } else {
        console.log.apply(console, arguments);
    }

};

//Clear console if called
CLog.prototype.clear = function() {
    console.clear();
};
