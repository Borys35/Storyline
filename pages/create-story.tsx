import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Button from "../components/button";
import MainStepView from "../components/create-story/main-step-view";
import SlidesStepView from "../components/create-story/slides-step-view";
import Layout from "../components/layout";
import { StoryForm } from "../interfaces";
import withAuth from "../lib/hoc/withAuth";
import { slideSchema, storyInfoSchema } from "../lib/schemas";
import { Action } from "../reducers/actions";
import { useStoryReducer } from "../reducers/story-reducer";

export interface GenericStepProps {
  state: StoryForm;
  dispatch: React.Dispatch<Action>;
  shouldTrigger: boolean;
}

const CreateStory: NextPage = () => {
  const [step, setStep] = useState(0);
  const [firstTimeSubmitted, setFirstTimeSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [slideCount, setSlideCount] = useState(2);
  const [state, dispatch] = useStoryReducer();
  const router = useRouter();
  const slidesViewRef = useRef<any>(null);
  const stepCount = 2;

  function handleNext() {
    if (step >= stepCount - 1) return;
    setStep(step + 1);
  }

  function handleBack() {
    if (step <= 0) return;
    setStep(step - 1);
  }

  async function handleSubmit() {
    setFirstTimeSubmitted(true);
    setSubmitting(true);

    const storyInfoValid = await storyInfoSchema.isValid({
      name: state.name,
      description: state.description,
      isPrivate: state.isPrivate,
    });
    if (!storyInfoValid) {
      setStep(0);
      setSubmitting(false);
      return;
    }

    const allSlides = [];
    for (let i = 0; i < state.slides.length; i++) {
      const { title, text } = state.slides[i];
      const valid = await slideSchema.isValid({ title, text });
      allSlides[i] = { index: i, valid };
    }
    const invalidSlides = allSlides.filter(({ valid }) => valid === false);
    if (invalidSlides.length > 0) {
      setStep(1);
      if (slidesViewRef.current) {
        slidesViewRef.current.highlightSlides(
          invalidSlides.map(({ index }) => index)
        );
        slidesViewRef.current.changeSlide(invalidSlides[0].index);
      }
      setSubmitting(false);
      return;
    }

    const res = await axios
      .post("/api/stories", { story: state })
      .catch(console.error);
    if (res && res.status === 200) {
      router.push(`/stories/${res.data.storyId}`);
      // setSubmitting(false);
    }
  }

  return (
    <Layout name="Create story">
      <div className="flex justify-end gap-4">
        <Button onClick={() => handleSubmit()} disabled={submitting} primary>
          Publish
        </Button>
        {step < stepCount - 1 && <Button onClick={handleNext}>Next</Button>}
        {step > 0 && <Button onClick={handleBack}>Back</Button>}
      </div>
      <strong className="text-red-500"></strong>
      {step === 0 ? (
        <MainStepView
          state={state}
          dispatch={dispatch}
          shouldTrigger={firstTimeSubmitted}
        />
      ) : (
        step === 1 && (
          <SlidesStepView
            ref={slidesViewRef}
            state={state}
            dispatch={dispatch}
            shouldTrigger={firstTimeSubmitted}
            count={slideCount}
            addCount={() => setSlideCount(slideCount + 1)}
          />
        )
      )}
    </Layout>
  );
};

export default withAuth(CreateStory, true);
