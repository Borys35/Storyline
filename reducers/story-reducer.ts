import produce from "immer";
import { useReducer } from "react";
import { StoryForm } from "../interfaces";
import * as actionTypes from "./action-types";
import { Action } from "./actions";

export const storyInitialState: StoryForm = {
  name: "",
  description: "",
  isPrivate: false,
  slides: [{ title: "Slide 1", text: "", drawingUrl: null }],
};

export const storyReducer = (state: StoryForm, { type, payload }: Action) => {
  switch (type) {
    case actionTypes.SET_STORY_NAME:
      return { ...state, name: payload.name };
    case actionTypes.SET_STORY_DESCRIPTION:
      return { ...state, description: payload.description };
    case actionTypes.SET_STORY_IS_PRIVATE:
      return { ...state, isPrivate: payload.isPrivate };
    case actionTypes.ADD_STORY_SLIDE:
      return { ...state, slides: [...state.slides, payload.slide] };
    case actionTypes.DELETE_STORY_SLIDE:
      return produce(state, (draft) => {
        draft.slides.splice(payload.index, 1);
      });
    case actionTypes.UPDATE_STORY_SLIDE:
      return produce(state, (draft) => {
        draft.slides[payload.index] = {
          ...draft.slides[payload.index],
          ...payload.slide,
        };
      });
    default:
      return state;
  }
};

export const useStoryReducer = () =>
  useReducer(storyReducer, storyInitialState);
