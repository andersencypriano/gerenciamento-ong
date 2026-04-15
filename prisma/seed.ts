import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Iniciando Seed robusto conforme o schema...");

   // 0. Limpeza completa (Ordem importa!)
  console.log("Cleaning database...");
  await prisma.attendance.deleteMany();
  await prisma.student.deleteMany();
  await prisma.workshop.deleteMany();

  // 1. Criar Oficinas (Workshops)
  console.log("🎨 Criando oficinas...");
  const workshopsData = [
    { name: "Capoeira", description: "A arte suave que mistura luta, dança e música." },
    { name: "Percussão", description: "Ritmos e instrumentos de percussão." },
    { name: "Dança", description: "Movimento e expressão corporal." },
  ];

  const workshops = await Promise.all(
    workshopsData.map((w) =>
      prisma.workshop.upsert({
        where: { name: w.name },
        update: { description: w.description },
        create: w,
      })
    )
  );
  console.log(`✅ ${workshops.length} oficinas carregadas.`);

  // 2. Criar Estudantes
  console.log("👥 Criando estudantes...");
  const studentsData = [
    {
      name: "João Silva",
      cpf: "123.456.789-01",
      phone: "(11) 98888-0001",
      emergencyPhone: "(11) 97777-0001",
      workshopNames: ["Capoeira", "Percussão"],
    },
    {
      name: "Maria Oliveira",
      cpf: "234.567.890-02",
      phone: "(11) 98888-0002",
      emergencyPhone: "(11) 97777-0002",
      workshopNames: ["Percussão", "Dança"],
    },
    {
      name: "Pedro Santos",
      cpf: "345.678.901-03",
      phone: "(11) 98888-0003",
      emergencyPhone: null,
      workshopNames: ["Capoeira", "Dança"],
    },
  ];

  for (const s of studentsData) {
    await prisma.student.upsert({
      where: { cpf: s.cpf },
      update: {
        name: s.name,
        phone: s.phone,
        emergencyPhone: s.emergencyPhone,
        workshops: {
          set: s.workshopNames.map(name => ({ name })),
        },
      },
      create: {
        name: s.name,
        cpf: s.cpf,
        phone: s.phone,
        emergencyPhone: s.emergencyPhone,
        workshops: {
          connect: s.workshopNames.map(name => ({ name })),
        },
      },
    });
  }
  console.log(`✅ ${studentsData.length} estudantes carregados.`);

  // 3. Registrar Presenças
  console.log("📝 Registrando presenças...");
  const allStudents = await prisma.student.findMany({ include: { workshops: true } });
  
  await prisma.attendance.deleteMany(); // Limpa histórico para o seed

  const attendanceRecords = [];
  const today = new Date();

  for (const student of allStudents) {
    for (const workshop of student.workshops) {
      attendanceRecords.push({
        studentId: student.id,
        workshopId: workshop.id,
        date: today,
        isPresent: Math.random() > 0.1, // 90% de presença
      });
    }
  }

  await prisma.attendance.createMany({
    data: attendanceRecords,
  });

  console.log(`✅ ${attendanceRecords.length} registros de presença criados.`);
  console.log("✨ Seed finalizado com sucesso!");
}

main()
  .then(async () => {
    await pool.end();
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await pool.end();
    await prisma.$disconnect();
    process.exit(1);
  });