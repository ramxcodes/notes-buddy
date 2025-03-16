import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { UnitPagination } from "./unit-pagination";
import { isPaginationDisabled } from "@/utils/pagination-config";
import { TableOfContents } from "./TableOfContents";
import dynamic from "next/dynamic";
import { PdfViewer } from "./PdfViewer";
import Picture from "./Picture";
import Query from "./Query";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const defaultComponents = {
  Picture,
  Callout,
  PdfViewer,
  Query,
  Quiz: dynamic(() => import("./QuizComponent"), { ssr: false }),
  Flashcard: dynamic(() => import("./Flashcard"), { ssr: false }),
};

interface MdxProps {
  code: string;
  currentUnit?: number;
  totalUnits?: number;
  slug: string;
  components?: Record<string, any>;
}

export function MDXContent({
  code,
  currentUnit,
  totalUnits,
  slug,
  components: customComponents,
}: MdxProps) {
  const Component = useMDXComponent(code);
  const showUnitPagination = !isPaginationDisabled(slug);
  const mergedComponents = { ...defaultComponents, ...customComponents };

  return (
    <div>
      <TableOfContents code={code} />
      <Component components={mergedComponents} />
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
