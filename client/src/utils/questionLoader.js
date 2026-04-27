import { htmlQuestions } from "../data/htmlQuestions";
import { cssQuestions } from "../data/cssQuestions";
import { jsQuestions } from "../data/jsQuestions";
import { reactQuestions } from "../data/reactQuestions";
import { nodeQuestions } from "../data/nodeQuestions";
import { mongodbQuestions } from "../data/mongodbQuestions";
import { dsaQuestions } from "../data/dsaQuestions"; 

export const getQuestionsByType = (type) => {
  switch (type) {
    case "html":     return htmlQuestions;
    case "css":      return cssQuestions;
    case "js":       return jsQuestions;
    case "react":    return reactQuestions;
    case "node":     return nodeQuestions;
    case "mongodb":  return mongodbQuestions;
    case "dsa":      return dsaQuestions;
    default:         return { Beginner: [], Intermediate: [], Advanced: [] };
  }
};