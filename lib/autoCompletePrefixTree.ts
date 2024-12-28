import { Notes } from "@/types/Notes-type"
import { getAllNotesVelite } from "./getNotesJson";


function levenshtein(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;
  const dp: number[][] = Array(lenA + 1).fill(null).map(() => Array(lenB + 1).fill(0));

  for (let i = 0; i <= lenA; i++) {
    for (let j = 0; j <= lenB; j++) {
      if (i === 0) {
        dp[i][j] = j; 
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, 
          dp[i][j - 1] + 1,  
          dp[i - 1][j - 1] + 1 
        );
      }
    }
  }

  return dp[lenA][lenB];
}





export class PrefixNode {
    children : Map<string,PrefixNode>
    notes: Notes[]
    constructor() {
        this.children = new Map();
        this.notes = [];
      }

}
export class PrefixTree {
    root : PrefixNode;
    constructor(){
        this.root = new PrefixNode();
    }

    _insert(notes:Notes):void {
        let title = notes.title.toLowerCase();
        for (let i = 0; i < title.length; i++) {
            let currentNode = this.root;
            for (let j = i; j < title.length; j++) {
              let char = title[j];
      
              if (!currentNode.children.has(char)) {
                currentNode.children.set(char, new PrefixNode());
              }
              currentNode = currentNode.children.get(char)!;
            }
            currentNode.notes.push(notes)
    }
    for (let tag of notes.tags) {
      this._insertTag(tag.Name, notes);
    }
}

    private _insertTag(tagName: string, note: Notes): void {
      let currentNode = this.root;
      for (let char of tagName.toLowerCase()) {
        if (!currentNode.children.has(char)) {
          currentNode.children.set(char, new PrefixNode());
        }
        currentNode = currentNode.children.get(char)!;
      }

      currentNode.notes.push(note);
    }

    _search(query:string):{ title: string, path: string }[]{
        let currentNode = this.root
        for (let char of query) {
            if (!currentNode.children.has(char)) {
              return []; 
            }
            currentNode = currentNode.children.get(char)!;
          }
          const result =this._collectNotes(currentNode);
          if(result.length===0){
            console.log("fuf")
            return  this._collectNotesWithFuzzySearch(query, this.root);
          }
          return this._collectNotes(currentNode)
           
          
    }
    private _collectNotes(node: PrefixNode): { title: string, path: string }[]{
        let result: { title: string, path: string }[] = [];
    
        for (let note of node.notes) {
          result.push({ title: note.title, path: note.path || '' }); 
        }
    
        for (let child of node.children.values()) {
          result.push(...this._collectNotes(child));
        }
    
        return result;
      }
    
    public _collectNotesWithFuzzySearch(query: string, node: PrefixNode, maxDistance: number = 3): { title: string, path: string,distance :number }[] {
      let result: { title: string, path: string, distance: number }[] = [];
    
      node.notes.forEach((note) => {
        const distance = levenshtein(query, note.title.toLowerCase());

          result.push({ title: note.title, path: note.path || '', distance });
        
      
      });
    
      node.children.forEach((child) => {
        result.push(...this._collectNotesWithFuzzySearch(query, child, maxDistance));
      });
      result.sort((a, b) => a.distance - b.distance);
    
      return result;
    }
  }


let globalPrefixTree: PrefixTree | null = null;

async function initPrefixTree() {
  if (globalPrefixTree === null) {
    globalPrefixTree = new PrefixTree();
    const notes = await getAllNotesVelite();
    if (notes) {
      notes.forEach(note => {
        globalPrefixTree?._insert(note);  
      });
    }
  }
  return globalPrefixTree;
}

function startBackgroundUpdate() {
  setInterval(async () => {
    const notes = await getAllNotesVelite();
    if (notes && globalPrefixTree) {
      globalPrefixTree = new PrefixTree();
      notes.forEach(note => {
        globalPrefixTree?._insert(note);
      });
    }
  }, 60 * 1000);  
}
async function initialize() {
  await initPrefixTree();
  startBackgroundUpdate();
}
initialize();

export { initPrefixTree, globalPrefixTree };

