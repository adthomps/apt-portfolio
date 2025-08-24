import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";

export function CommentButtonModal({ slug }: { slug: string }) {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [count, setCount] = useState(() => {
      try {
        const raw = localStorage.getItem(`comments:${slug}`);
        return raw ? JSON.parse(raw).length : 0;
      } catch {
        return 0;
      }
    });
    const handleAdd = () => {
      if (!input.trim()) return;
      try {
        const raw = localStorage.getItem(`comments:${slug}`);
        const arr = raw ? JSON.parse(raw) : [];
        arr.push(input.trim());
        localStorage.setItem(`comments:${slug}`, JSON.stringify(arr));
        setCount(arr.length);
        setInput("");
        setOpen(false);
      } catch {
        // no-op
      }
    };
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)} aria-label="Leave a comment">
          <MessageCircle className="mr-2 h-4 w-4" />
          Comment{count ? ` (${count})` : ""}
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md w-full">
            <DialogTitle asChild>
              <h4 className="text-lg font-bold mb-2">Leave a Comment</h4>
            </DialogTitle>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm mb-4 bg-muted text-foreground placeholder:text-muted-foreground resize-y"
              placeholder="Add your comment..."
              style={{ backgroundColor: "#f3f4f6", color: "#222", minWidth: '0', maxWidth: '100%' }}
              rows={3}
              maxLength={1000}
            />
            <div className="flex gap-2 justify-end">
              <Button size="sm" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button size="sm" variant="default" onClick={handleAdd}>Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
