/*
 * grunt-todos
 * https://github.com/kevinlacotaco/grunt-todos
 *
 * Copyright (c) 2013 Kevin Lakotko
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
    'use strict';

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('todos', 'Find and print todos/fixmes as tasks in code.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            verbose: true, // false will skip reporting on files without tasks
            coloredOutput: true, // Colors the console output
            priorities : {
                low : /TODO/, //This will print out blue
                med : /FIXME/, //This will print out yellow
                high : null //This will print out red and cause grunt to fail
            }
        }),
        esprima = require('esprima'),
        _ = grunt.util._,
        errors = 0,
        colors = {
            low : 'blue',
            med : 'yellow',
            high : 'red'
        },
        syntax;

        function getTodos(comments) {
            var todos = [];

            comments.forEach(function(comment) {
                _.each(options.priorities, function(regex, priority) {
                    if (!_.isNull(regex) && regex.test(comment.value)) {
                        todos.push({ priority : priority, comment : comment });

                        if(priority === 'high') {
                            errors++;
                        }
                    }

                });
            });

            return todos;
        }

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            var tasks = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                var log = '', todos;
                // Read file source.
                syntax = esprima.parse(grunt.file.read(filepath), { comment : true, tolerant : true, loc : true });
                todos = getTodos(syntax.comments);

                if (todos.length === 0) {
                    if (options.verbose) {
                        log += 'Tasks found in: '.white + filepath.green + '\n';
                        log += '    ' + 'No tasks found!'.white + '\n';
                    }
                } else {
                    log += 'Tasks found in: '.white + filepath.green + '\n';
                    todos.forEach(function(todo) {
                        var comment = todo.comment,
                            priority = todo.priority;

                        log += '    ' + '[Line: '.bold + comment.loc.start.line.toString().bold + '] '.bold + '['.bold + priority.bold + '] '.bold + comment.value[colors[priority]] + '\n';
                    });
                }

                return log;
            }).join('');

            if(_.isUndefined(f.dest)) {
                if (options.coloredOutput === true) {
                    grunt.log.write(tasks);
                } else{
                    grunt.log.write(grunt.log.uncolor(tasks));
                }
            } else {
                grunt.file.write(f.dest, grunt.log.uncolor(tasks));
                grunt.log.writeln('File "' + f.dest + '" created.');
            }

        });

        if(errors !== 0) {
            grunt.log.error('Found ' + errors + ' high priority tasks');
        }

        return this.errorCount === 0;

    });

};
