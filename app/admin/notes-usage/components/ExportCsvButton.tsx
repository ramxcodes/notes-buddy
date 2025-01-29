"use client";

import { Button } from "@/components/ui/button";

interface ExportCsvButtonProps {
  onExportCSV: () => void;
}

export function ExportCsvButton({ onExportCSV }: ExportCsvButtonProps) {
  return (
    <div className="mb-4">
      <Button onClick={onExportCSV} variant="outline">
        Export CSV
      </Button>
    </div>
  );
}
