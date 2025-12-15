"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, Plus, Filter, Download, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/organisms/navigation/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PatientModal } from "@/components/organisms/patients/patient-modal"
import { NewPatientModal } from "@/components/organisms/patients/new-patient-modal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserMenu } from "@/components/molecules/navigation/user-menu"

const patients = [
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 98765-4321",
    lastVisit: "2024-01-10",
    status: "active",
    avatar: "MS",
    address: "Rua das Flores, 123 - São Paulo, SP",
    birthDate: "15/03/1985",
    cpf: "123.456.789-00",
    allergies: ["Penicilina", "Látex"],
    conditions: ["Hipertensão"],
    nextAppointment: "25/01/2024 às 14:00",
  },
  {
    id: 2,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 97654-3210",
    lastVisit: "2024-01-08",
    status: "active",
    avatar: "JS",
    address: "Av. Paulista, 456 - São Paulo, SP",
    birthDate: "22/07/1990",
    cpf: "234.567.890-11",
    allergies: [],
    conditions: ["Diabetes"],
    nextAppointment: "28/01/2024 às 10:00",
  },
  {
    id: 3,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 96543-2109",
    lastVisit: "2023-12-20",
    status: "inactive",
    avatar: "AC",
    address: "Rua Augusta, 789 - São Paulo, SP",
    birthDate: "10/11/1978",
    cpf: "345.678.901-22",
    allergies: ["Anestesia local"],
    conditions: [],
  },
  {
    id: 4,
    name: "Pedro Lima",
    email: "pedro.lima@email.com",
    phone: "(11) 95432-1098",
    lastVisit: "2024-01-05",
    status: "active",
    avatar: "PL",
    address: "Rua Oscar Freire, 321 - São Paulo, SP",
    birthDate: "05/05/1995",
    cpf: "456.789.012-33",
    allergies: [],
    conditions: [],
    nextAppointment: "30/01/2024 às 16:00",
  },
  {
    id: 5,
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    phone: "(11) 94321-0987",
    lastVisit: "2024-01-12",
    status: "active",
    avatar: "CM",
    address: "Av. Brigadeiro, 654 - São Paulo, SP",
    birthDate: "18/09/1988",
    cpf: "567.890.123-44",
    allergies: ["Ibuprofeno"],
    conditions: ["Asma"],
    nextAppointment: "02/02/2024 às 09:00",
  },
]

export default function PatientsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<(typeof patients)[0] | null>(null)
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<(typeof patients)[0] | null>(null)
  const [editingPatient, setEditingPatient] = useState<(typeof patients)[0] | null>(null)
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewProfile = (patient: (typeof patients)[0]) => {
    setSelectedPatient(patient)
    setIsPatientModalOpen(true)
  }

  const handleEdit = (patient: (typeof patients)[0]) => {
    setEditingPatient(patient)
    setIsEditDialogOpen(true)
  }

  const handleHistory = (patient: (typeof patients)[0]) => {
    router.push(`/patients/${patient.id}`)
  }

  const handleDeleteClick = (patient: (typeof patients)[0]) => {
    setPatientToDelete(patient)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    console.log("[v0] Excluindo paciente:", patientToDelete?.name)
    setIsDeleteDialogOpen(false)
    setPatientToDelete(null)
  }

  const handleExport = () => {
    console.log("[v0] Exportando lista de pacientes")
    alert("Funcionalidade de exportação será implementada")
  }

  const handleAddPatient = () => {
    setIsNewPatientModalOpen(true)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar paciente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              <UserMenu />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-balance">Pacientes</h1>
              <p className="text-muted-foreground">Gerencie seus pacientes</p>
            </div>

            <Button className="gap-2" onClick={handleAddPatient}>
              <Plus className="h-4 w-4" />
              Novo Paciente
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filtros
                  </Button>
                </div>

                <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleExport}>
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Última Visita</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`/.jpg?height=40&width=40&query=${patient.name}`} />
                            <AvatarFallback>{patient.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">{patient.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{new Date(patient.lastVisit).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            patient.status === "active"
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                              : "bg-gray-500/10 text-gray-700 dark:text-gray-400"
                          }
                        >
                          {patient.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(patient)}>Ver Perfil</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(patient)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleHistory(patient)}>Histórico</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(patient)}>
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal de visualização do paciente */}
      <PatientModal patient={selectedPatient} open={isPatientModalOpen} onOpenChange={setIsPatientModalOpen} />

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o paciente <strong>{patientToDelete?.name}</strong>? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Paciente</DialogTitle>
            <DialogDescription>Atualize as informações do paciente</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" defaultValue={editingPatient?.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={editingPatient?.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" defaultValue={editingPatient?.phone} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de novo paciente */}
      <NewPatientModal open={isNewPatientModalOpen} onOpenChange={setIsNewPatientModalOpen} />
    </div>
  )
}
