"use client"

import { useState } from "react"
import { Bell, Search, Plus, ChevronLeft, ChevronRight, CalendarIcon, Clock, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserMenu } from "@/components/user-menu"

const appointments = [
  {
    id: 1,
    time: "09:00",
    duration: 60,
    patient: "Maria Santos",
    dentist: "Dr. Ana Silva",
    procedure: "Limpeza",
    status: "confirmed",
    color: "bg-blue-500",
  },
  {
    id: 2,
    time: "10:30",
    duration: 90,
    patient: "João Silva",
    dentist: "Dr. Ana Silva",
    procedure: "Canal",
    status: "in-progress",
    color: "bg-purple-500",
  },
  {
    id: 3,
    time: "14:00",
    duration: 45,
    patient: "Ana Costa",
    dentist: "Dr. Carlos Mendes",
    procedure: "Extração",
    status: "confirmed",
    color: "bg-green-500",
  },
  {
    id: 4,
    time: "15:30",
    duration: 60,
    patient: "Pedro Lima",
    dentist: "Dr. Ana Silva",
    procedure: "Clareamento",
    status: "pending",
    color: "bg-amber-500",
  },
  {
    id: 5,
    time: "16:45",
    duration: 30,
    patient: "Beatriz Rocha",
    dentist: "Dr. Carlos Mendes",
    procedure: "Consulta",
    status: "confirmed",
    color: "bg-teal-500",
  },
]

const waitList = [
  { id: 1, patient: "Ricardo Alves", procedure: "Limpeza", preferredTime: "Manhã", priority: "normal" },
  { id: 2, patient: "Fernanda Cruz", procedure: "Urgência - Dor", preferredTime: "Qualquer", priority: "urgent" },
  { id: 3, patient: "Lucas Oliveira", procedure: "Canal", preferredTime: "Tarde", priority: "normal" },
]

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function AppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"day" | "week">("day")

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
                <Input placeholder="Buscar paciente..." className="pl-9" />
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
              <h1 className="text-3xl font-semibold text-balance">Agenda</h1>
              <p className="text-muted-foreground">Gerencie consultas e horários</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nova Consulta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agendar Nova Consulta</DialogTitle>
                  <DialogDescription>Preencha os dados da consulta</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Paciente</Label>
                    <Select>
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Maria Santos</SelectItem>
                        <SelectItem value="2">João Silva</SelectItem>
                        <SelectItem value="3">Ana Costa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dentist">Dentista</Label>
                    <Select>
                      <SelectTrigger id="dentist">
                        <SelectValue placeholder="Selecione o dentista" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Dr. Ana Silva</SelectItem>
                        <SelectItem value="2">Dr. Carlos Mendes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="procedure">Procedimento</Label>
                    <Select>
                      <SelectTrigger id="procedure">
                        <SelectValue placeholder="Selecione o procedimento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="limpeza">Limpeza</SelectItem>
                        <SelectItem value="canal">Canal</SelectItem>
                        <SelectItem value="extracao">Extração</SelectItem>
                        <SelectItem value="clareamento">Clareamento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Horário</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duração (minutos)</Label>
                    <Select>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">60 minutos</SelectItem>
                        <SelectItem value="90">90 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Agendar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Calendar Controls */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="icon" onClick={() => setCurrentDate(new Date())}>
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <CardTitle className="text-lg">
                        {currentDate.toLocaleDateString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")}>
                      <TabsList>
                        <TabsTrigger value="day">Dia</TabsTrigger>
                        <TabsTrigger value="week">Semana</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
              </Card>

              {/* Calendar View */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    {timeSlots.map((slot) => {
                      const appointment = appointments.find((apt) => apt.time === slot)
                      return (
                        <div key={slot} className="flex gap-4">
                          <div className="text-sm text-muted-foreground w-16 pt-2">{slot}</div>
                          <div className="flex-1 min-h-[60px] border-t pt-2">
                            {appointment && (
                              <div className={`${appointment.color} text-white p-3 rounded-lg`}>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium">{appointment.patient}</p>
                                    <p className="text-xs opacity-90">{appointment.procedure}</p>
                                    <p className="text-xs opacity-75 mt-1">{appointment.dentist}</p>
                                  </div>
                                  <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                                  >
                                    {appointment.duration}min
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Hoje</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Total de consultas</span>
                    </div>
                    <span className="font-bold text-lg">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Confirmadas</span>
                    </div>
                    <span className="font-bold text-lg text-emerald-600">10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Pendentes</span>
                    </div>
                    <span className="font-bold text-lg text-amber-600">2</span>
                  </div>
                </CardContent>
              </Card>

              {/* Wait List */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base">Lista de Espera</CardTitle>
                  <Badge variant="secondary">{waitList.length}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {waitList.map((item) => (
                    <div key={item.id} className="p-3 bg-muted/50 rounded-lg space-y-1">
                      <div className="flex items-start justify-between">
                        <p className="font-medium text-sm">{item.patient}</p>
                        {item.priority === "urgent" && (
                          <Badge variant="secondary" className="bg-red-500/10 text-red-700 dark:text-red-400">
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{item.procedure}</p>
                      <p className="text-xs text-muted-foreground">Preferência: {item.preferredTime}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Reminders */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Lembretes Automáticos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS</span>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      Ativo
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">WhatsApp</span>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      Ativo
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email</span>
                    <Badge variant="secondary" className="bg-gray-500/10 text-gray-700 dark:text-gray-400">
                      Inativo
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                    Configurar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
