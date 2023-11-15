import { NextResponse } from "next/server"

export async function POST(req:Request,res:Response){
  try {
    console.log(1)
    const data = req.json()
    console.log(2)
    const content = await data
    console.log(3)
    console.log(content.url)
    const siteRes = await fetch(content.url)
    console.log(4)
    const siteContent = await siteRes.text()
    console.log(siteContent)
    return NextResponse.json({siteContent})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error})
  }
}