"use client";

import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RichTextEditor({ className }: { className?: string }) {
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className={cn("border rounded-md p-3 min-h-[150px]", className)}>
      <Slate editor={editor} initialValue={[{ children: [{ text: "" }] } as Descendant]}>
        <Editable
          className="focus:outline-none"
          placeholder="Write something..."
          renderLeaf={({ attributes, children }) => <span {...attributes}>{children}</span>}
        />
      </Slate>
    </div>
  );
}
