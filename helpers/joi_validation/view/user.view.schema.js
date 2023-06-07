
const joi = require("joi");

const userDetailSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default('user_id'),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});




const completeReportSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const subscriptionSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),

  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default("DESC"),
    sortOn: joi.string().trim().allow(null).default("created"),
    limit: joi.number().allow(null).default(2),
    offset: joi.number().allow(null).default(2)
  })
});

const weightCheckSchema =  joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const vitaminSchema =  joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const dietSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const messageSchema =  joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default('msg_id'),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const feedBackSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const whatsappChatSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const remainingQuotaChatSchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  date: joi.string().trim().required(),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const userActivitySchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  date: joi.string().trim().required().when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

const foodDairySchema = joi.object({
  userId: joi.alternatives().try(
    joi.string().trim().regex(/^\d+$/),
    joi.number().integer()
  ).when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  search: joi.string().trim().allow(null).default(null),
  date: joi.string().trim().required().when('search', {
    is: null,
    then: joi.required(),
    otherwise: joi.allow(null),
  }),
  metaData: joi.object().keys({
    sortBy: joi.string().trim().allow(null).default(null),
    sortOn: joi.string().trim().allow(null).default(null),
    limit: joi.number().allow(null).default(null),
    offset: joi.number().allow(null).default(null),
  }),
});

module.exports = {
  userDetailSchema,
  completeReportSchema,
  subscriptionSchema,
  weightCheckSchema,
  vitaminSchema,
  dietSchema,
  messageSchema,
  feedBackSchema,
  whatsappChatSchema,
  remainingQuotaChatSchema,
  userActivitySchema,
  foodDairySchema
}