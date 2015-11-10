module.exports = [{
	method: 'GET',
	path: '/test',
	config: {
		handler: function (request) {
			request.reply({test:true});
		}
	}
}];