# grunt-todos

> Grunt plugin for finding todos/fixmes in code

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-todos --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-todos');
```

## The "todos" task

### Overview
In your project's Gruntfile, add a section named `todos` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  todos: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.priorities
Type: `Object`
Default value: `{ low : /TODO/, med : /FIXME/, high : null }`

An object that specifies what the various priorities are for the target.
High will add to the errorCount.


#### options.verbose
Type: `Boolean`
Default value: `true`

Verbose mode will cause the plugin to report on every file, regardless if there are actual lines to report or not. If set to false, only files with todos will be mentioned.

### Usage Examples

#### Default Options
In this example, the default options are used to find all the TODOs and FIXMEs in the code.

```js
grunt.initConfig({
  todos: {
    options: {},
    src : ['src/testing', 'src/123']
  }
})
```

#### Custom Options

In this example, custom options are used to escalate TODO to med priority.

```js
grunt.initConfig({
  todos: {
    options: {
        priorities : {
            low : null,
            med : /(TODO|FIXME)/
        }
    },
    src : ['src/testing', 'src/123']
  }
})
```

In this example, we want minimize the total output by setting `verbose` to false.

```js
grunt.initConfig({
  todos: {
    options: {
        verbose: false
    },
    src : ['src/**/*.js']
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
