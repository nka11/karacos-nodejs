var assert = require('assert'),
	crypto = require('crypto'),
	karacos = require('karacos'),
	log4js = require('log4js')(),
	testEnv = require('./testEnv.js')
	sys = require('sys');

logger = log4js.getLogger('karacos.model.Domain');

function assertTestDomain(domain, test){
	test.strictEqual(domain.attr('type'), "Domain", "Type assertion failed");
	logger.info("['test Domain#get_by_name'] Found result: " + domain._data.type + " of name " + domain._data.name);
	logger.info("Type of instance :" + domain._data.type);
	//console.log(domain);	
	return;
}

function test_get_by_fqdn(domain,test, callback) {
	karacos.model.Domain.get_by_fqdn(domain.attr('fqdn'), function(get_err,expected_domain) {
		console.log("['test_get_by_fqdn'] domain found " + sys.inspect(expected_domain));
			assertTestDomain(expected_domain,test);
			if (typeof callback === "function") {
				callback(domain, test);
			}
	});
}

function test_get_by_name(domain,test, callback) {
	logger.info("START ['test Domain#get_by_name']");
	karacos.model.Domain.get_by_name('test_get_by_name', function(get_err,expected_domain) {
		console.log("['test Domain#get_by_name'] in karacos.model.Domain.get_by_name callback");
		console.log(get_err);
		test.ok(expected_domain !== undefined);
		if (typeof callback === "function") {
			callback(domain, test);
		}
	});
}

exports['test Domain#get_by_fqdn'] = function(test) {
	logger.info("START ['test Domain#get_by_fqdn']");
	karacos.wrap_testDomain('test_get_by_fqdn',test,test_get_by_fqdn);
	
}
exports['test Domain#get_by_name'] = function(test) {
	logger.info("START ['test Domain#get_by_name']");
	karacos.wrap_testDomain('test_get_by_name',test,test_get_by_name);
	
}