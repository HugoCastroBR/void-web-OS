import prisma from '@/utils/connect'
import { NextResponse } from 'next/server'

export async function GET(req:Request,context: {params: {url: string}}){
  try {
    // const siteContent = await fetch(context.params.url)
    const content = 'hello world'
    console.log("whyyy")
    // const content = await siteContent.text()
    return NextResponse.json({content})
  } catch (error) {
    return NextResponse.json({error})
  }
}