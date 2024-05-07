import { getServerSession } from "next-auth";
//This is the server side pages so session cannot be used
export default async function () {
  const session = await getServerSession();
  return (
    <div>
      Details of the server component
      <br />
      {JSON.stringify(session)}
    </div>
  );
}
