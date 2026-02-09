import { useState } from "react";
import { ChevronDown, Package } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-screen w-56 bg-yellow-600 text-black p-3 inter">
      {/* Menu Header */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between text-[13px] w-full mt-5 text-sm text-black font-[600] mb-3"
      >
        <span>Menu</span>
        <ChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
          size={16}
        />
      </button>

      {/* Menu Items */}
      {open && (
        <div className="space-y-2">
          <button className="flex items-center gap-2 bg-[#E1E1E1] rounded-md px-3 py-1 w-full text-sm shadow">
            <Package size={16} />
            My Products
          </button>
        </div>
      )}
    </div>
  );
}
