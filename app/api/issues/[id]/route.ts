import { auth } from "@/app/auth";
import { patchSchema, schema } from "@/app/validationschema";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  const session = await auth()
      if (!session)
        return NextResponse.json({}, {status:401});
      
  const id = params?.id;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      { error: "Invalid or missing ID parameter" },
      { status: 400 }
    ); // Bad request
  }
  const body = await request.json();
  const validation = patchSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    }); //bad request

    const {title, description, assignedToUserId } = body;
    
    if(assignedToUserId) {
    const user = await  prisma.user.findUnique({where : {id: assignedToUserId}})
      if(!user)
        return NextResponse.json({error: "Invalid User."}, {status:400})
    }

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!issue)
        return NextResponse.json(
    { error: "Invalid issue" },
    { status: 404 }
    ); // not found

  

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    },
  });

  return NextResponse.json(updatedIssue);
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
 
  const session = await auth()
      if (!session)
        return NextResponse.json({}, {status:401});
      
    const issuedId = await prisma.issue.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if(!issuedId)
      return NextResponse.json({error: "Invalid Id, Not found"}, {status: 404})

    const deletedIssue =  await prisma.issue.delete({
      where: {
        id: issuedId.id
      }
    });

  return  NextResponse.json(deletedIssue, {status: 200})

}