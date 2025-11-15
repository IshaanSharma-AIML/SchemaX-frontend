// Utility function for merging Tailwind CSS classes
// Combines clsx and tailwind-merge to handle conditional classes and resolve conflicts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
