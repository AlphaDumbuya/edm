"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { NewsExt, FileUploadThing } from "@/types/my-types";
import CustomUploadButton from "@/components/shared/CustomUploadButton";
import { Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { deleteImage } from "@/services/client/image-service";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface NewsDialogProps {
  news: NewsExt | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  isNew: boolean;
}

const defaultNewsExt: NewsExt = {
  id: "",
  slug: "",
  title: "",
  content: "",
  author: "",
  published: false,
  coverImage: null,
  createdAt: new Date(),
};

export function NewsDialog({
  news,
  isOpen,
  onClose,
  onSaved,
  isNew,
}: NewsDialogProps) {
  const [formData, setFormData] = useState<NewsExt>(
    news || {
      title: "",
      content: "",
      author: "",
      published: false,
      coverImage: null,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && news) {
      setFormData({
        id: news.id || "",
        slug: news.slug || "",
        title: news.title || "",
        content: news.content || "",
        author: news.author || "",
        published: news.published || false,
        coverImage: news.coverImage || null,
        createdAt: news.createdAt ? new Date(news.createdAt) : new Date(),
      });
    } else if (isOpen && isNew) {
      setFormData({ ...defaultNewsExt });
    }
  }, [news, isOpen, isNew]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContentChange = (htmlContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: htmlContent,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      published: checked,
    }));
  };

  const handleImageUploadComplete = (res: any) => {
    if (res?.[0]) {
      setFormData((prev) => ({
        ...prev,
        coverImage: res[0],
      }));
    }
  };

  const handleImageUploadError = (error: Error) => {
    console.error("Image upload error:", error);
    toast({
      title: "Upload Failed",
      description: error.message || "Failed to upload image",
      variant: "destructive",
    });
  };

  const handleDeleteImage = async () => {
    if (!formData.coverImage?.key) return;

    setIsDeleting(true);
    try {
      const response = await deleteImage(formData.coverImage.key);
      if (!response.success) {
        toast({
          title: "Error",
          description: response.message || "Failed to delete image",
          variant: "destructive",
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        coverImage: null,
      }));

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete image",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const endpoint = isNew
        ? "/api/admin/news"
        : `/api/admin/news/${news?.id}`;

      const method = isNew ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save news");
      }

      toast({
        title: "Success",
        description: isNew
          ? "News article created successfully"
          : "News article updated successfully",
      });
      onSaved();
    } catch (error: any) {
      console.error("Error saving news:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save news article",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isNew ? "Create New Article" : "Edit Article"}
          </DialogTitle>
          <DialogDescription>
            {isNew
              ? "Create a new news article for your platform."
              : "Update the news article details."}
          </DialogDescription>
        </DialogHeader>

        <div className=" pr-1 max-h-[calc(90vh-10rem)]">
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter article title"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className={errors.author ? "border-destructive" : ""}
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="border rounded-md p-4">
                {formData.coverImage ? (
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-muted">
                      <Image
                        src={formData.coverImage.url}
                        alt="Cover image"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        {formData.coverImage?.name ||
                          formData.coverImage?.url ||
                          "No file name"}
                      </p>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteImage}
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        {isDeleting ? "Removing..." : "Remove"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4 space-y-3">
                    <div className="bg-muted rounded-full p-3">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col items-center space-y-1 text-center">
                      <p className="text-sm font-medium">No image uploaded</p>
                      <p className="text-xs text-muted-foreground">
                        Upload a cover image for the news article
                      </p>
                    </div>
                    <CustomUploadButton
                      onClientUploadComplete={handleImageUploadComplete}
                      onUploadError={handleImageUploadError}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor
                content={formData.content}
                onChange={handleContentChange}
                placeholder="Write your news article content here..."
                className={errors.content ? "border-destructive" : ""}
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="published">Published</Label>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={handleSwitchChange}
              />
            </div>

            <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto"
              >
                {isSaving ? "Saving..." : isNew ? "Create" : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
