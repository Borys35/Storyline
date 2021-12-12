import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const registerSchema = yup.object({
  username: yup.string().min(3).max(24).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
});

export const storyInfoSchema = yup.object({
  name: yup.string().min(3).max(64).required(),
  description: yup.string().max(500).optional(),
  isPrivate: yup.boolean().required(),
});

export const slideSchema = yup.object({
  title: yup.string().required(),
  text: yup.string().required(),
});

export const slidesSchema = yup.object({
  slides: yup.array().of(slideSchema).min(1).required(),
});

export const commentSchema = yup.object({
  text: yup.string().max(100).required(),
});
