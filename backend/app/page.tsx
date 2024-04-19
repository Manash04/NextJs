import Image from "next/image";
import axios from "axios";

async function getUserData() {
  await new Promise((r)=> setTimeout(r, 5000));
  const response = await axios.get(
    "http://localhost:3000/api/user"
  );
  return response.data;
}

//create an async component

export default async function Home() {
  const UserDetails = await getUserData();
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>Name: {UserDetails?.name}</div>
          {UserDetails?.email}
        </div>
      </div>
    </div>
  );
}
