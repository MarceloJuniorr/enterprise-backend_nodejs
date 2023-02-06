import { cnpj, cpf } from 'cpf-cnpj-validator'
import { type NextFunction, type Request, type Response } from 'express'

export async function ensureDocumentValidator (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  function validDocument (doc: string): boolean {
    if (doc.length === 11) {
      return cpf.isValid(doc)
    }
    if (doc.length === 14) {
      return cnpj.isValid(doc)
    }
    return false
  }

  const document = req.headers.authorization

  if (document === undefined) {
    return res.status(401).json({
      message: 'Please enter valid document'
    })
  }

  try {
    validDocument(document)
    next()
    return
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid document!'
    })
  }
}
