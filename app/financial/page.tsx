"use client"

import { useState } from "react"
import { Bell, Search, Plus, DollarSign, TrendingUp, TrendingDown, Receipt, CreditCard } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserMenu } from "@/components/user-menu"

const treatments = [
  {
    id: 1,
    patient: "Maria Santos",
    procedure: "Limpeza + Clareamento",
    total: 800,
    paid: 800,
    status: "paid",
    date: "2024-01-10",
  },
  {
    id: 2,
    patient: "João Silva",
    procedure: "Canal + Coroa",
    total: 2500,
    paid: 1500,
    status: "partial",
    date: "2024-01-08",
  },
  {
    id: 3,
    patient: "Ana Costa",
    procedure: "Implante",
    total: 3500,
    paid: 0,
    status: "pending",
    date: "2024-01-05",
  },
  {
    id: 4,
    patient: "Pedro Lima",
    procedure: "Ortodontia - Mensalidade",
    total: 450,
    paid: 0,
    status: "overdue",
    date: "2023-12-28",
  },
]

const paymentSchedule = [
  { patient: "João Silva", amount: 1000, dueDate: "2024-02-10", installment: "2/3", status: "scheduled" },
  { patient: "Ana Costa", amount: 1750, dueDate: "2024-02-15", installment: "1/2", status: "scheduled" },
  { patient: "Carlos Mendes", amount: 600, dueDate: "2024-02-20", installment: "3/6", status: "scheduled" },
]

const insurances = [
  { name: "Amil Dental", patients: 15, revenue: 12500 },
  { name: "SulAmérica", patients: 8, revenue: 8200 },
  { name: "Bradesco Dental", patients: 12, revenue: 9800 },
]

export default function FinancialPage() {
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTreatments = treatments.filter((t) => statusFilter === "all" || t.status === statusFilter)

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
              <h1 className="text-3xl font-semibold text-balance">Financeiro</h1>
              <p className="text-muted-foreground">Controle de pagamentos e receitas</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Orçamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Orçamento</DialogTitle>
                  <DialogDescription>Preencha os detalhes do plano de tratamento</DialogDescription>
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
                    <Label htmlFor="procedures">Procedimentos</Label>
                    <Textarea id="procedures" placeholder="Liste os procedimentos do plano de tratamento" rows={4} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total">Valor Total</Label>
                    <Input id="total" type="number" placeholder="0.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installments">Parcelamento</Label>
                    <Select>
                      <SelectTrigger id="installments">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">À vista</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                        <SelectItem value="3">3x</SelectItem>
                        <SelectItem value="6">6x</SelectItem>
                        <SelectItem value="12">12x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Criar Orçamento</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Receita do Mês</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 45.231</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+18%</span> vs. mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">A Receber</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12.450</div>
                <p className="text-xs text-muted-foreground">8 pagamentos pendentes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">R$ 3.450</div>
                <p className="text-xs text-muted-foreground">4 pagamentos atrasados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <Receipt className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.245</div>
                <p className="text-xs text-muted-foreground">Por tratamento</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="treatments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="treatments">Tratamentos</TabsTrigger>
              <TabsTrigger value="schedule">Cronograma</TabsTrigger>
              <TabsTrigger value="insurance">Convênios</TabsTrigger>
            </TabsList>

            <TabsContent value="treatments" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="paid">Pagos</SelectItem>
                        <SelectItem value="partial">Parciais</SelectItem>
                        <SelectItem value="pending">Pendentes</SelectItem>
                        <SelectItem value="overdue">Vencidos</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Receipt className="h-4 w-4" />
                      Gerar Recibo
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Procedimento</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Pago</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTreatments.map((treatment) => (
                        <TableRow key={treatment.id}>
                          <TableCell className="font-medium">{treatment.patient}</TableCell>
                          <TableCell>{treatment.procedure}</TableCell>
                          <TableCell>R$ {treatment.total.toFixed(2)}</TableCell>
                          <TableCell>R$ {treatment.paid.toFixed(2)}</TableCell>
                          <TableCell>{new Date(treatment.date).toLocaleDateString("pt-BR")}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={
                                treatment.status === "paid"
                                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                  : treatment.status === "partial"
                                    ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                                    : treatment.status === "pending"
                                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                                      : "bg-red-500/10 text-red-700 dark:text-red-400"
                              }
                            >
                              {treatment.status === "paid"
                                ? "Pago"
                                : treatment.status === "partial"
                                  ? "Parcial"
                                  : treatment.status === "pending"
                                    ? "Pendente"
                                    : "Vencido"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cronograma de Pagamentos</CardTitle>
                  <CardDescription>Próximas parcelas a receber</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentSchedule.map((payment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{payment.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              Parcela {payment.installment} • Vencimento:{" "}
                              {new Date(payment.dueDate).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">R$ {payment.amount.toFixed(2)}</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Registrar Pagamento
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Convênios</CardTitle>
                  <CardDescription>Planos de saúde e pacientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insurances.map((insurance, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{insurance.name}</p>
                          <p className="text-sm text-muted-foreground">{insurance.patients} pacientes ativos</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">R$ {insurance.revenue.toLocaleString("pt-BR")}</p>
                          <p className="text-xs text-muted-foreground">Receita total</p>
                        </div>
                      </div>
                    ))}
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
