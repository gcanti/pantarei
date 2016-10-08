declare interface Tcomb$Type<T> {
  displayName: string;
  (x: T): T;
  is(x: any): boolean;
  fromJSON?: (value: any) => T;
}

declare module 'tcomb' {

  // runtime type introspection hack
  declare type $Reify<T> = TypeT<T>;

  // refinement hack
  declare type Predicate = (x: any) => boolean;

  declare type $Refinement<P: Predicate> = {};

  declare type IntegerT = number;

  declare interface TypeT<T> extends Tcomb$Type<T> {}

  declare interface Irreducible<T> extends TypeT<T> {
    meta: {
      kind: 'irreducible',
      name: string,
      predicate: Predicate,
      identity: true
    };
  }

  declare interface Interface<P> extends TypeT<$ObjMap<P, <V>(v : TypeT<V>) => V>> {
    meta: {
      kind: 'interface',
      props: P,
      name: ?string,
      identity: boolean,
      strict: false
    };
    // extend<P2>(props: P2): Interface<P & P2>
  }

  declare interface InterfaceStrict<P> extends TypeT<$Exact<$ObjMap<P, <V>(v : TypeT<V>) => V>>> {
    meta: {
      kind: 'interface',
      props: P,
      name: ?string,
      identity: boolean,
      strict: true
    };
    // extend<P2>(props: P2): Interface<P & P2>
  }

  declare type InterfaceFunction = {
    <P>(props: P, options?: { name?: string, strict?: false }): Interface<P>;
    <P>(props: P, options?: { name?: string, strict: true }): InterfaceStrict<P>;
  };

  declare interface Struct<P> extends TypeT<$ObjMap<P, <V>(v : TypeT<V>) => V>> {
    meta: {
      kind: 'struct',
      props: P,
      name: ?string,
      identity: boolean,
      strict: false
    };
    // extend<P2>(props: P2): Struct<P & P2>
  }

  declare interface StructStrict<P> extends TypeT<$Exact<$ObjMap<P, <V>(v : TypeT<V>) => V>>> {
    meta: {
      kind: 'struct',
      props: P,
      name: ?string,
      identity: boolean,
      strict: true
    };
    // extend<P2>(props: P2): Struct<P & P2>
  }

  declare type StructFunction = {
    <P>(props: P, options?: { name?: string, strict?: false }): Struct<P>;
    <P>(props: P, options?: { name?: string, strict: true }): StructStrict<P>;
  };

  declare type RefinementFunction = <A, TA: TypeT<A>>(type: TA, predicate: (x: A) => boolean) => TA;

  declare interface Enums<E> extends TypeT<$Keys<E>> {
    meta: {
      kind: 'enums',
      map: E,
      name: ?string,
      identity: boolean
    };
  }

  declare interface EnumsFunction {
    <E: {[key: string]: string | number}>(map: E, name?: string): Enums<E>;
    of<K>(enums: Array<K>, name?: string): Enums<{[key: K]: string | number}>;
  }

  declare interface Maybe<S, T> extends TypeT<?T> {
    meta: {
      kind: 'maybe',
      type: S,
      name: ?string,
      identity: boolean
    };
  }

  declare interface MaybeFunction {
    <A, TA: TypeT<A>>(type: TA, name?: string): Maybe<TA, A>;
  }

  declare interface Tuple<TS, T> extends TypeT<T> {
    meta: {
      kind: 'tuple',
      types: TS,
      name: ?string,
      identity: boolean
    };
  }

  declare interface TupleFunction {
    <A, B, TA: TypeT<A>, TB: TypeT<B>, TS: [TA, TB]>(types: TS, name?: string): Tuple<TS, [A, B]>;
    <A, B, C, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TS: [TA, TB, TC]>(types: TS, name?: string): Tuple<TS, [A, B, C]>;
    <A, B, C, D, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TD: TypeT<D>, TS: [TA, TB, TC, TD]>(types: TS, name?: string): Tuple<TS, [A, B, C, D]>;
  }

  declare interface List<L, T> extends TypeT<Array<T>> {
    meta: {
      kind: 'list',
      type: L,
      name: ?string,
      identity: boolean
    };
  }

  declare interface ListFunction {
    <A, TA: TypeT<A>>(type: TA, name?: string): List<TA, A>;
  }

  declare interface Dict<TD, TC, D, C> extends TypeT<{[key: D]: C}> {
    meta: {
      kind: 'dict',
      domain: TD,
      codomain: TC,
      name: ?string,
      identity: boolean
    };
  }

  declare interface DictFunction {
    <D, C, TD: TypeT<D>, TC: TypeT<C>>(domain: TD, codomain: TC, name?: string): Dict<TD, TC, D, C>;
  }

