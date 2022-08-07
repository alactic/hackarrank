import { createAction } from "redux-promise-middleware-actions";

export const Type = {
  GET_MACHINE_TYPE: "GET_MACHINE_TYPE",
};

export const getTypes = createAction(Type.GET_MACHINE_TYPE, (data) => data);
