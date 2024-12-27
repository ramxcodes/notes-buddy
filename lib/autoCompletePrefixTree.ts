import { Notes } from "@/types/Notes-type"

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
        let title = notes.title;
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
}

    _search(query:string):Notes[]{
        let currentNode = this.root
        for (let char of query) {
            if (!currentNode.children.has(char)) {
              return []; 
            }
            currentNode = currentNode.children.get(char)!;
          }
          return this._collectNotes(currentNode)
          
    }
    private _collectNotes(node: PrefixNode): Notes[] {
        let result: Notes[] = [];
    
        result.push(...node.notes);
    
        for (let child of node.children.values()) { //using lower version of js , ts should be set to js 2015 or above
          result.push(...this._collectNotes(child));
        }
    
        return result;
      }
    }
