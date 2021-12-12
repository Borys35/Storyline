import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import produce from "immer";
import React, { useImperativeHandle, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { slideSchema } from "../../lib/schemas";
import { GenericStepProps } from "../../pages/create-story";
import {
  addStorySlide,
  deleteStorySlide,
  setStorySlide,
} from "../../reducers/actions";
import Button from "../button";
import Field from "../field";
import Form from "../form";
import SlideItem from "./slide-item";

interface Props extends GenericStepProps {
  count: number;
  addCount: () => void;
}

export interface Slide {
  title: string;
  text: string;
}

// find first slide with error
// trigger and validate form
// watch form
// highlight all slides with error

const SlidesStepView = React.forwardRef<any, Props>(
  ({ state, dispatch, shouldTrigger, count, addCount }, ref) => {
    const { slides } = state;
    const [index, setIndex] = useState(0);
    const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
    const {
      register,
      watch,
      setValue,
      trigger,
      formState: { errors },
    } = useForm<Slide>({ resolver: yupResolver(slideSchema) });

    function handleAddSlide() {
      dispatch(addStorySlide({ title: `Slide ${count}`, text: "" }));
      addCount();

      setIndex(slides.length);
    }

    function handleDeleteSlide(i: number) {
      if (slides.length <= 1) return;

      dispatch(deleteStorySlide(i));
      if (index === i) setIndex(0);
    }

    function handleChangeSlide(i: number) {
      setIndex(i);

      if (errorIndexes.includes(i))
        setErrorIndexes(
          produce(errorIndexes, (draft) => {
            draft.splice(
              draft.findIndex((ei) => ei === i),
              1
            );
          })
        );
    }

    useImperativeHandle(ref, () => ({
      changeSlide: (index: number) => handleChangeSlide(index),
      highlightSlides: (indexes: number[]) => setErrorIndexes(indexes),
    }));

    useLayoutEffect(() => {
      if (!slides[index]) return;

      setValue("title", slides[index].title);
      setValue("text", slides[index].text);
    }, [index, slides.length, setValue]); // eslint-disable-line

    useLayoutEffect(() => {
      if (!shouldTrigger) return;
      trigger();
    }, [shouldTrigger, trigger]);

    useLayoutEffect(() => {
      const subscription = watch((values, { name }) => {
        const slide: Slide = {
          title: values.title || "",
          text: values.text || "",
        };
        dispatch(setStorySlide(index, slide));
        trigger(name);
      });

      return () => subscription.unsubscribe();
    }, [index, dispatch, watch, trigger, slides.length]);

    return (
      <div className="flex items-start gap-12">
        <div>
          {slides.map(({ title }, i) => (
            <SlideItem
              key={i}
              title={title}
              hasError={errorIndexes.includes(i)}
              isSelected={i === index}
              onBinClick={() => handleDeleteSlide(i)}
              onClick={() => handleChangeSlide(i)}
            />
          ))}
          <Button onClick={() => handleAddSlide()}>Add slide</Button>
        </div>
        <Form onChange={() => null}>
          <Field
            label="Title"
            inputProps={register("title")}
            error={errors.title}
          />
          <Field
            label="Text"
            inputProps={register("text")}
            type="textarea"
            error={errors.text}
          />
        </Form>
      </div>
    );
  }
);
export default SlidesStepView;
