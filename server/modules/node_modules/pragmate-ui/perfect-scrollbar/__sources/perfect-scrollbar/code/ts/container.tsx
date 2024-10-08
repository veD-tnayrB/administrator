import React, {
  useRef,
  useEffect,
  MutableRefObject,
  HTMLAttributes,
  ReactNode,
} from "react";
import PerfectScrollbar from "perfect-scrollbar";

type props = {
  onScrollY?: any;
  onScrollX?: any;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  children: ReactNode;
};

/**
 * It's a React component that uses the PerfectScrollbar library to create a scrollbar that can be
 * customized with CSS.
 * @param {props} props - props
 * @returns A function that returns a JSX.Element
 */
export /*bundle*/
function ScrollContainer(props: props): JSX.Element {
  const ref: MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect((): (() => void) => {
    const control: HTMLDivElement = ref.current;

    const scrollbar: PerfectScrollbar = new PerfectScrollbar(control, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
    });
    const handleOnScrollY = (event): void => {
      props.onScrollY(event, control, scrollbar);
    };

    const handleOnScrollX = (event): void => {
      props.onScrollY(event, control, scrollbar);
    };
    const { onScrollY, onScrollX } = props;
    if (onScrollY) control.addEventListener("ps-scroll-y", handleOnScrollY);
    if (onScrollX) control.addEventListener("ps-scroll-y", handleOnScrollX);
    return () => {
      scrollbar.destroy();

      if (onScrollY) ref.current.removeEventListener("ps-scroll-y", onScrollY);
      if (onScrollX)
        ref.current.removeEventListener("ps-scroll-y", handleOnScrollX);
    };
  }, []);

  let cls: string = props.className
    ? `beyond-perfect-scrollbar ${props.className}`
    : "beyond-perfect-scrollbar";
  return (
    <div ref={ref} className={cls}>
      {props.children}
    </div>
  );
}
