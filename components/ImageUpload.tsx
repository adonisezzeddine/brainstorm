"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
}

const ImageUpload = ({
  onImageUpload,
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.size > maxSize) {
        toast.error(`File size must be less than ${maxSize / 1024 / 1024}MB`);
        return;
      }

      if (!acceptedTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload an image.");
        return;
      }

      try {
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onImageUpload(file);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSize, acceptedTypes, onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  });

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={clearPreview}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <div className="animate-spin">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
            ) : (
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            )}
            <div className="text-sm text-muted-foreground">
              {isDragActive ? (
                <p>Drop the image here</p>
              ) : (
                <p>
                  Drag and drop an image here, or click to select
                  <br />
                  <span className="text-xs">
                    (Max size: {maxSize / 1024 / 1024}MB)
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 