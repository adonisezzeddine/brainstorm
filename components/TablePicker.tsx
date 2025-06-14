"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TablePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (rows: number, cols: number) => void;
}

export function TablePicker({ open, onOpenChange, onInsert }: TablePickerProps) {
  const [selected, setSelected] = useState({ rows: 0, cols: 0 });
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });
  const maxRows = 10;
  const maxCols = 10;

  useEffect(() => {
    if (open) {
      setSelected({ rows: 0, cols: 0 });
      setHovered({ rows: 0, cols: 0 });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Insert Table</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: maxRows * maxCols }).map((_, index) => {
              const row = Math.floor(index / maxCols);
              const col = index % maxCols;
              const isSelected = row < selected.rows && col < selected.cols;
              const isHovered = row < hovered.rows && col < hovered.cols;

              return (
                <div
                  key={index}
                  className={`h-6 w-6 border border-border ${
                    isSelected
                      ? "bg-primary"
                      : isHovered
                      ? "bg-primary/50"
                      : "bg-background"
                  }`}
                  onMouseEnter={() => setHovered({ rows: row + 1, cols: col + 1 })}
                  onMouseLeave={() => setHovered({ rows: 0, cols: 0 })}
                  onClick={() => {
                    setSelected({ rows: row + 1, cols: col + 1 });
                  }}
                />
              );
            })}
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selected.rows > 0 && selected.cols > 0) {
                  onInsert(selected.rows, selected.cols);
                }
              }}
              disabled={selected.rows === 0 || selected.cols === 0}
            >
              Insert {selected.rows > 0 && selected.cols > 0 ? `${selected.rows}×${selected.cols}` : ""} Table
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 