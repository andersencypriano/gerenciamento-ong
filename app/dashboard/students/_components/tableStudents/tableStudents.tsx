import { columns, Student } from "./columns"
import { DataTable } from "./data-table"
import { getAllStudents } from "@/actions/students/getAllStudents"

async function getData(): Promise<Student[]> {
  const students = await getAllStudents();
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