/* eslint-disable @typescript-eslint/no-unused-vars */
import * as controllers from "../controllers";

describe("Controllers Index", () => {
  it("should export all controllers as functions", () => {
    Object.entries(controllers).forEach(([key, value]) => {
      expect(typeof value).toBe("function");
    });
  });

  it("should export all expected controller names", () => {
    const expectedControllers = [
      "getAllUserController",
      "getUserByIdController",
      "updateUserController",
      "deleteUserController",
      "createLevelController",
      "getAllLevelController",
      "getLevelByIdController",
      "updateLevelController",
      "deleteLevelController",
      "createSectionController",
      "getAllSectionController",
      "getSectionByIdController",
      "updateSectionController",
      "deleteSectionController",
      "createQuestionController",
      "getAllQuestionController",
      "getQuestionByIdController",
      "updateQuestionController",
      "deleteQuestionController",
      "register",
      "login",
      "submitAnswerController",
      "getAllAnswerLogsController",
      "getAnswerLogsByUser",
      "deleteAllAnswerLogsByUser",
    ];

    expectedControllers.forEach((name) => {
      expect(controllers).toHaveProperty(name);
    });
  });
});
