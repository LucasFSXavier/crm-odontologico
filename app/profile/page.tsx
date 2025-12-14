"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMenu } from "@/components/user-menu"
import { ArrowLeft, Save } from "lucide-react"
import { getCurrentUser, updateUser } from "@/lib/auth"
import type { User } from "@/lib/auth"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    crm: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUser(currentUser)
    setFormData({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone || "",
      specialty: currentUser.specialty || "",
      crm: currentUser.crm || "",
    })
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    setTimeout(() => {
      if (user) {
        const updatedUser: User = {
          ...user,
          ...formData,
        }
        updateUser(updatedUser)
        setUser(updatedUser)
        setMessage("Perfil atualizado com sucesso!")
        setIsSaving(false)

        // Atualiza a página para refletir mudanças no UserMenu
        window.location.reload()
      }
    }, 1000)
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>

            <UserMenu />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-semibold text-balance">Meu Perfil</h1>
              <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
            </div>

            <div className="grid gap-6 md:grid-cols-[300px_1fr]">
              {/* Avatar Section */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-dental-primary text-white text-3xl">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Alterar Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados cadastrais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(11) 98765-4321"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crm">CRO</Label>
                        <Input
                          id="crm"
                          value={formData.crm}
                          onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                          placeholder="CRO-SP 12345"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="specialty">Especialidade</Label>
                        <Input
                          id="specialty"
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          placeholder="Ex: Ortodontia, Endodontia"
                        />
                      </div>
                    </div>

                    {message && (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <p className="text-sm text-emerald-600">{message}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button type="submit" disabled={isSaving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {isSaving ? "Salvando..." : "Salvar Alterações"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => router.back()}>
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
