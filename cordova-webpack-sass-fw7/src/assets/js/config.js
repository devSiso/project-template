var config = {};

config.debug = true;
config.version = "0.0.1";

config.api = {};
config.api.url = 'localhost:3000';

config.push = {};

config.timeToVerify = {};
config.timeToVerify.connection = 5000;
config.timeToVerify.notifications = 10000;
config.timeToVerify.inAppNotification = 5000;

config.pages = 'pages';

module.exports = config;
