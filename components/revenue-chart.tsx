"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const allData = {
  "3": [
    { month: "Abr", receita: 40000, despesas: 25000 },
    { month: "Mai", receita: 45000, despesas: 27000 },
    { month: "Jun", receita: 48000, despesas: 28000 },
  ],
  "6": [
    { month: "Jan", receita: 35000, despesas: 22000 },
    { month: "Fev", receita: 38000, despesas: 24000 },
    { month: "Mar", receita: 42000, despesas: 26000 },
    { month: "Abr", receita: 40000, despesas: 25000 },
    { month: "Mai", receita: 45000, despesas: 27000 },
    { month: "Jun", receita: 48000, despesas: 28000 },
  ],
  "12": [
    { month: "Jan", receita: 32000, despesas: 20000 },
    { month: "Fev", receita: 35000, despesas: 22000 },
    { month: "Mar", receita: 38000, despesas: 24000 },
    { month: "Abr", receita: 42000, despesas: 26000 },
    { month: "Mai", receita: 40000, despesas: 25000 },
    { month: "Jun", receita: 45000, despesas: 27000 },
    { month: "Jul", receita: 48000, despesas: 28000 },
    { month: "Ago", receita: 46000, despesas: 27500 },
    { month: "Set", receita: 50000, despesas: 29000 },
    { month: "Out", receita: 52000, despesas: 30000 },
    { month: "Nov", receita: 55000, despesas: 31000 },
    { month: "Dez", receita: 58000, despesas: 32000 },
  ],
}

export function RevenueChart() {
  const [period, setPeriod] = useState("6")
  const data = allData[period as keyof typeof allData]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Receita vs Despesas</CardTitle>
            <CardDescription>Comparativo financeiro</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Últimos 3 meses</SelectItem>
              <SelectItem value="6">Últimos 6 meses</SelectItem>
              <SelectItem value="12">Último ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`}
              labelFormatter={() => ""}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
                fontWeight: 500,
              }}
              iconType="square"
            />
            <Area
              type="monotone"
              dataKey="receita"
              stackId="1"
              stroke="#6b7280"
              fill="#6b7280"
              fillOpacity={0.6}
              name="Receita"
            />
            <Area
              type="monotone"
              dataKey="despesas"
              stackId="2"
              stroke="#000000"
              fill="#000000"
              fillOpacity={0.6}
              name="Despesas"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
