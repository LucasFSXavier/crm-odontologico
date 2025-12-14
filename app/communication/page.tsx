"use client"

import { useState } from "react"
import { Bell, Search, Send, MessageSquare, Mail, Smartphone, Star, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EditTemplateModal } from "@/components/edit-template-modal"
import { UserMenu } from "@/components/user-menu"

const templates = [
  {
    id: 1,
    name: "Lembrete de Consulta",
    type: "reminder",
    channel: "whatsapp",
    content: "Olá {nome}! Lembramos que você tem consulta agendada para {data} às {hora}. Confirme sua presença.",
  },
  {
    id: 2,
    name: "Feliz Aniversário",
    type: "birthday",
    channel: "sms",
    content: "🎉 Feliz Aniversário {nome}! A equipe DentalCare deseja um dia maravilhoso!",
  },
  {
    id: 3,
    name: "Retorno de Consulta",
    type: "followup",
    channel: "email",
    content: "Olá {nome}, está na hora do seu retorno! Entre em contato para agendar sua próxima consulta.",
  },
  {
    id: 4,
    name: "Campanha de Clareamento",
    type: "campaign",
    channel: "whatsapp",
    content: "Transforme seu sorriso! Clareamento dental com 20% de desconto este mês. Agende já!",
  },
]

const messageHistory = [
  {
    patient: "Maria Santos",
    message: "Lembrete de consulta enviado",
    date: "2024-01-12 10:30",
    channel: "whatsapp",
    status: "delivered",
  },
  {
    patient: "João Silva",
    message: "Feliz aniversário",
    date: "2024-01-11 09:00",
    channel: "sms",
    status: "delivered",
  },
  {
    patient: "Ana Costa",
    message: "Campanha de clareamento",
    date: "2024-01-10 14:15",
    channel: "email",
    status: "opened",
  },
  {
    patient: "Pedro Lima",
    message: "Lembrete de consulta enviado",
    date: "2024-01-09 16:45",
    channel: "whatsapp",
    status: "read",
  },
]

const surveys = [
  { patient: "Maria Santos", rating: 5, date: "2024-01-10", feedback: "Excelente atendimento! Muito profissional." },
  {
    patient: "Carlos Mendes",
    rating: 5,
    date: "2024-01-08",
    feedback: "Adorei o resultado do clareamento, recomendo!",
  },
  {
    patient: "Beatriz Rocha",
    rating: 4,
    date: "2024-01-05",
    feedback: "Muito bom, mas a espera foi um pouco longa.",
  },
]

export default function CommunicationPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false)
  const [isNewTemplateOpen, setIsNewTemplateOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<(typeof templates)[0] | null>(null)

  const handleEditTemplate = (template: (typeof templates)[0]) => {
    setEditingTemplate(template)
    setIsEditTemplateOpen(true)
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
              <h1 className="text-3xl font-semibold text-balance">Comunicação</h1>
              <p className="text-muted-foreground">Mensagens e campanhas</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enviar Mensagem</DialogTitle>
                  <DialogDescription>Selecione destinatários e template</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipients">Destinatários</Label>
                    <Select>
                      <SelectTrigger id="recipients">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os pacientes</SelectItem>
                        <SelectItem value="active">Pacientes ativos</SelectItem>
                        <SelectItem value="custom">Seleção personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                      <SelectTrigger id="template">
                        <SelectValue placeholder="Selecione um template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="channel">Canal</Label>
                    <Select>
                      <SelectTrigger id="channel">
                        <SelectValue placeholder="Selecione o canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Digite sua mensagem ou use um template"
                      rows={5}
                      value={
                        selectedTemplate ? templates.find((t) => t.id.toString() === selectedTemplate)?.content : ""
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancelar</Button>
                  <Button>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.248</div>
                <p className="text-xs text-muted-foreground">Este mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Abertura</CardTitle>
                <Mail className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+5%</span> vs. mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
                <Star className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">De 5.0 estrelas</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="templates" className="space-y-6">
            <TabsList>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="history">Histórico</TabsTrigger>
              <TabsTrigger value="surveys">Pesquisas</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-end mb-4">
                <Button className="gap-2" onClick={() => setIsNewTemplateOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Novo Template
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            {template.channel === "whatsapp" && <Smartphone className="h-3 w-3" />}
                            {template.channel === "sms" && <MessageSquare className="h-3 w-3" />}
                            {template.channel === "email" && <Mail className="h-3 w-3" />}
                            {template.channel}
                          </CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            template.type === "reminder"
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                              : template.type === "birthday"
                                ? "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                                : template.type === "followup"
                                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                          }
                        >
                          {template.type === "reminder"
                            ? "Lembrete"
                            : template.type === "birthday"
                              ? "Aniversário"
                              : template.type === "followup"
                                ? "Retorno"
                                : "Campanha"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{template.content}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent"
                          onClick={() => handleEditTemplate(template)}
                        >
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Send className="h-3 w-3 mr-2" />
                          Usar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Histórico de Mensagens</CardTitle>
                  <CardDescription>Mensagens enviadas recentemente</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messageHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={`/.jpg?height=40&width=40&query=${item.patient}`} />
                            <AvatarFallback>{item.patient.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{item.patient}</p>
                            <p className="text-xs text-muted-foreground">{item.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.channel === "whatsapp" && <Smartphone className="h-3 w-3 text-muted-foreground" />}
                              {item.channel === "sms" && <MessageSquare className="h-3 w-3 text-muted-foreground" />}
                              {item.channel === "email" && <Mail className="h-3 w-3 text-muted-foreground" />}
                              <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            item.status === "delivered"
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                              : item.status === "opened"
                                ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          }
                        >
                          {item.status === "delivered" ? "Entregue" : item.status === "opened" ? "Aberto" : "Lido"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="surveys" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquisas de Satisfação</CardTitle>
                  <CardDescription>Feedback dos pacientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {surveys.map((survey, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{survey.patient}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(survey.date).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < survey.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{survey.feedback}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <EditTemplateModal
        open={isEditTemplateOpen}
        onOpenChange={setIsEditTemplateOpen}
        template={editingTemplate}
        isNew={false}
      />
      <EditTemplateModal open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen} template={null} isNew={true} />
    </div>
  )
}
