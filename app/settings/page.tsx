"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { UserMenu } from "@/components/user-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Save, Upload } from "lucide-react"
import { maskPhone } from "@/lib/masks"
import { AuthGuard } from "@/components/auth-guard"
import { AddUserModal } from "@/components/add-user-modal"
import { EditPermissionsModal } from "@/components/edit-permissions-modal"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("clinic")
  const [clinicData, setClinicData] = useState({
    name: "Clínica DentalCare",
    cnpj: "",
    phone1: "",
    phone2: "",
    address: "",
    workingHours: "",
    social: {
      facebook: "",
      instagram: "",
      website: "",
    },
  })

  const [notifications, setNotifications] = useState({
    absences: true,
    payments: true,
    birthdays: true,
    reminderTime: "24",
  })

  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [editPermissionsModalOpen, setEditPermissionsModalOpen] = useState(false)

  const handleSave = () => {
    console.log("[v0] Configurações salvas")
  }

  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Configurações</h1>
              <p className="text-sm text-muted-foreground">Gerencie as configurações do sistema</p>
            </div>
            <UserMenu />
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="clinic" className="space-y-6">
              <TabsList>
                <TabsTrigger value="clinic">Clínica</TabsTrigger>
                <TabsTrigger value="users">Usuários</TabsTrigger>
                <TabsTrigger value="schedule">Agenda</TabsTrigger>
                <TabsTrigger value="financial">Financeiro</TabsTrigger>
                <TabsTrigger value="communication">Comunicação</TabsTrigger>
                <TabsTrigger value="procedures">Procedimentos</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="security">Segurança</TabsTrigger>
              </TabsList>

              {/* Dados da Clínica */}
              <TabsContent value="clinic">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados da Clínica</CardTitle>
                    <CardDescription>Informações básicas da clínica</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clinicName">Nome da Clínica</Label>
                        <Input
                          id="clinicName"
                          value={clinicData.name}
                          onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cnpj">CNPJ</Label>
                        <Input
                          id="cnpj"
                          value={clinicData.cnpj}
                          onChange={(e) =>
                            setClinicData({ ...clinicData, cnpj: e.target.value.replace(/\D/g, "").slice(0, 14) })
                          }
                          placeholder="00.000.000/0000-00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone1">Telefone Principal</Label>
                        <Input
                          id="phone1"
                          value={clinicData.phone1}
                          onChange={(e) => setClinicData({ ...clinicData, phone1: maskPhone(e.target.value) })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone2">Telefone Secundário</Label>
                        <Input
                          id="phone2"
                          value={clinicData.phone2}
                          onChange={(e) => setClinicData({ ...clinicData, phone2: maskPhone(e.target.value) })}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço Completo</Label>
                      <Input
                        id="address"
                        value={clinicData.address}
                        onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                        placeholder="Rua, número, bairro, cidade - Estado, CEP"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workingHours">Horário de Funcionamento</Label>
                      <Textarea
                        id="workingHours"
                        value={clinicData.workingHours}
                        onChange={(e) => setClinicData({ ...clinicData, workingHours: e.target.value })}
                        placeholder="Ex: Segunda a Sexta: 8h às 18h"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Logo da Clínica</Label>
                      <div className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center">
                          <span className="text-2xl font-bold text-muted-foreground">DC</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Fazer Upload
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Redes Sociais e Site</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="facebook">Facebook</Label>
                          <Input
                            id="facebook"
                            value={clinicData.social.facebook}
                            onChange={(e) =>
                              setClinicData({
                                ...clinicData,
                                social: { ...clinicData.social, facebook: e.target.value },
                              })
                            }
                            placeholder="facebook.com/suaclinica"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            value={clinicData.social.instagram}
                            onChange={(e) =>
                              setClinicData({
                                ...clinicData,
                                social: { ...clinicData.social, instagram: e.target.value },
                              })
                            }
                            placeholder="@suaclinica"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={clinicData.social.website}
                          onChange={(e) =>
                            setClinicData({ ...clinicData, social: { ...clinicData.social, website: e.target.value } })
                          }
                          placeholder="https://www.suaclinica.com.br"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Gestão de Usuários */}
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestão de Usuários e Permissões</CardTitle>
                    <CardDescription>Gerencie usuários e níveis de acesso</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Usuários Cadastrados</h3>
                        <p className="text-sm text-muted-foreground">Dentistas, recepcionistas e auxiliares</p>
                      </div>
                      <Button onClick={() => setAddUserModalOpen(true)}>Adicionar Usuário</Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">LX</span>
                          </div>
                          <div>
                            <p className="font-medium">Dr. Lucas Xavier</p>
                            <p className="text-sm text-muted-foreground">Administrador</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setEditPermissionsModalOpen(true)}>
                          Editar Permissões
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Níveis de Acesso</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Dashboard</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="admin">Apenas Admin</SelectItem>
                              <SelectItem value="dentist">Admin e Dentista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Pacientes</Label>
                          <Select defaultValue="all">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="admin">Apenas Admin</SelectItem>
                              <SelectItem value="dentist">Admin e Dentista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Financeiro</Label>
                          <Select defaultValue="admin">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos</SelectItem>
                              <SelectItem value="admin">Apenas Admin</SelectItem>
                              <SelectItem value="dentist">Admin e Dentista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Agenda e Consultas */}
              <TabsContent value="schedule">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Agenda</CardTitle>
                    <CardDescription>Defina horários e durações padrão</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Duração Padrão - Limpeza</Label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutos</SelectItem>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="60">1 hora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duração Padrão - Restauração</Label>
                        <Select defaultValue="60">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 minutos</SelectItem>
                            <SelectItem value="45">45 minutos</SelectItem>
                            <SelectItem value="60">1 hora</SelectItem>
                            <SelectItem value="90">1h 30min</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Intervalo Entre Consultas</Label>
                      <Select defaultValue="15">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Sem intervalo</SelectItem>
                          <SelectItem value="5">5 minutos</SelectItem>
                          <SelectItem value="10">10 minutos</SelectItem>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Horários de Atendimento</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Horário de Início</Label>
                          <Input type="time" defaultValue="08:00" />
                        </div>
                        <div className="space-y-2">
                          <Label>Horário de Término</Label>
                          <Input type="time" defaultValue="18:00" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Dias de Trabalho</h3>
                      <div className="space-y-2">
                        {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day) => (
                          <div key={day} className="flex items-center justify-between">
                            <Label>{day}</Label>
                            <Switch defaultChecked={day !== "Domingo"} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label>Política de Cancelamento</Label>
                      <Textarea
                        placeholder="Descreva a política de cancelamento da clínica"
                        defaultValue="Cancelamentos devem ser feitos com no mínimo 24 horas de antecedência."
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Financeiro */}
              <TabsContent value="financial">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações Financeiras</CardTitle>
                    <CardDescription>Formas de pagamento e taxas</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Formas de Pagamento Aceitas</h3>
                      <div className="space-y-2">
                        {["Dinheiro", "Cartão de Débito", "Cartão de Crédito", "PIX", "Transferência Bancária"].map(
                          (method) => (
                            <div key={method} className="flex items-center justify-between">
                              <Label>{method}</Label>
                              <Switch defaultChecked />
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Taxas e Parcelamento</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Taxa de Juros Mensal (%)</Label>
                          <Input type="number" placeholder="1.5" step="0.1" />
                        </div>
                        <div className="space-y-2">
                          <Label>Número Máximo de Parcelas</Label>
                          <Select defaultValue="12">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3x</SelectItem>
                              <SelectItem value="6">6x</SelectItem>
                              <SelectItem value="12">12x</SelectItem>
                              <SelectItem value="18">18x</SelectItem>
                              <SelectItem value="24">24x</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Dados Bancários</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Banco</Label>
                          <Input placeholder="Nome do banco" />
                        </div>
                        <div className="space-y-2">
                          <Label>Agência</Label>
                          <Input placeholder="0000" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Conta</Label>
                          <Input placeholder="00000-0" />
                        </div>
                        <div className="space-y-2">
                          <Label>Tipo de Conta</Label>
                          <Select defaultValue="corrente">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="corrente">Corrente</SelectItem>
                              <SelectItem value="poupanca">Poupança</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Comunicação */}
              <TabsContent value="communication">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Comunicação</CardTitle>
                    <CardDescription>Integrações e envio automático</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Integrações de Mensagem</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">WhatsApp Business API</p>
                            <p className="text-sm text-muted-foreground">Envie mensagens via WhatsApp</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">SMS</p>
                            <p className="text-sm text-muted-foreground">Envie mensagens via SMS</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">Email Marketing</p>
                            <p className="text-sm text-muted-foreground">Envie emails em massa</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Envio Automático</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Lembretes de Consulta</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Confirmação de Agendamento</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Mensagens de Aniversário</Label>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Campanhas Promocionais</Label>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label>Assinatura de Email</Label>
                      <Textarea
                        placeholder="Digite a assinatura padrão para emails"
                        defaultValue="Atenciosamente,&#10;Equipe DentalCare&#10;(11) 98765-4321"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">LGPD - Termos e Consentimentos</h3>
                      <div className="flex items-center justify-between">
                        <Label>Solicitar consentimento para comunicação</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Procedimentos */}
              <TabsContent value="procedures">
                <Card>
                  <CardHeader>
                    <CardTitle>Procedimentos e Preços</CardTitle>
                    <CardDescription>Gerencie procedimentos odontológicos</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Tabela de Procedimentos</h3>
                        <p className="text-sm text-muted-foreground">Lista de procedimentos e valores</p>
                      </div>
                      <Button>Adicionar Procedimento</Button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "Limpeza", price: "R$ 150,00" },
                        { name: "Restauração", price: "R$ 300,00" },
                        { name: "Canal", price: "R$ 800,00" },
                        { name: "Extração", price: "R$ 250,00" },
                        { name: "Clareamento", price: "R$ 600,00" },
                      ].map((procedure, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">{procedure.name}</p>
                            <p className="text-sm text-muted-foreground">{procedure.price}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Convênios</h3>
                      <div className="flex items-center justify-between">
                        <Label>Aceita convênios?</Label>
                        <Switch />
                      </div>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notificações */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificações</CardTitle>
                    <CardDescription>Configure alertas e lembretes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Tipos de Notificação</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Alertas de Faltas</Label>
                          <Switch
                            checked={notifications.absences}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, absences: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Lembretes de Pagamento</Label>
                          <Switch
                            checked={notifications.payments}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, payments: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label>Aniversários de Pacientes</Label>
                          <Switch
                            checked={notifications.birthdays}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, birthdays: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Label>Tempo de Antecedência para Lembretes</Label>
                      <Select
                        value={notifications.reminderTime}
                        onValueChange={(value) => setNotifications({ ...notifications, reminderTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 hora antes</SelectItem>
                          <SelectItem value="2">2 horas antes</SelectItem>
                          <SelectItem value="24">24 horas antes</SelectItem>
                          <SelectItem value="48">48 horas antes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Segurança */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup e Segurança</CardTitle>
                    <CardDescription>Proteção de dados e auditoria</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Backup Automático</h3>
                      <div className="space-y-2">
                        <Label>Frequência de Backup</Label>
                        <Select defaultValue="daily">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Diário</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline">Fazer Backup Agora</Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Exportação de Dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Exporte todos os dados do sistema em formato JSON ou CSV
                      </p>
                      <Button variant="outline">Exportar Dados</Button>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Autenticação</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Autenticação em Dois Fatores (2FA)</Label>
                          <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-semibold">Log de Auditoria</h3>
                      <p className="text-sm text-muted-foreground">Registre todas as ações dos usuários no sistema</p>
                      <Button variant="outline">Ver Logs</Button>
                    </div>

                    <Button onClick={handleSave} className="mt-4">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <AddUserModal open={addUserModalOpen} onOpenChange={setAddUserModalOpen} />
      <EditPermissionsModal
        open={editPermissionsModalOpen}
        onOpenChange={setEditPermissionsModalOpen}
        user={{
          name: "Dr. Lucas Xavier",
          role: "Administrador",
        }}
      />
    </AuthGuard>
  )
}
