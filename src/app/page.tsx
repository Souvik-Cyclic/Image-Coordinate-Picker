import { ImageCoordinatePicker } from "@/components/ImageCoordinatePicker";

export default function Home() {
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
      <footer className="mt-8 text-center text-sm text-slate-500">
        <p>Made with ❤️ by Souvik</p>
      </footer>
    </div>
  );
}
