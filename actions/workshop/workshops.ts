"use server"

import { prisma } from "@/lib/prisma";
import { Workshop } from "@prisma/client";

export async function getAllWorkshops(): Promise<Workshop[]> {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return workshops;
  } catch (error) {
    console.error("Erro ao buscar oficinas:", error);
    return [];
  }
}
