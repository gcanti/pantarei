declare module 'simple-format-date' {

  declare type Locals = {
    Y: string,
    YY: number,
    M: number,
    MM: string,
    D: number,
    DD: string,
    h: number,
    hh: string,
    m: number,
    mm: string,
    s: number,
    ss: string
  };

  declare type Options = {
    template: string | (locals: Locals) => string
  };

  declare var exports: (date: Date, options?: Options) => string;

}
