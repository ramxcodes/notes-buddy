import { Notes, Tag } from "@/types/Notes-type";
import fs from "fs";
import path from "path";
const initPath = "/content/notes";

const _createNote = (
  title: string,
  tags: Array<Tag>,
  desc: string | undefined,
  invisibleTags?: Array<Tag>,
  parentGroup?: string,
  path?: string,
  body?: string
): Notes => {
  return {
    title,
    tags,
    desc,
    invisibleTags,
    parentGroup,
    path,
    body,
  };
};

const _createTag = (name: string): Tag => {
  return {
    Name: name,
  };
};

export const getAllNotesFileSyncFileSync = async () => {
  let Notes: Array<Notes> = [];
  const dirPath = path.join(process.cwd(), initPath);

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

  try {
    const Notepaths = _recursion(dirPath);
    if (Notepaths.length > 0) {
      Notepaths?.forEach((e) => {
        let n: Array<Tag> = [];
        let tags = e
          .replace(new RegExp(process.cwd() + initPath, "gi"), "")
          ?.split("/");
        tags.forEach((tagname) => {
          n.push(_createTag(tagname));
        });
        const newNote = _createNote(tags[tags.length - 1], n, "sample");
        Notes.push(newNote);
      });
      return Notes;
    }
  } catch (e) {
    return [];
  }
};

export const getAllNotesVelite = async () => {
  const { posts } = await import("@/.velite");
  let Notes: Array<Notes> = [];

  posts?.forEach((e, index) => {
    let Tags: Array<Tag> = [];
    e?.tags?.forEach((tag) => {
      Tags.push(_createTag(tag));
    });
    const newNote = _createNote(
      e.title,
      Tags,
      e.description,
      undefined,
      undefined,
      e.slug,
      e.body
    );
    Notes.push(newNote);
  });
  return Notes;
};
