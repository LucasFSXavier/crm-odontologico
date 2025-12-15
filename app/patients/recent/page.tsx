"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft } from "lucide-react"
import { PatientModal } from "@/components/organisms/patients/patient-modal"
import { UserMenu } from "@/components/molecules/navigation/user-menu"
import Link from "next/link"

const allPatients = [
  {
    name: "Carlos Mendes",
    lastVisit: "2024-01-12",
    avatar: "CM",
    email: "carlos.mendes@email.com",
    phone: "(11) 94321-0987",
    status: "active",
    patientData: {
      id: 5,
      name: "Carlos Mendes",
      email: "carlos.mendes@email.com",
      phone: "(11) 94321-0987",
      avatar: "CM",
      address: "Av. Brigadeiro, 654 - São Paulo, SP",
      birthDate: "18/09/1988",
      cpf: "567.890.123-44",
      allergies: ["Ibuprofeno"],
      conditions: ["Asma"],
      lastVisit: "2024-01-12",
      nextAppointment: "02/02/2024 às 09:00",
      status: "active",
    },
  },
  {
    name: "Beatriz Rocha",
    lastVisit: "2024-01-07",
    avatar: "BR",
    email: "beatriz.rocha@email.com",
    phone: "(11) 93210-9876",
    status: "active",
    patientData: {
      id: 6,
      name: "Beatriz Rocha",
      email: "beatriz.rocha@email.com",
      phone: "(11) 93210-9876",
      avatar: "BR",
      address: "Rua Consolação, 987 - São Paulo, SP",
      birthDate: "25/02/1992",
      cpf: "678.901.234-55",
      allergies: [],
      conditions: ["Bruxismo"],
      lastVisit: "2024-01-07",
      status: "active",
    },
  },
  {
    name: "Ricardo Alves",
    lastVisit: "2024-01-03",
    avatar: "RA",
    email: "ricardo.alves@email.com",
    phone: "(11) 92109-8765",
    status: "active",
    patientData: {
      id: 7,
      name: "Ricardo Alves",
      email: "ricardo.alves@email.com",
      phone: "(11) 92109-8765",
      avatar: "RA",
      address: "Av. Ibirapuera, 234 - São Paulo, SP",
      birthDate: "12/06/1980",
      cpf: "789.012.345-66",
      allergies: ["Nimesulida"],
      conditions: [],
      lastVisit: "2024-01-03",
      status: "active",
    },
  },
  {
    name: "Fernanda Cruz",
    lastVisit: "2024-01-04",
    avatar: "FC",
    email: "fernanda.cruz@email.com",
    phone: "(11) 91098-7654",
    status: "active",
    patientData: {
      id: 8,
      name: "Fernanda Cruz",
      email: "fernanda.cruz@email.com",
      phone: "(11) 91098-7654",
      avatar: "FC",
      address: "Rua Pamplona, 456 - São Paulo, SP",
      birthDate: "30/11/1987",
      cpf: "890.123.456-77",
      allergies: [],
      conditions: ["Gengivite"],
      lastVisit: "2024-01-04",
      status: "active",
    },
  },
  {
    name: "Maria Santos",
    lastVisit: "2024-01-10",
    avatar: "MS",
    email: "maria.santos@email.com",
    phone: "(11) 98765-4321",
    status: "active",
    patientData: {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 98765-4321",
      avatar: "MS",
      address: "Rua das Flores, 123 - São Paulo, SP",
      birthDate: "15/03/1985",
      cpf: "123.456.789-00",
      allergies: ["Penicilina", "Látex"],
      conditions: ["Hipertensão"],
      nextAppointment: "25/01/2024 às 14:00",
      status: "active",
    },
  },
  {
    name: "João Silva",
    lastVisit: "2024-01-08",
    avatar: "JS",
    email: "joao.silva@email.com",
    phone: "(11) 97654-3210",
    status: "active",
    patientData: {
      id: 2,
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 97654-3210",
      avatar: "JS",
      address: "Av. Paulista, 456 - São Paulo, SP",
      birthDate: "22/07/1990",
      cpf: "234.567.890-11",
      allergies: [],
      conditions: ["Diabetes"],
      nextAppointment: "28/01/2024 às 10:00",
      status: "active",
    },
  },
  {
    name: "Ana Costa",
    lastVisit: "2023-12-19",
    avatar: "AC",
    email: "ana.costa@email.com",
    phone: "(11) 96543-2109",
    status: "inactive",
    patientData: {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(11) 96543-2109",
      avatar: "AC",
      address: "Rua Augusta, 789 - São Paulo, SP",
      birthDate: "10/11/1978",
      cpf: "345.678.901-22",
      allergies: ["Anestesia local"],
      conditions: [],
      status: "inactive",
    },
  },
  {
    name: "Pedro Lima",
    lastVisit: "2024-01-05",
    avatar: "PL",
    email: "pedro.lima@email.com",
    phone: "(11) 95432-1098",
    status: "active",
    patientData: {
      id: 4,
      name: "Pedro Lima",
      email: "pedro.lima@email.com",
      phone: "(11) 95432-1098",
      avatar: "PL",
      address: "Rua Oscar Freire, 321 - São Paulo, SP",
      birthDate: "05/05/1995",
      cpf: "456.789.012-33",
      allergies: [],
      conditions: [],
      nextAppointment: "30/01/2024 às 16:00",
      status: "active",
    },
  },
]

export default function RecentPatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<(typeof allPatients)[0]["patientData"] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePatientClick = (patientData: (typeof allPatients)[0]["patientData"]) => {
    setSelectedPatient(patientData)
    setIsModalOpen(true)
  }

  const filteredPatients = allPatients
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm),
    )
    .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays < 7) return `Há ${diffDays} dias`
    if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? "s" : ""}`
    return `Há ${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? "es" : ""}`
  }

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex h-16 items-center justify-between px-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Pacientes Recentes</h1>
                <p className="text-sm text-muted-foreground">Visualize todos os pacientes por ordem de visita</p>
              </div>
            </div>
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 p-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Todos os Pacientes Recentes</CardTitle>
                  <CardDescription>{filteredPatients.length} pacientes encontrados</CardDescription>
                </div>
                <div className="relative w-80">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou telefone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPatients.map((patient, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => handlePatientClick(patient.patientData)}
                  >
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={`/.jpg?height=44&width=44&query=${patient.name}`} />
                      <AvatarFallback>{patient.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{patient.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-muted-foreground">{patient.email}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">{patient.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={patient.status === "active" ? "default" : "secondary"}
                        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                      >
                        {patient.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                      <p className="text-sm text-muted-foreground min-w-28 text-right">
                        {formatDate(patient.lastVisit)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <PatientModal patient={selectedPatient} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
