import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { UnitPagination } from "./unit-pagination";
import { isPaginationDisabled } from "@/utils/pagination-config";
import { TableOfContents } from "./TableOfContents";
import dynamic from "next/dynamic";
import { PdfViewer } from "./PdfViewer";
import Picture from "./Picture";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Picture,
  Callout,
  PdfViewer,
  Quiz: dynamic(() => import("./QuizComponent"), { ssr: false }),
  Flashcard: dynamic(() => import("./Flashcard"), { ssr: false }),
};

interface MdxProps {
  code: string;
  currentUnit?: number;
  totalUnits?: number;
  slug: string;
}

export function MDXContent({ code, currentUnit, totalUnits, slug }: MdxProps) {
  const Component = useMDXComponent(code);
  const showUnitPagination = !isPaginationDisabled(slug);

  return (
    <div>
      <TableOfContents code={code} />
      <Component components={components} />
      {showUnitPagination && currentUnit && totalUnits ? (
        <UnitPagination
          currentUnit={currentUnit}
          totalUnits={totalUnits}
          slug={slug}
        />
      ) : null}
    </div>
  );
}
