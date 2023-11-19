export interface IPropsChildren {
  children: any;
}

export enum IconStatus {
  NO_PROGRESS,
  STAR_1,
  STAR_2,
  STAR_3,
}

export type lessonType =
  | "new_words"
  | "listening"
  | "grammer"
  | "pronunciation"
  | "test";

export interface lessonItem {
  id: number;
  title: string;
  moduleId: number;
  type: lessonType;
  status?: IconStatus;
}

export interface Word {
  id: number;
  wordName: string;
  translation: string;
  example: string;
  moduleId: number;
  imageURL: string;
}
