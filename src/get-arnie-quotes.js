'use strict';

const { httpGet } = require('./mock-http-interface');

/**
 * Maps a response to the required format while preserving quote format
 * @param {Object} response HTTP response from httpGet
 * @returns {Object} Formatted quote or failure object
 */
const mapResponse = async (url) => {
  const { status, body } = await httpGet(url);
  const { message } = JSON.parse(body);
  
  return status === 200
    ? { 'Arnie Quote': message }
    : { 'FAILURE': message };
};

/**
 * Executes a HTTP GET request on each of the URLs, transforms each of the HTTP responses returns the results.
 * @param {string[]} urls The urls to be requested
 * @return {Promise} A promise which resolves to a results array
 */
const getArnieQuotes = (urls) => {
  return Promise.all(urls.map(mapResponse));
};

module.exports = {
  getArnieQuotes,
};
