import CardTotal from "./students/components/cards/cardTotal";

export default async function HomeDashboard() {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-4">
        <CardTotal />
      </div>
    </>
  )
}