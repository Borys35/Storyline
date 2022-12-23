import { yupResolver } from "@hookform/resolvers/yup";
import produce from "immer";
import Image from "next/image";
import React, { useImperativeHandle, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Slide } from "../../interfaces";
import { slideSchema } from "../../lib/schemas";
import { GenericStepProps } from "../../pages/create-story";
import {
  addStorySlide,
  deleteStorySlide,
  updateStorySlide,
} from "../../reducers/actions";
import Button from "../button";
import Field from "../field";
import Form from "../form";
import Modal from "../modal";
import DrawingButton from "./drawing-button";
import SlideItem from "./slide-item";

interface Props extends GenericStepProps {
  count: number;
  addCount: () => void;
}

// find first slide with error
// trigger and validate form
// watch form
// highlight all slides with error

const SlidesStepView = React.forwardRef<any, Props>(
  ({ state, dispatch, shouldTrigger, count, addCount }, ref) => {
    const { slides } = state;
    const [index, setIndex] = useState(0);
    const [slideToDelete, setSlideToDelete] = useState<
      (Slide & { index: number }) | null
    >(null);
    const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
    const {
      register,
      watch,
      setValue,
      trigger,
      formState: { errors },
    } = useForm<Slide>({ resolver: yupResolver(slideSchema) });
    const unableToDeleteSlides = slides.length <= 1;

    function handleAddSlide() {
      dispatch(
        addStorySlide({ title: `Slide ${count}`, text: "", drawingUrl: null })
      );
      addCount();

      setIndex(slides.length);
    }

    function handleDeleteSlide(i: number) {
      if (unableToDeleteSlides) return;

      dispatch(deleteStorySlide(i));
      setSlideToDelete(null);
      if (index === i) setIndex(0);
      if (index === slides.length - 1) setIndex(index - 1);
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

    function setSlideDrawingUrl(url: string) {
      dispatch(updateStorySlide(index, { drawingUrl: url }));
    }

    function deleteSlideDrawingUrl() {
      dispatch(updateStorySlide(index, { drawingUrl: null }));
    }

    useImperativeHandle(ref, () => ({
      changeSlide: (index: number) => handleChangeSlide(index),
      highlightSlides: (indexes: number[]) => setErrorIndexes(indexes),
    }));

    // FIRES WHEN WE CHANGE SLIDE
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
        const slide = {
          title: values.title || "",
          text: values.text || "",
        };
        dispatch(updateStorySlide(index, slide));
        trigger(name);
      });

      return () => subscription.unsubscribe();
    }, [index, dispatch, watch, trigger, slides.length]);

    return (
      <div className="flex flex-col md:flex-row md:items-start gap-12">
        <div>
          <div className="element flex flex-col gap-4 md:w-56 h-96 overflow-auto p-4 mb-4 bg-sky-200">
            {slides.map((slide, i) => (
              <SlideItem
                key={i}
                title={slide.title}
                hasError={errorIndexes.includes(i)}
                isSelected={i === index}
                onBinClick={() => {
                  if (unableToDeleteSlides) return;
                  setSlideToDelete({ index: i, ...slide });
                }}
                onClick={() => handleChangeSlide(i)}
              />
            ))}
          </div>
          <Button onClick={() => handleAddSlide()}>Add slide</Button>
        </div>
        <Form onSubmit={(e) => e.preventDefault()} className="flex-1">
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
          {!slides[index].drawingUrl ? (
            <DrawingButton setDrawingURL={setSlideDrawingUrl}>
              Make a drawing
            </DrawingButton>
          ) : (
            <div>
              <Image
                src={slides[index].drawingUrl || ""}
                width={300}
                height={200}
                alt="Drawing"
              />
              <Button onClick={() => deleteSlideDrawingUrl()}>
                Delete drawing
              </Button>
            </div>
          )}
        </Form>
        <Modal isOpen={!!slideToDelete} setOpen={() => setSlideToDelete(null)}>
          {slideToDelete ? (
            <>
              <p className="mb-2">
                Are you sure you want to delete{" "}
                <strong>{slideToDelete.title}</strong>?
              </p>
              <Button
                onClick={() => handleDeleteSlide(slideToDelete.index)}
                className="mr-4"
                primary
              >
                Delete
              </Button>
            </>
          ) : (
            <p className="mb-2">
              No slide to delete. Let me know if you see this response
            </p>
          )}
          <Button onClick={() => setSlideToDelete(null)}>Cancel</Button>
        </Modal>
      </div>
    );
  }
);
export default SlidesStepView;
