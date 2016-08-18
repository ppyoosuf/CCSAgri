

exports.appError = function (err) {
    var name = "Application Error", msg;
    if ( err instanceof Error ) {
        msg = err.message;
        name = "Application Error [" + err.name + "]";
    } else {
        msg = err;
    }

    this.message = msg;
    this.name = name;
    console.log('An error occured', this);
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

};