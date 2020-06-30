import Axios from "axios";
import {
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, USER_ORDER_LIST_REQUEST, USER_ORDER_LIST_SUCCESS, USER_ORDER_LIST_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "./orderConstants";

const listUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/user/", {
      headers:
        { Authorization: "Bearer " + userInfo.token }
    });
    dispatch({ type: USER_ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: USER_ORDER_LIST_FAIL, payload: error.message });
  }
}

const listOrders = () => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/", {
      headers:
        { Authorization: "Bearer " + userInfo.token }
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.get("/api/orders/" + orderId, {
      headers:
        { Authorization: "Bearer " + userInfo.token }
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
}

const deleteOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const { userSignin: { userInfo } } = getState();
    const { data } = await Axios.delete("/api/orders/" + orderId, {
      headers:
        { Authorization: "Bearer " + userInfo.token }
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
  }
}

export { detailsOrder, listUserOrders, listOrders, deleteOrder };