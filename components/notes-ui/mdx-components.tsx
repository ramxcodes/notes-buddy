import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { TableOfContents } from "./TableOfContents";
import { Callout } from "./callout";
import { UnitPagination } from "./unit-pagination";
import QuizComponent from "./QuizComponent";
import { PdfViewer } from "./PdfViewer"; // Import the new component
import { isPaginationDisabled } from "@/utils/pagination-config";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
  Quiz: QuizComponent,
  PdfViewer, // Add the PDF viewer here
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
      {/* Table of Contents */}
      <TableOfContents code={code} />

      {/* Main Content */}
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
