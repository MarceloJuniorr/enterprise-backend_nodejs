import { type NextFunction, type Request, type Response } from 'express'

export async function ensurePostUserValidator (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  const { name, password, profile } = req.body

  if (name === undefined || name === '') {
    return res.status(401).json({
      message:
        'name is invalid or undefined'
    })
  }
  if (password === undefined || password === '') {
    return res.status(401).json({
      message:
        'password is invalid or undefined'
    })
  }
  if (profile === undefined || profile === '') {
    return res.status(401).json({
      message:
        'profile is invalid or undefined'
    })
  }

  next()
}
