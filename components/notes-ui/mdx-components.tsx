import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import { UnitPagination } from "./unit-pagination";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
  Callout,
};

interface MdxProps {
  code: string;
  currentUnit?: number;
  totalUnits?: number;
  slug?: string;
}

export function MDXContent({ code, currentUnit, totalUnits, slug }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div>
      <Component components={components} />
      <UnitPagination
        currentUnit={currentUnit ?? 1}
        totalUnits={totalUnits ?? 1}
        slug={slug ?? ""}
      />
    </div>
  );
}
