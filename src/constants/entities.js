import { schema } from 'normalizr';

export const ACTIONS = {
  FETCH_ENTITY: 'FETCH_ENTITY',
  NORMALIZE_ENTITY: 'NORMALIZE_ENTITY',
  SET_ENTITIES: 'SET_ENTITIES',
};

/* NOTE: For all schemas, data should already be camelCased */

const userSchema = new schema.Entity('users',
  // definition
  {},

  // options
  {
    idAttribute: user => user.id,
  },
);

export const SCHEMAS = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
};
