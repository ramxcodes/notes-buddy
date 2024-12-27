import { PrefixTree } from '@/lib/autoCompletePrefixTree';
import { getAllNotes } from '@/lib/getNotesJson';
import { NextResponse } from 'next/server';

export async function POST(req,res) {
  const q = await req.json()
  const ser = q.query
  const tree = new PrefixTree();
  const d = await getAllNotes()
  d?.forEach((e)=>{
      tree._insert(e)
    })
  // console.log(tree._search("5.mdx"));
  return NextResponse.json(tree._search(ser));
}
