import { removeTailwindClasses } from "./tools";

let test = [
  "block p-2 px-4 bg-white border-l border-r border-transparent",
  // "border border-b-0 rounded-t-md border-gray-200 rounded rounded-sm flex flex-row flex-row-reverse font pf pasd pf-pgg bg-blue-500-user border-4 rounded-t rounded-t-sm border-t-2 border-t-8 overflow-auto overflow-hidden overflow-p overflow-x-auto overflow-x-hidden overflow-x-p overflow-y-auto overflow-y-hidden flex-row flex-row-reverse flex-col flex-wrap flex-wrap-reverse flex-nowrap inline-block inline-flex inline-flex-p inline-p inline table table-column-group table-caption table-cell table-column table-footer table-footer-group table-footer-p table-footer-group-p bg-blue inline inline-block inline-p-block inline-block-p flex-wrap flex-wrap-reverse flex-nowrap flex-1 flex-auto flex-initial flex-1-p border-opacity border-opacity-50",
  // props.classTab,
  // props.classActive,
  // "opacity opacity-50",
  // "shadow shadow-md shadow-md-p",
  // "float float-left",
  // "flex-grow flex-grow-0",
  // "order-1 order-none",
  // "justify-start justify-end justify-items-auto justify-items justify-self-auto",
  // "content-start items-start",
  // "p p-5 p-6 px-5 py-6 -p-5 pt-5 pb-2",
  // "",
  // "m m-5 m-6 mx-5 my-6 -m-5 -mt-5 group-hover:bg-blue-800 mt-5 mb-2 hover:bg-blue-500 group-hover:bg-blue-500",
  // "top top-4 top-1/2 -inset-y-4 bottom-3/4 bottom-2 inset-x-2 inset-x inset-y-1/2 inset-x-5 inset-y-1/4 -inset-y-3/4 -inset-x-1/2 inset-4 inset-1/2 -inset-4 -inset-1/2",
  // "hover:border border",
  // "ring-opacity-50 ring-blue-500 ring-2 ring ring-offset-2 ring-offset ring-offset-blue-500",
  // "uppercase cursor-auto cursor-pointer cursor-not-allowed",
  // "text-left text-center text-opacity-50 line-through overflow-ellipsis bg-opacity bg-opacity-50",
  "grid grid-cols grid-cols-5 grid-cols-20",
  "place-content-start place-self-auto place-items-start italic not-italic",
  "tracking tracking-normal",
  "bg-clip bg-clip-text",
  "bg-center bg-left bg-left-bottom bg-left-bottom-2 bg-right-top",
  "table-auto table-fixed",
  "pointer-events pointer-events-auto",
  "resize resize-x",
  "space-x-2 space-x space-x-4",
  "space-y-2 space-y space-y-4",
  "-space-x-2 -space-x -space-x-4",
  "align align-top align-text align-text-top",
  "gap-0 gap-px gap",
  "gap-x-0 gap-x-px gap-x",
  "gap-y-0 gap-y-px gap-y",
  "w w-2 w-px",
  "overscroll-auto overscroll overscroll-x overscroll-x-auto",
];

export function testTailwindRemoveClasses() {
  let classList = test.flatMap((i) => i.split(" "));
  classList = removeTailwindClasses(classList, true);

  console.log(classList);
}
