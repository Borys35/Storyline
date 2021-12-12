export interface StoryForm {
  name: string;
  description: string;
  isPrivate: boolean;
  slides: Slide[];
}

export interface StoryFull {
  id?: string;
  name: string;
  description: string;
  isPrivate: boolean;
  slides: Slide[];
  owner: User;
  viewCount: number;
  watchedCount: number;
  likes: Like[];
  comments: CommentFull[];
  createdAt: number;
}

export interface Slide {
  title: string;
  text: string;
}

export interface User {
  userId?: string | null;
  name?: string | null;
  picture?: string | null;
}

export interface Like extends User {}

export interface CommentForm {
  text: string;
}

export interface CommentFull {
  text: string;
  createdAt: number;
  user: User;
}
