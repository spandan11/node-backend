import { NextFunction, Request, Response } from "express";
import colors, { Color } from "colors";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColors: { [key: string]: Color } = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.red,
  };
  //   const method = req.method as keyof typeof methodColors;
  const color: Color = methodColors[req.method] || colors.white;

  console.log(
    color(
      `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
    )
  );

  next();
};

export default logger;
