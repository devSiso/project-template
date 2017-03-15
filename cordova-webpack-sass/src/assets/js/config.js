var Config = {};

Config.apitoken = "jupiter432sopranos";
Config.posfix = ":xxx";
Config.company = "nodocc";
Config.twurl = "teamwork.com/";

Config.key = window.btoa(Config.apitoken + Config.posfix);
Config.apiurl = Config.company + '.' + Config.twurl;

module.exports = Config;
