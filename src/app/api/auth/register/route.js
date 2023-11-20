const { NextResponse } = require("next/server");
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email já está cadastrado",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "Username já está cadastrado",
        },
        {
          status: 400,
        }
      );
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const NewUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = NewUser;
    //  Faz com que eu devolva somente o user sem a senha para o backend
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
