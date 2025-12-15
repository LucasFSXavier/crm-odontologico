"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList } from "recharts"

const allData = {
  week: [
    { procedure: "Limpeza", count: 12 },
    { procedure: "Canal", count: 5 },
    { procedure: "Extração", count: 3 },
    { procedure: "Clareamento", count: 8 },
    { procedure: "Implante", count: 2 },
  ],
  month: [
    { procedure: "Limpeza", count: 45 },
    { procedure: "Canal", count: 28 },
    { procedure: "Extração", count: 22 },
    { procedure: "Clareamento", count: 18 },
    { procedure: "Implante", count: 12 },
  ],
  year: [
    { procedure: "Limpeza", count: 520 },
    { procedure: "Canal", count: 340 },
    { procedure: "Extração", count: 280 },
    { procedure: "Clareamento", count: 210 },
    { procedure: "Implante", count: 145 },
  ],
}

export function ProceduresChart() {
  const [period, setPeriod] = useState("month")
  const data = allData[period as keyof typeof allData]

  const periodLabels = {
    week: "Esta semana",
    month: "Este mês",
    year: "Este ano",
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Procedimentos Realizados</CardTitle>
            <CardDescription>{periodLabels[period as keyof typeof periodLabels]}</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="procedure" className="text-xs" interval={0} angle={0} textAnchor="middle" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#6b7280" }}
              itemStyle={{ color: "#6b7280" }}
              labelFormatter={() => ""}
            />
            <Bar dataKey="count" fill="#000000" radius={[8, 8, 0, 0]} name="Quantidade">
              <LabelList dataKey="count" position="top" fill="#6b7280" fontSize={12} fontWeight={500} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
