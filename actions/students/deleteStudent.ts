"use server"

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { deleteStudentSchema } from "@/schemas/students/deleteStudentSchema";
import { revalidatePath } from "next/cache";

export type StudentActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function deleteStudentAction(data: z.infer<typeof deleteStudentSchema>): Promise<StudentActionState> {
  const result = deleteStudentSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Dados inválidos.",
      errors: Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [
          key,
          value ? value[0] : "",
        ])
      ),
    };
  }

  const { cpf } = result.data;

  try {
    const student = await prisma.student.delete({
      where: {
        cpf,
      },
    });

    revalidatePath("/dashboard");
    
    return {
      success: true,
      message: `Estudante ${student.name} deletado com sucesso!`,
    };
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        message: "Estudante não encontrado ou já deletado.",
      };
    }

    console.error("Erro ao deletar estudante:", error);
    
    return {
      success: false,
      message: "Erro interno ao deletar estudante. Tente novamente.",
    };
  }
}
