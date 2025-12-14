"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated, initializeUsers } from "@/lib/auth"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    initializeUsers()

    // Não redireciona se já estiver na página de login
    if (pathname === "/login") return

    // Verifica autenticação
    if (!isAuthenticated()) {
      router.push("/login")
    }
  }, [router, pathname])

  // Se não estiver autenticado e não estiver na página de login, não renderiza nada
  if (pathname !== "/login" && !isAuthenticated()) {
    return null
  }

  return <>{children}</>
}
