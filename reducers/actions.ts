import { Slide } from "../components/create-story/slides-step-view";
import * as actionTypes from "./action-types";

export interface Action {
  type: string;
  payload: { [key: string]: any };
}

export function setStoryName(name: string): Action {
  return {
    type: actionTypes.SET_STORY_NAME,
    payload: { name },
  };
}

export function setStoryDescription(description: string): Action {
  return {
    type: actionTypes.SET_STORY_DESCRIPTION,
    payload: { description },
  };
}

export function setStoryIsPrivate(isPrivate: boolean): Action {
  return {
    type: actionTypes.SET_STORY_IS_PRIVATE,
    payload: { isPrivate },
  };
}

export function addStorySlide(slide: Slide): Action {
  return {
    type: actionTypes.ADD_STORY_SLIDE,
    payload: { slide },
  };
}

export function deleteStorySlide(index: number): Action {
  return {
    type: actionTypes.DELETE_STORY_SLIDE,
    payload: { index },
  };
}

export function setStorySlide(index: number, slide: Slide): Action {
  return {
    type: actionTypes.SET_STORY_SLIDE,
    payload: { index, slide },
  };
}
