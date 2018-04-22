// Reference socket.io-client at:
// https://github.com/socketio/socket.io-client

$(function() {
    var namespace = '/blink-one';
    var socket = io.connect('http://' + document.domain + ':' + location.port + namespace);

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

    // SocketIO
    socket.on('connect', function() {
        console.log('Websocket connected');
    });

    socket.on('disconnect', function() {
        console.log('Websocket disconnected');
    });

    socket.on('message', function(msg) {
        $('#div_status-log').append('<p>' + msg + '</p>');
    });

    socket.on('clear log', function(msg) {
        console.log('Clear status log');
        $('#div_status-log').html('');
    });

    function log_post_success_to_console(rsp) {
        console.log('Success: ' + rsp);
    }

    function log_post_failure_to_console(rsp) {
        console.log('Fail: ' + rsp.status + ': ' + rsp.statusText);
    }
});
