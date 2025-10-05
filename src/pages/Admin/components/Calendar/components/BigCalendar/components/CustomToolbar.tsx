import type { ToolbarProps } from "react-big-calendar";
import type { EventType } from "../types/EventType";

export const CustomToolbar = ({ label, onNavigate, onView }: ToolbarProps<EventType, object>) => {
  return (
    <div className="flex items-center justify-between mb-4 bg-blue-50 p-3 rounded-lg shadow-sm">
      {/* Lewa strona: przyciski nawigacji */}
      <div className="flex gap-2">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 duration-200 cursor-pointer"
        >
          ◀
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 duration-200 cursor-pointer"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-3 py-1 bg-gray-200  rounded hover:bg-gray-300 duration-200 cursor-pointer"
        >
          ▶
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-800">
        {label} {new Date().getFullYear()}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onView("month")}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 duration-200 cursor-pointer"
        >
          Month
        </button>
        <button
          onClick={() => onView("week")}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 duration-200 cursor-pointer"
        >
          Week
        </button>
        <button
          onClick={() => onView("day")}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-200 duration-200 cursor-pointer"
        >
          Day
        </button>
      </div>
    </div>
  );
};
