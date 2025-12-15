"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { PatientModal } from "@/components/organisms/patients/patient-modal"

const patients = [
  {
    name: "Carlos Mendes",
    lastVisit: "Há 2 dias",
    avatar: "CM",
    email: "carlos@email.com",
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
    lastVisit: "Há 5 dias",
    avatar: "BR",
    email: "beatriz@email.com",
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
    lastVisit: "Há 1 semana",
    avatar: "RA",
    email: "ricardo@email.com",
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
    lastVisit: "Há 1 semana",
    avatar: "FC",
    email: "fernanda@email.com",
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
]

export function RecentPatients() {
  const router = useRouter()
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0]["patientData"] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAvatarClick = (patientData: (typeof patients)[0]["patientData"]) => {
    setSelectedPatient(patientData)
    setIsModalOpen(true)
  }

  const handleViewAll = () => {
    router.push("/patients/recent")
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Pacientes Recentes</CardTitle>
            <CardDescription>Últimas visitas</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={handleViewAll}>
            Ver todos <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient, index) => (
              <div key={index} className="flex items-center gap-4">
                <Avatar
                  className="cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => handleAvatarClick(patient.patientData)}
                >
                  <AvatarImage src={`/.jpg?height=40&width=40&query=${patient.name}`} />
                  <AvatarFallback>{patient.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">{patient.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">{patient.lastVisit}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PatientModal patient={selectedPatient} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
