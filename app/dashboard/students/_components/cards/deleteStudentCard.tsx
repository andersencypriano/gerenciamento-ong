"use client"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteStudentForm from "../forms/deleteStudentForm";
import { IconTrash } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

export default function DeleteStudentCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Excluir aluno</CardTitle>
        <CardAction>
          <Badge variant="default" className="bg-red-500">
            <IconTrash className="text-white" size={40} />
          </Badge>
        </CardAction>
        <CardDescription>Insira o CPF do aluno para confirmar a exclusão</CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteStudentForm />
      </CardContent>
    </Card>
  )
} 