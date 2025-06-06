declare module 'react-quill' {
  import * as React from 'react';

  interface ReactQuillProps {
    value: string;
    onChange?: (html: string) => void;
    theme?: string;
    bounds?: string | HTMLElement;
    modules?: {
      [key: string]: any;
      formula?: boolean;
      syntax?: boolean;
      sanitize?: boolean;
      history?: { delay?: number; maxStack?: number; userOnly?: boolean };
      imageResize?: {}; // You might want to define a more specific type for imageResize
      toolbar?: (string | string[] | { [key: string]: any })[];
      [key: string]: any;
    };    readOnly?: boolean; // Added readOnly property
    // Add other commonly used props if needed
    className?: string;
  }

  interface ReactQuill extends React.ComponentClass<ReactQuillProps> {
    getEditor: () => any; // Return type might be more specific
    focus: () => void;
  }

  class ReactQuill extends React.Component<ReactQuillProps> {}
  export default ReactQuill;
}