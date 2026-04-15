import { getStudents } from "@/actions/students/student"
import { IconUsers } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function CardTotal() {
  const students = await getStudents();
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de alunos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {students.length}
          </CardTitle>
          <CardAction>
            <Badge variant="default" className="bg-green-500">
              <IconUsers className="text-white" size={40} />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {students.length > 0 ? (
            <>
              <div className="font-medium">
                <CardDescription>Último aluno cadastrado:</CardDescription>
                <p>{students[0].name}</p>
              </div>
              <div className="text-muted-foreground">
                Registrado em: {new Date(students[0].createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(students[0].createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </>
          ) : (
            <div className="text-muted-foreground italic">Nenhum aluno cadastrado</div>
          )}
        </CardFooter>
      </Card>
    </>
  )
}