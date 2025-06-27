"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ImageUpload = ({ onTextExtracted, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error("Image size should be less than 10MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage({
        file,
        preview: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleExtractText = async () => {
    if (!selectedImage) return;

    setIsExtracting(true);
    try {
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: selectedImage.preview
        }),
      });

      const result = await response.json();

      if (result.success) {
        onTextExtracted(result.text);
        toast.success("Text extracted successfully!");
        setSelectedImage(null);
      } else {
        toast.error(result.error || "Failed to extract text");
      }
    } catch (error) {
      console.error("Error extracting text:", error);
      toast.error("Failed to extract text from image");
    } finally {
      setIsExtracting(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileImage className="h-5 w-5 text-gray-600" />
        <span className="text-sm font-medium">Extract Text from Image</span>
      </div>

      {!selectedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver
              ? "border-orange-400 bg-orange-50"
              : "border-gray-300 hover:border-gray-400"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Drag and drop an image here, or click to select
          </p>
          <p className="text-xs text-gray-500">
            Supports JPG, PNG, GIF. Max 10MB.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <img
              src={selectedImage.preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded-lg border"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeImage}
              disabled={isExtracting}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleExtractText}
              disabled={isExtracting || disabled}
              className="flex-1"
            >
              {isExtracting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting Text...
                </>
              ) : (
                "Extract Text"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={removeImage}
              disabled={isExtracting}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 