"use client";

import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Coordinate {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
  id: number;
}

export const ImageCoordinatePicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setDimensions({ width: img.width, height: img.height });
        };
        img.src = e.target?.result as string;
        setImage(e.target?.result as string);
        setCoordinates([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round(
      ((e.clientX - rect.left) * dimensions.width) / rect.width
    );
    const y = Math.round(
      ((e.clientY - rect.top) * dimensions.height) / rect.height
    );

    const percentX = Math.round((x / dimensions.width) * 100);
    const percentY = Math.round((y / dimensions.height) * 100);

    const newCoordinate = {
      x,
      y,
      percentX,
      percentY,
      id: Date.now(),
    };

    setCoordinates((prev) => [...prev, newCoordinate]);
  };

  const removeCoordinate = (id: number) => {
    setCoordinates((prev) => prev.filter((coord) => coord.id !== id));
  };

  const clearCoordinates = () => {
    setCoordinates([]);
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-8">
        <label className="block mb-4">
          <span className="sr-only">Choose image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          ref={containerRef}
          className="lg:col-span-2 relative border rounded-lg overflow-hidden bg-slate-50"
        >
          {image ? (
            <>
              <img
                ref={imageRef}
                src={image}
                alt="Uploaded image"
                className="max-w-full h-auto"
                onClick={handleImageClick}
              />
              {coordinates.map((coord, index) => (
                <div
                  key={coord.id}
                  className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center"
                  style={{
                    left: `${coord.percentX}%`,
                    top: `${coord.percentY}%`,
                  }}
                >
                  <div className="absolute w-3 h-3 bg-marker rounded-full" />
                  <div className="absolute w-3 h-3 bg-marker rounded-full animate-ping opacity-75" />
                  <span className="absolute -top-6 bg-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    {index + 1}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="aspect-video flex items-center justify-center text-slate-400">
              Upload an image to start picking coordinates
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Coordinates</h2>
              {coordinates.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCoordinates}
                  className="text-sm"
                >
                  Clear All
                </Button>
              )}
            </div>
            {coordinates.length === 0 ? (
              <p className="text-slate-400 text-sm">
                Click on the image to add coordinates
              </p>
            ) : (
              <ul className="space-y-2">
                {coordinates.map((coord, index) => (
                  <li
                    key={coord.id}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded"
                  >
                    <div>
                      <span className="font-medium text-sm mr-2">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-slate-600">
                        x: {coord.x}, y: {coord.y} ({coord.percentX}%,{" "}
                        {coord.percentY}%)
                      </span>
                    </div>
                    <button
                      onClick={() => removeCoordinate(coord.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {image && dimensions.width > 0 && (
            <div className="p-4 border rounded-lg bg-white">
              <h2 className="text-lg font-semibold mb-2">Image Info</h2>
              <p className="text-sm text-slate-600">
                Dimensions: {dimensions.width}px × {dimensions.height}px
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
