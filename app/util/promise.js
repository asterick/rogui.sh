function Promise(call, context) {
	var that = this;

	this._onSuccess = [];
	this._onFailure = [];

	this._dispatch = call.bind(context, pass.bind(this), fail.bind(this));
}

Promise.prototype.then = function (success, failure) {
	this.success(success);
	if (failure) { this.error(failure); }
};

Promise.prototype.pass = function () {
	that.successArguments = Array.prototype.splice.call(arguments, 0);
};

Promise.prototype.fail = function () {
	that.failureArguments = Array.prototype.splice.call(arguments, 0);
};

Promise.prototype.success = function (success) {
	if (that.successArguments) {
		success.call
	}
};

Promise.prototype.error = function (success) {

};

module.exports = Promise;
