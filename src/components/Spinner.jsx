export default function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      </div>
    </div>
  );
}
