/************
Processor: ts
************/

import * as __beyond_dep_ns_0 from '@beyond-js/react-18-widgets/page';
// controller.ts
declare namespace ns_0 {
  import PageReactWidgetController = __beyond_dep_ns_0.PageReactWidgetController;
  import Page = ns_1.Page;
  export class Controller extends PageReactWidgetController {
    get Widget(): typeof Page;
  }
}


// views\index.tsx
declare namespace ns_1 {
  /// <reference types="react" />
  export function Page(): JSX.Element;
}


export import Controller = ns_0.Controller;
export import Page = ns_1.Page;

export declare const hmr: {on: (event: string, listener: any) => void, off: (event: string, listener: any) => void };