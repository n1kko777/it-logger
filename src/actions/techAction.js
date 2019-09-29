import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR
} from "./types";
import M from "materialize-css/dist/js/materialize.min.js";

// Get techs fron server
export const getTechs = () => async dispatch => {
  try {
    setLoading();

    const res = await fetch("/techs");
    const data = await res.json();

    dispatch({
      type: GET_TECHS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Add tech to server
export const addTech = tech => async dispatch => {
  try {
    setLoading();

    const res = await fetch("/techs", {
      method: "POST",
      body: JSON.stringify(tech),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data
    });

    M.toast({
      html: `Пользователь ${tech.firstName} ${tech.lastName} добавлен!`
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText
    });
  }
};

// Delete tech to server
export const deleteTech = ({ firstName, lastName, id }) => async dispatch => {
  try {
    setLoading();

    await fetch(`/techs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_TECH,
      payload: id
    });
    M.toast({ html: `Пользователь ${firstName} ${lastName} удален!` });
  } catch (error) {
    dispatch({
      type: DELETE_TECH,
      payload: error.response.statusText
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
