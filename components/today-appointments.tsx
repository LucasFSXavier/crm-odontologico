"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Filter } from "lucide-react"
import { PatientModal } from "@/components/patient-modal"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const appointments = [
  {
    time: "09:00",
    patient: "Maria Santos",
    procedure: "Limpeza",
    status: "confirmed",
    avatar: "MS",
    dentist: "Dr. Lucas Xavier",
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
    time: "10:30",
    patient: "João Silva",
    procedure: "Canal",
    status: "in-progress",
    avatar: "JS",
    dentist: "Dra. Ana Paula",
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
    time: "14:00",
    patient: "Ana Costa",
    procedure: "Extração",
    status: "confirmed",
    avatar: "AC",
    dentist: "Dr. Lucas Xavier",
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
    time: "15:30",
    patient: "Pedro Lima",
    procedure: "Clareamento",
    status: "pending",
    avatar: "PL",
    dentist: "Dra. Ana Paula",
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

const statusColors = {
  confirmed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
}

const statusLabels = {
  confirmed: "Confirmado",
  "in-progress": "Em Andamento",
  pending: "Pendente",
}

export function TodayAppointments() {
  const [selectedPatient, setSelectedPatient] = useState<(typeof appointments)[0]["patientData"] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [dentistFilter, setDentistFilter] = useState("all")
  const [procedureFilter, setProcedureFilter] = useState("all")

  const handleAvatarClick = (patientData: (typeof appointments)[0]["patientData"]) => {
    setSelectedPatient(patientData)
    setIsModalOpen(true)
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (statusFilter !== "all" && apt.status !== statusFilter) return false
    if (dentistFilter !== "all" && apt.dentist !== dentistFilter) return false
    if (procedureFilter !== "all" && apt.procedure !== procedureFilter) return false
    return true
  })

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Consultas de Hoje</CardTitle>
              <CardDescription>{filteredAppointments.length} consultas agendadas</CardDescription>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="confirmed">Confirmado</SelectItem>
                        <SelectItem value="in-progress">Em Andamento</SelectItem>
                        <SelectItem value="pending">Pendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dentista</Label>
                    <Select value={dentistFilter} onValueChange={setDentistFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Dr. Lucas Xavier">Dr. Lucas Xavier</SelectItem>
                        <SelectItem value="Dra. Ana Paula">Dra. Ana Paula</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Procedimento</Label>
                    <Select value={procedureFilter} onValueChange={setProcedureFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="Limpeza">Limpeza</SelectItem>
                        <SelectItem value="Canal">Canal</SelectItem>
                        <SelectItem value="Extração">Extração</SelectItem>
                        <SelectItem value="Clareamento">Clareamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-16">
                  <Clock className="h-4 w-4" />
                  {appointment.time}
                </div>
                <Avatar
                  className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => handleAvatarClick(appointment.patientData)}
                >
                  <AvatarImage src={`/.jpg?height=36&width=36&query=${appointment.patient}`} />
                  <AvatarFallback>{appointment.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{appointment.patient}</p>
                  <p className="text-xs text-muted-foreground">{appointment.procedure}</p>
                </div>
                <Badge variant="secondary" className={statusColors[appointment.status as keyof typeof statusColors]}>
                  {statusLabels[appointment.status as keyof typeof statusLabels]}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <PatientModal patient={selectedPatient} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
