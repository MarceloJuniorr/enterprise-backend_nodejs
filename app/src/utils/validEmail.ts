const regexTest = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

function validateEmail (email: string): boolean {
  if (email.length > 254) { return false }

  const valid = regexTest.test(email)
  if (!valid) { return false }

  // Further checking of some things regex can't handle
  const parts = email.split('@')
  if (parts[0].length > 64) { return false }

  const domainParts = parts[1].split('.')
  if (domainParts.some(function (part) { return part.length > 63 })) { return false }

  return true
}

export default validateEmail
