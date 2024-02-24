import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";

//Promise를 반환하는 Wrapper
const PromisableActionWrapper = <Type extends string, Payload>(
    dispatch: Dispatch,
    fn: ActionCreatorWithPayload<Payload, Type>,
    payload: {},
  ) => {
    return new Promise((resolve, reject) => {
      try {
        const newPayload: Payload = {...payload, resolve, reject} as Payload;
        dispatch(fn(newPayload));
      } catch (e) {
        reject();
      }
    });
  };
  export default PromisableActionWrapper;