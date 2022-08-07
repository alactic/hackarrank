import { Type } from "../../actions/hackerTest/hackerTest";

const INTIAL_STATE = {};
const machineTypeReducer = (state = INTIAL_STATE, actions) => {
  switch (actions.type) {
    case Type.GET_MACHINE_TYPE:
      return {
        ...state,
        allTypes: actions.payload,
      };
    default:
      return { ...state };
  }
};

export default machineTypeReducer;
