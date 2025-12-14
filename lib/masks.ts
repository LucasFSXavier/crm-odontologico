export function maskCPF(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)

  // Aplica a máscara 000.000.000-00
  return limited
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export function maskPhone(value: string): string {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "")

  // Limita a 11 dígitos (DDD + 9 dígitos)
  const limited = numbers.slice(0, 11)

  // Aplica a máscara (00) 00000-0000 ou (00) 0000-0000
  if (limited.length <= 10) {
    return limited.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
  }

  return limited.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2")
}

export function validateCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, "")

  if (numbers.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numbers)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(numbers.charAt(i)) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== Number.parseInt(numbers.charAt(9))) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(numbers.charAt(i)) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== Number.parseInt(numbers.charAt(10))) return false

  return true
}

export function validatePhone(phone: string): boolean {
  const numbers = phone.replace(/\D/g, "")
  // Aceita 10 (fixo) ou 11 (celular) dígitos
  return numbers.length === 10 || numbers.length === 11
}
