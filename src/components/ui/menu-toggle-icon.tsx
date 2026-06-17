import { Menu, X } from "lucide-react";

export function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />;
}
