import t from 'tcomb';
import type { Type } from 'tcomb';

declare module 'tcomb-react' {

  declare type Options = {
    strict?: boolean
  };

  declare var exports: {
    props: Function;
    propTypes(type: Type, options?: Options): any;
    ReactElement: Type;
    ReactNode: Type;
    ReactChild: Type;
    ReactChildren: Type;
    t: typeof t;
  };
}