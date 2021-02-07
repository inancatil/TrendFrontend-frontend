import moment from "moment";
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
 * Trims end of every newline.
 *
 * Changes specials charecters such as:
 *
 *-    ("\&nbsp;", " ")
 *-    ("\<br>", "\n")
 *-   ("\&lt;", "<")
 *-    ("\&gt;", ">")
 *-    ("\&amp;", "&")
 *
 * @param {code} code in string format
 */

export const prismFormat = (code: string): string => {
  const x = code
    .replaceAll("&amp;", "&")
    .replaceAll("&nbsp;", " ")
    .replaceAll("<br>", "\n")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");

  // trim whitespaces in every newline ends
  const trimedEnds = x
    .split("\n")
    .map((x) => x.trimEnd())
    .join("\n");
  // console.log(trimedEnds);
  return trimedEnds;
};

/**
 * Compares given inputs for sorting inside sort() method.
 *- Inputs must be same type.
 */
export function compare(
  a: string | number | Date,
  b: string | number | Date,
  isAsc: boolean
) {
  if (moment.isDate(a)) {
    const x = moment(a);
    const y = moment(b);
    return isAsc ? x.diff(y) : y.diff(x);
  } else {
    //string and number comparison
    const bandA =
      a === undefined ? "" : typeof a === "string" ? a.toUpperCase() : a;
    const bandB =
      b === undefined ? "" : typeof b === "string" ? b.toUpperCase() : b;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    if (isAsc) return comparison;
    else return comparison * -1;
  }
}

/**
 * Smooth scroll to top.
 * @param delay delay animation
 * @param animDuration increase animSpeed to slow animation. Min is 1.
 */
export const smoothScrollToTop = (
  _delay?: number,
  _animDuration?: number
): void => {
  const delay = _delay ? _delay : 0;
  const duration = _animDuration ? _animDuration : 8;
  let prevC = 99999; // To end scroll animation when user scroll down before reaching top
  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0 && c <= prevC) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / duration);
      prevC = c;
    }
  };
  setTimeout(() => {
    scrollToTop();
  }, delay);
};

/**
 * Conditional component rendering.
 */
export function IF({ children, condition }) {
  if (condition) {
    // render children if the condition is truthy
    return children;
  }
  return null;
}
