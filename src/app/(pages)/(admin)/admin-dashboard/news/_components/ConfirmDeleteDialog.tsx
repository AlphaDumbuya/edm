"use client";

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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { NewsExt } from "@/types/my-types";

interface ConfirmDeleteDialogProps {
  news: NewsExt | null;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function ConfirmDeleteDialog({
  news,
  isOpen,
  onClose,
  onDeleted,
}: ConfirmDeleteDialogProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!news) {
    return null;
  }

  const handleDelete = async () => {
    if (!news?.id) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/news/${news.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete news article");
      }

      toast({
        title: "Article Deleted",
        description: "The news article has been successfully deleted.",
      });
      onDeleted();
    } catch (error: any) {
      console.error("Error deleting news:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete news article",
        variant: "destructive",
      });
      onClose();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the news article titled{" "}
            <strong>"{news.title}"</strong>. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Article"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}