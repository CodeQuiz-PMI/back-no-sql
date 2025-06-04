import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../controllers/asyncHandler";

describe("asyncHandler", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {};
    next = jest.fn();
  });

  it("should call the wrapped function with req and res", async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(mockFn).toHaveBeenCalledWith(req, res);
  });

  it("should call next with error if the wrapped function throws", async () => {
    const error = new Error("Test error");
    const mockFn = jest.fn().mockRejectedValue(error);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("should not call next if the wrapped function resolves", async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });
});
