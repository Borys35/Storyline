import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { storyInfoSchema } from "../../lib/schemas";
import { GenericStepProps } from "../../pages/create-story";
import {
  setStoryDescription,
  setStoryIsPrivate,
  setStoryName,
} from "../../reducers/actions";
import Field from "../field";
import Form from "../form";

interface Props extends GenericStepProps {}

interface FormData {
  name: string;
  description: string;
  isPrivate: boolean;
}

const MainStepView: FC<Props> = ({ state, dispatch, shouldTrigger }) => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(storyInfoSchema) });

  useLayoutEffect(() => {
    setValue("name", state.name);
    setValue("description", state.description);
    setValue("isPrivate", state.isPrivate);
  }, [setValue]); // eslint-disable-line

  useLayoutEffect(() => {
    if (!shouldTrigger) return;
    trigger();
  }, [shouldTrigger, trigger]);

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === "name" && values.name !== undefined)
        dispatch(setStoryName(values.name));
      if (name === "description" && values.description !== undefined)
        dispatch(setStoryDescription(values.description));
      if (name === "isPrivate" && values.isPrivate !== undefined)
        dispatch(setStoryIsPrivate(values.isPrivate));
      trigger(name);
    });

    return () => subscription.unsubscribe();
  }, [watch, dispatch, trigger]);

  return (
    <Form>
      <Field label="Name" inputProps={register("name")} error={errors.name} />
      <Field
        label="Description"
        inputProps={register("description")}
        type="textarea"
        error={errors.description}
      />
      <Field
        label="Is Private?"
        inputProps={register("isPrivate")}
        type="checkbox"
        tip="Everyone still will be able to watch the story, but it won't be listed on any lists"
        error={errors.isPrivate}
      />
    </Form>
  );
};

export default MainStepView;
