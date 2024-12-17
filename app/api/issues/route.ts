import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../validationschema";
import { auth } from "@/app/auth";


export async function POST(request: NextRequest){
    const session = await auth()
    if (!session)
      return NextResponse.json({}, {status:401});

  const body = await request.json() 
  const validation = schema.safeParse(body)

  if(!validation.success)
    return NextResponse.json(validation.error.errors, {status: 400})


const newIsssue = await prisma.issue.create({
    data: {title: body.title, description: body.description}
  })

return NextResponse.json(newIsssue, {status: 201})

}