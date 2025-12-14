"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface Template {
  id: number
  name: string
  type: string
  channel: string
  content: string
}

interface EditTemplateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: Template | null
  isNew?: boolean
}

export function EditTemplateModal({ open, onOpenChange, template, isNew = false }: EditTemplateModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "reminder",
    channel: "whatsapp",
    content: "",
  })

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        type: template.type,
        channel: template.channel,
        content: template.content,
      })
    } else if (isNew) {
      setFormData({
        name: "",
        type: "reminder",
        channel: "whatsapp",
        content: "",
      })
    }
  }, [template, isNew])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Template salvo:", formData)
    // Aqui você adicionaria a lógica para salvar/atualizar o template
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isNew ? "Novo Template" : "Editar Template"}</DialogTitle>
          <DialogDescription>
            {isNew ? "Crie um novo template de mensagem" : "Atualize as informações do template"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Lembrete de Consulta"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reminder">Lembrete</SelectItem>
                    <SelectItem value="birthday">Aniversário</SelectItem>
                    <SelectItem value="followup">Retorno</SelectItem>
                    <SelectItem value="campaign">Campanha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">Canal *</Label>
                <Select
                  value={formData.channel}
                  onValueChange={(value) => setFormData({ ...formData, channel: value })}
                >
                  <SelectTrigger id="channel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.channel === "whatsapp"} />
                        WhatsApp
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.channel === "sms"} />
                        SMS
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Checkbox checked={formData.channel === "email"} />
                        Email
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo da Mensagem *</Label>
              <Textarea
                id="content"
                required
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Digite o conteúdo da mensagem. Use {nome}, {data}, {hora} para campos dinâmicos."
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Dica: Use {"{nome}"}, {"{data}"}, {"{hora}"} para inserir informações personalizadas
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{isNew ? "Criar Template" : "Salvar Alterações"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
