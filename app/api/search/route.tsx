import { PrefixTree } from '@/lib/autoCompletePrefixTree';
import { getAllNotesVelite } from '@/lib/getNotesJson';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest,res:NextResponse) {
  const q = await req.json()
  const ser:string = q.query
  const tree = new PrefixTree();
  const d = await getAllNotesVelite()
  // const s = await getAllNotesVelite()
  // console.log(s)
  d?.forEach((e)=>{
      tree._insert(e)
    })
  // console.log(tree._search("5.mdx"));
  return NextResponse.json(tree._search(ser.toLowerCase()));
}
