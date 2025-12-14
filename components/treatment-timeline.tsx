import { Calendar, FileText } from "lucide-react"

const treatments = [
  {
    date: "2024-01-10",
    dentist: "Dr. Ana Silva",
    procedure: "Limpeza e Profilaxia",
    tooth: "Geral",
    notes: "Paciente apresentou boa higiene bucal. Recomendado retorno em 6 meses.",
    status: "completed",
  },
  {
    date: "2023-11-15",
    dentist: "Dr. Carlos Mendes",
    procedure: "Restauração",
    tooth: "Dente 16",
    notes: "Restauração em resina composta. Paciente sem queixas pós-procedimento.",
    status: "completed",
  },
  {
    date: "2023-09-22",
    dentist: "Dr. Ana Silva",
    procedure: "Tratamento de Canal",
    tooth: "Dente 26",
    notes: "Canal realizado em sessão única. Paciente relatou melhora da dor.",
    status: "completed",
  },
  {
    date: "2023-07-10",
    dentist: "Dr. Ana Silva",
    procedure: "Consulta Inicial",
    tooth: "Geral",
    notes: "Avaliação completa. Planejamento de tratamento apresentado ao paciente.",
    status: "completed",
  },
]

export function TreatmentTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-6">
        {treatments.map((treatment, index) => (
          <div key={index} className="relative pl-10">
            <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary-foreground" />
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{treatment.procedure}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(treatment.date).toLocaleDateString("pt-BR")} • {treatment.dentist}
                  </p>
                </div>
                <div className="text-xs font-medium text-muted-foreground">{treatment.tooth}</div>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{treatment.notes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
