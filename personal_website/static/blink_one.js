$(function() {
    $('#btn_run-tests_blink-one').click(function() {
        console.log('Blink one, run tests');
        var jqxhr = $.post( 'blink-one/run-tests', function(data) {
            console.log('Success: ' + data);
        })
        .fail(function(rsp) {
            console.log('Fail: ' + rsp.status + ': ' + rsp.statusText);
        });
    });

    $('#btn_run-production_blink-one').click(function() {
        console.log('Run production');
    });
});
