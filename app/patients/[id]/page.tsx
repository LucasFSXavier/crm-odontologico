"use client"

import { Bell, Search, Phone, Mail, Calendar, FileText, Pill, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/organisms/navigation/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Odontogram } from "@/components/organisms/patients/odontogram"
import { TreatmentTimeline } from "@/components/organisms/patients/treatment-timeline"

export default function PatientProfilePage() {
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

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/dentist-visit.png" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Dr. Ana Silva</p>
                  <p className="text-xs text-muted-foreground">Dentista</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Patient Header */}
          <div className="mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/.jpg?height=80&width=80&query=Maria Santos" />
                      <AvatarFallback className="text-2xl">MS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-semibold">Maria Santos</h2>
                      <p className="text-muted-foreground">Paciente desde 2020</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>maria.santos@email.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>(11) 98765-4321</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>35 anos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Editar</Button>
                    <Button>Nova Consulta</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-sm">Alergia</p>
                    <p className="text-xs text-muted-foreground">Penicilina</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/50 bg-blue-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Medicação Contínua</p>
                    <p className="text-xs text-muted-foreground">Losartana 50mg</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/50 bg-red-500/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-sm">Condição</p>
                    <p className="text-xs text-muted-foreground">Hipertensão</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="odontogram" className="space-y-6">
            <TabsList>
              <TabsTrigger value="odontogram">Odontograma</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="anamnesis">Anamnese</TabsTrigger>
            </TabsList>

            <TabsContent value="odontogram" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Odontograma</CardTitle>
                  <CardDescription>Diagrama interativo dos dentes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Odontogram />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Tratamentos</CardTitle>
                  <CardDescription>Linha do tempo de procedimentos realizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <TreatmentTimeline />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                  <CardDescription>Radiografias, fotos e exames</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum documento anexado</p>
                    <Button variant="outline" className="mt-4 bg-transparent">
                      Upload de Documento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anamnesis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Anamnese</CardTitle>
                  <CardDescription>Informações médicas do paciente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Histórico Médico</h4>
                    <p className="text-sm text-muted-foreground">
                      Paciente relata hipertensão controlada com medicação. Sem histórico de cirurgias prévias.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Alergias Conhecidas</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Penicilina</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Medicações em Uso</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Losartana 50mg</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
