/* eslint-disable @typescript-eslint/no-unused-vars */
import * as controllers from "../controllers";

describe("Índice de Controllers", () => {
  it("deve exportar todos os controllers como funções", () => {
    Object.entries(controllers).forEach(([key, value]) => {
      expect(typeof value).toBe("function");
    });
  });

  it("Deve exportar todos os nomes esperados de controllers", () => {
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
