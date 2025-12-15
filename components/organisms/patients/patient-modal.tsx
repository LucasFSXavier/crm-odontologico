"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, AlertCircle, FileText } from "lucide-react"

interface PatientModalProps {
  patient: {
    id: number
    name: string
    email: string
    phone: string
    avatar: string
    lastVisit?: string
    status?: string
    address?: string
    birthDate?: string
    cpf?: string
    allergies?: string[]
    conditions?: string[]
    nextAppointment?: string
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PatientModal({ patient, open, onOpenChange }: PatientModalProps) {
  if (!patient) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações do Paciente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Cabeçalho com foto e nome */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`/.jpg?height=80&width=80&query=${patient.name}`} />
              <AvatarFallback className="text-xl">{patient.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">ID: #{patient.id.toString().padStart(5, "0")}</p>
              {patient.status && (
                <Badge
                  variant="secondary"
                  className={
                    patient.status === "active"
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mt-2"
                      : "bg-gray-500/10 text-gray-700 dark:text-gray-400 mt-2"
                  }
                >
                  {patient.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Informações de Contato */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Informações de Contato
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{patient.phone}</span>
              </div>
              {patient.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.address}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Dados Pessoais */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Dados Pessoais
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {patient.birthDate && (
                <div>
                  <p className="text-muted-foreground">Data de Nascimento</p>
                  <p className="font-medium">{patient.birthDate}</p>
                </div>
              )}
              {patient.cpf && (
                <div>
                  <p className="text-muted-foreground">CPF</p>
                  <p className="font-medium">{patient.cpf}</p>
                </div>
              )}
              {patient.lastVisit && (
                <div>
                  <p className="text-muted-foreground">Última Visita</p>
                  <p className="font-medium">{new Date(patient.lastVisit).toLocaleDateString("pt-BR")}</p>
                </div>
              )}
              {patient.nextAppointment && (
                <div>
                  <p className="text-muted-foreground">Próxima Consulta</p>
                  <p className="font-medium">{patient.nextAppointment}</p>
                </div>
              )}
            </div>
          </div>

          {/* Alergias e Condições */}
          {(patient.allergies || patient.conditions) && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Informações Médicas
                </h3>
                <div className="space-y-3">
                  {patient.allergies && patient.allergies.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Alergias</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-red-500/10 text-red-700 dark:text-red-400"
                          >
                            {allergy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {patient.conditions && patient.conditions.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Condições Médicas</p>
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map((condition, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          >
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
