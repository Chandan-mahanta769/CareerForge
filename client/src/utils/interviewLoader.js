import { hrQuestions } from "../data/hrQuestions";
import { technicalQuestions } from "../data/technicalQuestions";
import { vivaQuestions } from "../data/vivaQuestions";
import { mockQuestions } from "../data/mockQuestions";

export const getInterviewQuestions = (type) => {
  switch (type) {
    case "hr":
      return hrQuestions;
    case "technical":
      return technicalQuestions;
    case "viva":
      return vivaQuestions;
    case "mock":
      return mockQuestions;
    default:
      return [];
  }
};