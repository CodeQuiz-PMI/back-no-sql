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

  it("Deve chamar a função encapsulada com req e res", async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(mockFn).toHaveBeenCalledWith(req, res);
  });

  it("Deve chamar next com erro se a função encapsulada lançar", async () => {
    const error = new Error("Erro de teste");
    const mockFn = jest.fn().mockRejectedValue(error);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
  });

  it("Não deve chamar next se a função encapsulada resolver", async () => {
    const mockFn = jest.fn().mockResolvedValue(undefined);
    const handler = asyncHandler(mockFn);

    await handler(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });
});
