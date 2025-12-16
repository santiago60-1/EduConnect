"use client";

import { logout } from "@/app/lib/api";

export function LogoutButton() {
  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}
