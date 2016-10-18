import type { MiddlewareAPI, Dispatch } from 'redux'

declare module 'redux-thunk' {

  declare module.exports: <S, A>(api: MiddlewareAPI<S, A>) => (next: Dispatch<A>) => Dispatch<A>;

}
