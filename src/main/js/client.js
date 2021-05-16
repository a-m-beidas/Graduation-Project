'use strict';

const rest = require('rest');
const defaultRequest = require('rest/interceptor/defaultRequest');
const mime = require('rest/interceptor/mime');
const baseRegistry = require('rest/mime/registry');

const registry = baseRegistry.child();

registry.register('text/uri-list');
registry.register('application/json', require('rest/mime/type/application/json'));

module.exports = rest
        .wrap(mime, { registry: registry })
		.wrap(defaultRequest, { headers: { 'Accept': 'application/json' }});