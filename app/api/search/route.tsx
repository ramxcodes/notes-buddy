import { globalPrefixTree, initPrefixTree, PrefixTree } from '@/lib/autoCompletePrefixTree';
import { getAllNotesVelite } from '@/lib/getNotesJson';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest,res:NextResponse) {
  const q = await req.json()
  const ser:string = q.query
  const tree = new PrefixTree();
  
  if(!globalPrefixTree){
    await initPrefixTree();
  }
  let result = globalPrefixTree!._search(ser.toLowerCase());
  if(result.length===0){
    result = globalPrefixTree?._collectNotesWithFuzzySearch(ser.toLowerCase(), globalPrefixTree.root);
    if(result.length >20){
      result.slice(0,10);
    }
  }
  // console.log(result)
  return NextResponse.json(result);
}