  declare interface Union<TS, T> extends TypeT<T> {
    dispatch(x: any): TypeT<*>;
    meta: {
      kind: 'union',
      types: TS,
      name: ?string,
      identity: boolean
    };
  }

  // Flow bug: this doesn't type check
  // declare interface UnionFunction {
  //   <A, B, TA: TypeT<A>, TB: TypeT<B>, TS: [TA, TB]>(types: TS, name?: string): Union<TS, A | B>;
  //   <A, B, C, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TS: [TA, TB, TC]>(types: TS, name?: string): Union<TS, A | B | C>;
  //   <A, B, C, D, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TD: TypeT<D>, TS: [TA, TB, TC, TD]>(types: TS, name?: string): Union<TS, A | B | C | D>;
  // }

  declare interface UnionFunction {
    <A, B, TA: TypeT<A>, TB: TypeT<B>, TS: [TA, TB]>(types: TS, name?: string): Union<TS, any>;
    <A, B, C, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TS: [TA, TB, TC]>(types: TS, name?: string): Union<TS, any>;
    <A, B, C, D, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TD: TypeT<D>, TS: [TA, TB, TC, TD]>(types: TS, name?: string): Union<TS, any>;
  }

  declare interface Intersection<TS, T> extends TypeT<T> {
    meta: {
      kind: 'intersection',
      types: TS,
      name: ?string,
      identity: boolean
    };
  }

  declare interface IntersectionFunction {
    <A, B, TA: TypeT<A>, TB: TypeT<B>, TS: [TA, TB]>(types: TS, name?: string): Union<TS, A & B>;
    <A, B, C, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TS: [TA, TB, TC]>(types: TS, name?: string): Union<TS, A & B & C>;
    <A, B, C, D, TA: TypeT<A>, TB: TypeT<B>, TC: TypeT<C>, TD: TypeT<D>, TS: [TA, TB, TC, TD]>(types: TS, name?: string): Union<TS, A & B & C & D>;
  }

  declare interface Declare<T> extends TypeT<T> {
    define<TA: TypeT<T>>(type: TA): void
  }

  declare type DeclareFunction = (name: string) => Declare<*>;

  declare type Command
    = CommandSet
    | CommandApply
    | CommandPush
    | CommandRemove
    | CommandSplice
    | CommandSwap
    | CommandUnshift
    | CommandMerge
    | OptionsUpdate;
  declare type CommandSet = { $set: any };
  declare type CommandApply = { $apply: Function; };
  declare type CommandPush = { $push: Array<any>; };
  declare type CommandRemove = { $remove: Array<string>; };
  declare type CommandSplice = { $splice: Array<Array<any>>; };
  declare type CommandSwap = { $swap: { from: number; to: number; }; };
  declare type CommandUnshift = { $unshift: Array<any>; };
  declare type CommandMerge = { $merge: Object; };
  declare type OptionsUpdate = {[key: string]: Command};

  declare var exports: {

    // irreducibles
    Nil: Irreducible<void | null>;
    String: Irreducible<string>;
    Number: Irreducible<number>;
    Integer: Irreducible<number>;
    Boolean: Irreducible<boolean>;
    Array: Irreducible<Array<any>>;
    Object: Irreducible<Object>;
    Function: Irreducible<Function>;
    Error: Irreducible<Error>;
    RegExp: Irreducible<RegExp>;
    Date: Irreducible<Date>;
    Any: Irreducible<any>;
    Type: Irreducible<TypeT<*>>;

    irreducible<T>(name: string, predicate: Predicate): Irreducible<T>;

    refinement: RefinementFunction;
    subtype: RefinementFunction;

    enums: EnumsFunction;

    maybe: MaybeFunction;

    interface: InterfaceFunction;
    inter: InterfaceFunction;

    struct: StructFunction;

    tuple: TupleFunction;

    list: ListFunction;

    dict: DictFunction;

    union: UnionFunction;

    intersection: IntersectionFunction;

    declare: DeclareFunction;

    assert(guard: boolean, message?: string | () => string): void;
    fail(message?: string): void;
    stringify(x: any): string;
    update<T>(instance: T, options: OptionsUpdate): T;
    mixin<A: Object, B: Object>(target: A, source: B, unsafe?: boolean): A & B;
    isType(x: any): boolean;
    is<A>(x: any, type: TypeT<A>): boolean;
    getTypeName<A>(type: TypeT<A>): string;
    match(x: any, ...cases: Array<any>): any;

  };

}

declare module 'tcomb/lib/fromJSON' {
  declare module.exports: <A, TA: Tcomb$Type<A>>(value: any, type: TA) => A;
}

declare module 'tcomb/lib/isSubsetOf' {
  declare module.exports: <A, B, TA: Tcomb$Type<A>, TB: Tcomb$Type<B>>(a: TA, b: TB) => boolean;
}
