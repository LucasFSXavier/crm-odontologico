"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface EditPermissionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    name: string
    role: string
  }
}

export function EditPermissionsModal({ open, onOpenChange, user }: EditPermissionsModalProps) {
  const [permissions, setPermissions] = useState({
    dashboard: "all",
    patients: "all",
    appointments: "all",
    financial: "admin",
    communication: "all",
    reports: "admin",
    settings: "admin",
  })

  const [modules, setModules] = useState({
    createPatients: true,
    editPatients: true,
    deletePatients: false,
    scheduleAppointments: true,
    cancelAppointments: true,
    viewFinancial: false,
    editFinancial: false,
    sendMessages: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Permissões atualizadas:", { permissions, modules })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Permissões</DialogTitle>
          <DialogDescription>Gerencie as permissões de acesso de {user.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Níveis de Acesso por Módulo</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Dashboard</Label>
                  <Select
                    value={permissions.dashboard}
                    onValueChange={(value) => setPermissions({ ...permissions, dashboard: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Pacientes</Label>
                  <Select
                    value={permissions.patients}
                    onValueChange={(value) => setPermissions({ ...permissions, patients: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Agenda</Label>
                  <Select
                    value={permissions.appointments}
                    onValueChange={(value) => setPermissions({ ...permissions, appointments: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Financeiro</Label>
                  <Select
                    value={permissions.financial}
                    onValueChange={(value) => setPermissions({ ...permissions, financial: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Comunicação</Label>
                  <Select
                    value={permissions.communication}
                    onValueChange={(value) => setPermissions({ ...permissions, communication: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Relatórios</Label>
                  <Select
                    value={permissions.reports}
                    onValueChange={(value) => setPermissions({ ...permissions, reports: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Configurações</Label>
                  <Select
                    value={permissions.settings}
                    onValueChange={(value) => setPermissions({ ...permissions, settings: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="admin">Apenas Admin</SelectItem>
                      <SelectItem value="dentist">Admin e Dentista</SelectItem>
                      <SelectItem value="none">Sem Acesso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-sm">Permissões Específicas</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="createPatients"
                    checked={modules.createPatients}
                    onCheckedChange={(checked) => setModules({ ...modules, createPatients: checked as boolean })}
                  />
                  <Label htmlFor="createPatients" className="text-sm font-normal cursor-pointer">
                    Criar novos pacientes
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editPatients"
                    checked={modules.editPatients}
                    onCheckedChange={(checked) => setModules({ ...modules, editPatients: checked as boolean })}
                  />
                  <Label htmlFor="editPatients" className="text-sm font-normal cursor-pointer">
                    Editar informações de pacientes
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deletePatients"
                    checked={modules.deletePatients}
                    onCheckedChange={(checked) => setModules({ ...modules, deletePatients: checked as boolean })}
                  />
                  <Label htmlFor="deletePatients" className="text-sm font-normal cursor-pointer">
                    Excluir pacientes
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scheduleAppointments"
                    checked={modules.scheduleAppointments}
                    onCheckedChange={(checked) => setModules({ ...modules, scheduleAppointments: checked as boolean })}
                  />
                  <Label htmlFor="scheduleAppointments" className="text-sm font-normal cursor-pointer">
                    Agendar consultas
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cancelAppointments"
                    checked={modules.cancelAppointments}
                    onCheckedChange={(checked) => setModules({ ...modules, cancelAppointments: checked as boolean })}
                  />
                  <Label htmlFor="cancelAppointments" className="text-sm font-normal cursor-pointer">
                    Cancelar consultas
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="viewFinancial"
                    checked={modules.viewFinancial}
                    onCheckedChange={(checked) => setModules({ ...modules, viewFinancial: checked as boolean })}
                  />
                  <Label htmlFor="viewFinancial" className="text-sm font-normal cursor-pointer">
                    Visualizar informações financeiras
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="editFinancial"
                    checked={modules.editFinancial}
                    onCheckedChange={(checked) => setModules({ ...modules, editFinancial: checked as boolean })}
                  />
                  <Label htmlFor="editFinancial" className="text-sm font-normal cursor-pointer">
                    Editar valores e pagamentos
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sendMessages"
                    checked={modules.sendMessages}
                    onCheckedChange={(checked) => setModules({ ...modules, sendMessages: checked as boolean })}
                  />
                  <Label htmlFor="sendMessages" className="text-sm font-normal cursor-pointer">
                    Enviar mensagens aos pacientes
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
