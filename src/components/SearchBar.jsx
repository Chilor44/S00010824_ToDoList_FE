export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      className="w-full md:w-80 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
