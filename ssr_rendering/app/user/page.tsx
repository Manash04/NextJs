import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const client = new PrismaClient();
async function fetchData() {
  const user = await client.user.findFirst();
  return {
    email: user?.email,
    name: "Manash",
  };
}

export default async function User() {
  const data = await fetchData();
  return (
    <div>
      {data.name}
      {data.email}
    </div>
  );
}
