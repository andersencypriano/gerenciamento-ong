import CardTotal from "./students/_components/cards/cardTotal";
import DeleteStudentCard from "./students/_components/cards/deleteStudentCard";
import TableStudents from "./students/_components/tableStudents/tableStudents";

export default async function HomeDashboard() {

  return (
    <>
      <main className="p-4 space-y-4">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <CardTotal />
          <DeleteStudentCard />
        </div>
        <div>
          <TableStudents />
        </div>
      </main>
    </>
  )
}