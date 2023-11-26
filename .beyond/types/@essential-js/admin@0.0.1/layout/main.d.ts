/************
Processor: ts
************/

import * as __beyond_dep_ns_0 from '@beyond-js/react-18-widgets/base';
import * as __beyond_dep_ns_1 from 'react';
// controller.ts
declare namespace ns_0 {
  import ReactWidgetController = __beyond_dep_ns_0.ReactWidgetController;
  import Layout = ns_1.Layout;
  export class Controller extends ReactWidgetController {
    get Widget(): typeof Layout;
  }
}


// views\index.tsx
declare namespace ns_1 {
  import React = __beyond_dep_ns_1;
  global {
    namespace JSX {
      interface IntrinsicElements {
        'beyond-layout-children': any;
      }
    }
  }
  export function Layout(): React.JSX.Element;
}


export import Controller = ns_0.Controller;

export declare const hmr: {on: (event: string, listener: any) => void, off: (event: string, listener: any) => void };