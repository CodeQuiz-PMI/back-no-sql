import { login, register } from "./auth/auth.controller";

import {
  createLevelController,
  deleteLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
} from "./level/level.controller";

import {
  createQuestionController,
  deleteQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
} from "./question/question.controller";

import {
  createSectionController,
  deleteSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
} from "./section/section.controller";

import {
  deleteUserController,
  getAllUserController,
  getUserByIdController,
  updateUserController,
} from "./user/user.controller";

import {
  deleteAllAnswerLogsByUser,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  submitAnswerController,
} from "./answerLog/answerLog.controller";

export {
  getAllUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  createLevelController,
  getAllLevelController,
  getLevelByIdController,
  updateLevelController,
  deleteLevelController,
  createSectionController,
  getAllSectionController,
  getSectionByIdController,
  updateSectionController,
  deleteSectionController,
  createQuestionController,
  getAllQuestionController,
  getQuestionByIdController,
  updateQuestionController,
  deleteQuestionController,
  register,
  login,
  submitAnswerController,
  getAllAnswerLogsController,
  getAnswerLogsByUser,
  deleteAllAnswerLogsByUser,
};
