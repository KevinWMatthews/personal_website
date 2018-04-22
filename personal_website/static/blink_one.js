$(function() {
    function log_post_success_to_console(rsp) {
        console.log('Success: ' + rsp);
    }

    function log_post_failure_to_console(rsp) {
        console.log('Fail: ' + rsp.status + ': ' + rsp.statusText);
    }

    $('#btn_run-tests_blink-one').click(function() {
        var jqxhr = $.post( 'blink-one/run-tests', function(rsp) {
            log_post_success_to_console(rsp);
        })
        .fail(function(rsp) {
            log_post_failure_to_console(rsp);
        });
    });

    $('#btn_run-production_blink-one').click(function() {
        var jqxhr = $.post( 'blink-one/run-production', function(rsp) {
            log_post_success_to_console(rsp);
        })
        .fail(function(rsp) {
            log_post_failure_to_console(rsp);
        });
    });
});
