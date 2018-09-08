var socketInterface = {};
socketInterface.io = {};
socketInterface.socket = {};
socketInterface.ready = function () {
	if (socketInterface.onReady) socketInterface.onReady();
}
socketInterface.init = function (io) {
	socketInterface.io = io
}

module.exports = {
	socketInteface: socketInterface,
}
