type NotesFilePath = {
  fullPath: string;
  isAbsolute: boolean;
  extension: "mdx" | "txt";
};

interface Notes {
  title: string;
  tags: Array<Tag>;
  invisibleTags?: Array<Tag>;
  desc: string | undefined;
  parentGroup?: string;
  path?: string;
  body?: string;
}

interface Tag {
  Name: string;
  TagGroup?: string;
}

export type { NotesFilePath, Notes, Tag };
