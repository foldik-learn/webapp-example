app.immediate = function() {
    (function(a, b) {
        console.log(a + ' + ' + b + ' = ' + (a + b));
    }(3, 4));
}
app.mapExample('immediate-function-menu-item', 'immediate-function-example', app.immediate);
