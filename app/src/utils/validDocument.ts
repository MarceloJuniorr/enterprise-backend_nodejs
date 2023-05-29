import { cnpj, cpf } from 'cpf-cnpj-validator'

function validDocument (doc: string): boolean {
  if (doc.length === 11) {
    return cpf.isValid(doc)
  }
  if (doc.length === 14) {
    return cnpj.isValid(doc)
  }
  return false
}

export default validDocument
