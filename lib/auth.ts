export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  phone?: string
  specialty?: string
  crm?: string
}

// Usuários de exemplo armazenados no localStorage
export function initializeUsers() {
  if (typeof window === "undefined") return

  const existingUsers = localStorage.getItem("dental_users")
  if (!existingUsers) {
    const defaultUsers: User[] = [
      {
        id: "1",
        name: "Dr. Ana Silva",
        email: "admin@clinica.com",
        role: "Administrador",
        phone: "(11) 98765-4321",
        specialty: "Ortodontia",
        crm: "CRO-SP 12345",
        avatar: "/dentist-visit.png",
      },
      {
        id: "2",
        name: "Dra. Maria Santos",
        email: "maria@clinica.com",
        role: "Dentista",
        phone: "(11) 98765-1234",
        specialty: "Endodontia",
        crm: "CRO-SP 54321",
      },
    ]
    localStorage.setItem("dental_users", JSON.stringify(defaultUsers))
  }
}

export function login(email: string, password: string): User | null {
  if (typeof window === "undefined") return null

  initializeUsers()
  const users = JSON.parse(localStorage.getItem("dental_users") || "[]")

  // Simulação simples: aceita qualquer senha "admin123" para os usuários cadastrados
  const user = users.find((u: User) => u.email === email)

  if (user && password === "admin123") {
    localStorage.setItem("dental_current_user", JSON.stringify(user))
    return user
  }

  return null
}

export function logout() {
  if (typeof window === "undefined") return
  localStorage.removeItem("dental_current_user")
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("dental_current_user")
  return userStr ? JSON.parse(userStr) : null
}

export function updateUser(updatedUser: User): void {
  if (typeof window === "undefined") return

  // Atualiza o usuário atual
  localStorage.setItem("dental_current_user", JSON.stringify(updatedUser))

  // Atualiza na lista de usuários
  const users = JSON.parse(localStorage.getItem("dental_users") || "[]")
  const updatedUsers = users.map((u: User) => (u.id === updatedUser.id ? updatedUser : u))
  localStorage.setItem("dental_users", JSON.stringify(updatedUsers))
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
