"use server"

import { prisma } from "@/lib/prisma";
import { Workshop } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export type StudentActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

import { createStudentSchema } from "@/schemas/students/createStudentSchema";

export async function createStudentAction(data: z.infer<typeof createStudentSchema>): Promise<StudentActionState> {
  const result = createStudentSchema.safeParse(data);

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

  const { name, cpf, phone, emergencyPhone, workshops } = result.data;

  try {
    const student = await prisma.student.create({
      data: {
        name,
        cpf,
        phone,
        emergencyPhone: emergencyPhone || null,
        workshops: {
          connect: workshops.map((name) => ({ name })),
        },
      },
    });

    revalidatePath("/dashboard");
    
    return {
      success: true,
      message: `Estudante ${student.name} cadastrado com sucesso!`,
    };
  } catch (error) {
    console.error("Erro ao criar estudante:", error);
    
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return {
        success: false,
        message: "Este CPF já está cadastrado no sistema.",
      };
    }

    return {
      success: false,
      message: "Erro interno ao cadastrar estudante. Tente novamente.",
    };
  }
}
export async function getStudents() {
  try {
    const students = await prisma.student.findMany({
      include: {
        workshops: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return students;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
    return [];
  }
}