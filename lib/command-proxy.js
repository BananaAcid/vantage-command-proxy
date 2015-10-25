/**
 * @author Nabil Redmann (BananaAcid)
 * @url    banaacid.de/
 */

"use strict";

module.exports = function(Vantage, options) 
{
	if (typeof(options) !== 'object')
		throw 'missing options={..}';

	const packageJsonFile = `${options.path}/package.json`;
	const packageJson = function(){try { return require(packageJsonFile); } catch (ex) { return {}; }}();

	const infoName = packageJson.name || '';
	const infoVersion = packageJson.version || 'unknown';
	const infoDescription = ' * ' + (packageJson.description || 'no info');
	const ia = (packageJson.author || packageJson.maintainers || {});
	const infoAuthor = typeof(ia)=='string' ? ` * ${ia}\n` : Object.keys(ia).map(function(e,i){ return ` * ${ia[e]}\n`; }).join('') || ' * unknown \n';


	// collects commands
	let VantageProxy = {
		Vantage: Vantage,
		_newOptions: [],
		command: function(cmd, desc)
		{ this._newOptions.push(cmd); return Vantage.command(cmd, desc); },
		mode: function(cmd, desc) { this._newOptions.push(cmd); return Vantage.mode(cmd, desc); },
		logNewCmds: function(Vantage_log) {Vantage_log( 'Commands:\n' + this._newOptions.map(function(e,i){ return ' - ' + e + '\n' }).join('') );}
	};


	VantageProxy
		.command(`version ${options.cmd}`, `${infoName} version ${infoVersion}`)
		.action(function(cmd,cb) {
			let self = this, Vantage_log = function(m){ self.log( m ) };

			Vantage_log(
				'Author' + '\n'
				+ infoAuthor
				+'INFO' + '\n'
				+ infoDescription 
				+'\n'
			);
			
			VantageProxy.logNewCmds(Vantage_log);
			cb();
		});

	Vantage.Proxy = VantageProxy;
	return Vantage;
}