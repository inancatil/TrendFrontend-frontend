import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T {
  const ref: any = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Changes specials charecters such as
 * @("\&nbsp;", " ")
 * @("\<br>", "\n")
 * @("\&lt;", "<")
 * @("\&gt;", ">")
 * @param code
 */
export const prismFormat = (code: string): string => {
  const x = code
    .replaceAll("&nbsp;", " ")
    .replaceAll("<br>", "\n")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
  return x;
};
