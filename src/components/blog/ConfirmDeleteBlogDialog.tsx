import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../../hooks/use-toast";

interface ConfirmDeleteBlogDialogProps {
  blogId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
  userId: string | null;
}

export function ConfirmDeleteBlogDialog({
  blogId,
  isOpen,
  onClose,
  onDeleted,
  userId,
}: ConfirmDeleteBlogDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!blogId || !userId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${blogId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (!res.ok) {
        const error = await res.json();
        toast({
          title: "Error",
          description: error.error || "Failed to delete blog post.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
        variant: "default",
      });
      onDeleted();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this blog post? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex flex-row gap-2 justify-end flex-wrap sm:flex-nowrap">
            <AlertDialogCancel onClick={onClose} className="min-w-max">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white min-w-max"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Blog"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
