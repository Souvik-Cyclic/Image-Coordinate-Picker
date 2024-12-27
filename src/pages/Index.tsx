import { ImageCoordinatePicker } from "@/components/ImageCoordinatePicker";

export const Index = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Image Coordinate Picker
          </h1>
          <p className="text-slate-600">
            Upload an image and click to pick coordinates
          </p>
        </header>
        <ImageCoordinatePicker />
      </div>
    </div>
  );
};