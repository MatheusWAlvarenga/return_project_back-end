import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpay = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpay }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "test",
        screenshot: "data:image/png;base64,test",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpay).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "test",
        screenshot: "data:image/png;base64,test",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "test",
        comment: "",
        screenshot: "data:image/png;base64,test",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "test",
        comment: "test",
        screenshot: "1data:image/png;base64,test",
      })
    ).rejects.toThrow();
  });
});
