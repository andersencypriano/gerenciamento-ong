import { getAllStudents } from "@/actions/students/getAllStudents"
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

interface CardTotalProps {
  students?: Array<{ id: number; name: string; createdAt: string }>;
}

export default async function CardTotal({ students }: CardTotalProps = {}) {
  const studentData = students ?? await getAllStudents();
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de alunos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {studentData.length}
          </CardTitle>
          <CardAction>
            <Badge variant="default" className="bg-green-500">
              <IconUsers className="text-white" size={40} />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {studentData.length > 0 ? (
            <>
              <div className="font-medium">
                <CardDescription>Último aluno cadastrado:</CardDescription>
                <p>{studentData[0].name}</p>
              </div>
              <div className="text-muted-foreground">
                Registrado em: {new Date(studentData[0].createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })} - {new Date(studentData[0].createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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