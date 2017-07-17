var app = app || {};

$(document).ready(function() {
  $('.code pre').each(function(i, block) {
    hljs.highlightBlock(block);
    app.activeExample = $('#function-example');
    /*app.activeExample.css('display', 'inline-block');*/
    app.activeExampleResult = $('#function-example .result-holder div');
    console.log = function(content) {
        app.activeExampleResult.empty();
        setTimeout(function() {
            app.activeExampleResult.append('<div class="result">' + content + '</div>');
        }, 300);
    }
  });
});

app.mapExample = function(menuId, holderId, fun) {
    $('#' + menuId).click(function() {
        app.activeExample.css('display', 'none');
        app.activeExampleResult.empty();
        app.activeExample = $('#' + holderId);
        app.activeExample.css('display', 'inline-block');
        app.activeExampleResult = $('#' + holderId + ' .result-holder div');
        $('#' + holderId + ' .result-holder .try-button').click(function() {
            setTimeout(function() {
                app.activeExampleResult.empty();
                fun();
            }, 300);
        });
    })
}
