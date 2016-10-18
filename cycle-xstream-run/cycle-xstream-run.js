declare module '@cycle/xstream-run' {
  declare function run<D: {[key: string]: (s: xstream$Stream<any>) => any}>(
    main : (sources: $ObjMap<D, <V>(v: (...rest: Array<any>) => V) => V>) => {[key: $Keys<D>]: xstream$Stream<*>},
    drivers : D
  ): void;
}
