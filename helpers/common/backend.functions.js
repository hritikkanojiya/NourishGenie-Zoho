const { json } = require("express");
const httpErrors = require("http-errors");
const moment = require("moment");
const winstonLogger = require("./init_winston");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
var md5 = require('md5');

const { JSDOM } = require("jsdom");
globalThis.Node = {
  ELEMENT_NODE: 1,
  TEXT_NODE: 3
};
const appConstants = {
  DEFAULT_LIMIT_SIZE: 10,
  DEFAULT_OFFSET: 0,
  DEFAULT_SORT_BY: "DESC",
  DEFAULT_SORT_ON: "user_id",
};



async function logBackendError(
  scriptPath,
  errorMessage,
  routePath = null,
  clientAddress = null,
  miscellaneous = null,
  level
) {
  try {
    winstonLogger.error({
      level: level ? level : "error",
      details: {
        clientAddress,
        errorMessage,
        miscellaneous,
        routePath,
        scriptPath,
      },
    });
  } catch (error) {
    console.log(`Error while creating a log : ${error.message}`);
    return false;
  }
}


function configureMetaData(querySchema){
  try {
    return {
      sortBy: querySchema?.metaData?.sortBy
        ? querySchema.metaData.sortBy
        : appConstants.DEFAULT_SORT_BY,
      sortOn: querySchema?.metaData?.sortOn
        ? querySchema.metaData.sortOn
        : appConstants.DEFAULT_SORT_ON,
      limit: querySchema?.metaData?.limit
        ? querySchema.metaData.limit 
        : parseInt(appConstants.DEFAULT_LIMIT_SIZE),
      offset: querySchema?.metaData?.offset
        ? querySchema.metaData.offset
        : parseInt(appConstants.DEFAULT_OFFSET),
      search: querySchema?.search
        ? querySchema.search
        : null,
    };
  } catch (error) {
    throw httpErrors.UnprocessableEntity(error.message);
  }
}



module.exports = {
  logBackendError,
  configureMetaData
};
