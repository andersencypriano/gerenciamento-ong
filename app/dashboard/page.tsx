import CardTotal from "./students/_components/cards/cardTotal";
import TableStudents from "./students/_components/tableStudents/tableStudents";

export default async function HomeDashboard() {

  return (
    <>
      <main className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <CardTotal />
        </div>
        <div>
          <TableStudents />
        </div>
      </main>
    </>
  )
}