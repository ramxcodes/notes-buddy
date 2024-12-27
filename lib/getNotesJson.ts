
import { Notes, Tag } from "@/types/Notes-type";
import { dir } from "console";
import fs from "fs";
import path from "path";
const initPath = "/content/notes"


const _createNote = (title: string, tags: Array<Tag>, desc: string, invisibleTags?: Array<Tag>, parentGroup?: string, path?: string): Notes => {
    return {
      title,
      tags,
      desc,
      invisibleTags,
      parentGroup,
      path
    };
  };

const _createTag =(name:string):Tag =>{
    return{
        Name:name
    }
}
export const getAllNotes = async() =>{
    let Notes:Array<Notes> = []
    const dirPath = path.join(process.cwd(),initPath );

    function _recursion(currentPath: string, result: string[] = []): string[] {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
          const entryPath = path.join(currentPath, entry.name);

          if (entry.isDirectory()) {

            _recursion(entryPath, result);

          } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
            result.push(entryPath);
          }
        }
        return result;
      }

    try{
        const Notepaths = _recursion(dirPath);
        if(Notepaths.length >0){

            Notepaths?.forEach((e)=>{
                let n:Array<Tag> = [];
                let tags = e.replace(new RegExp(process.cwd()+initPath,"gi"),'')?.split("/");
                tags.forEach((tagname)=>{
                    n.push(_createTag(tagname))
                })
                const newNote = _createNote(tags[tags.length-1],n,"sample")
                Notes.push(newNote);
            })
            return Notes
    }
   
    }
    catch(e){
        //console.log(e)   
    }
}

const getDir = async (dir:string) =>{
    const f = await fs.readdirSync(dir);
    return f
}

