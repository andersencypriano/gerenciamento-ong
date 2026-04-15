import { columns, Student } from "./columns"
import { DataTable } from "./data-table"
import { getStudents } from "@/actions/students/student"

async function getData(): Promise<Student[]> {
  const students = await getStudents();
  return students
}

export default async function TableStudents() {
  const data = await getData()

  return (
    <div className="w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}