import agent from "../agent";
import { ASYNC_START, ASYNC_END } from "../constants/actionTypes";

function isPromise(v) {
    return v && typeof v.then === "function";
}

const mainMiddleware = (store) => (next) => (action) => {
    // console.log(action)
    if (isPromise(action.payload)) {
        store.dispatch({ type: ASYNC_START, subtype: action.type });
        const skipTracking = action.skipTracking;

        action.payload.then(
            (res) => {
                console.log("here then");
                action.payload = res;
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                store.dispatch(action);
            },
            (error) => {
                // console.log("here error")
                // console.log(error)
                // debugger
                action.error = true;
                action.payload =
                    error && error.response && error.response.body
                        ? error.response.body
                        : error.response || error;
                // if (!action.skipTracking) {
                store.dispatch({ type: ASYNC_END, promise: action.payload });
                // }

                store.dispatch(action);
            }
        );

        return;
    }

    next(action);
};

export default mainMiddleware;
