import type { Dispatch, Store } from 'redux'

declare module 'react-redux' {

  /*

    S = State
    A = Action
    OP = OwnProps
    SP = StateProps
    DP = DispatchProps

  */

  declare type MapStateToProps<S, OP, SP: Object> = (state: S, ownProps: OP) => SP | MapStateToProps<S, OP, SP>;

  declare type MapDispatchToProps<S, A, OP, DP> = (dispatch: Dispatch<S, A>, ownProps: OP) => DP;

  declare type MergeProps<SP, DP, OP, P> = (stateProps: SP, dispatchProps: DP, ownProps: OP) => P;

  declare type StatelessComponent<P> = (props: P) => ?React$Element<any>;

  declare class ConnectedComponent<OP, P, Def, St> extends React$Component<Def, OP, St> {
    static WrappedComponent: any;
    getWrappedInstance(): any;
    static defaultProps: Def;
    props: OP;
    state: St;
  }

  declare type ConnectedComponentClass<OP, P, Def, St> = Class<ConnectedComponent<OP, P, Def, St>>;

  declare type Connector<OP, P> = {
    (component: StatelessComponent<P>): ConnectedComponentClass<OP, P, void, void>;
    <Def, St>(component: Class<React$Component<Def, P, St>>): ConnectedComponentClass<OP, P, Def, St>;
  };

  declare class Provider<S, A> extends React$Component<void, { store: Store<S, A>, children?: any }, void> { }

  declare type ConnectOptions = {
    pure?: boolean,
    withRef?: boolean
  };

  declare function connect<S, A>(
    options?: ConnectOptions
  ): Connector<{}, { dispatch: Dispatch<S, A> }>;

  declare function connect<S, A, OP, SP>(
    mapStateToProps: MapStateToProps<S, OP, SP>,
    options?: ConnectOptions
  ): Connector<OP, SP & { dispatch: Dispatch<S, A> }>;

  declare function connect<S, A, OP, DP>(
    mapStateToProps: null,
    mapDispatchToProps: MapDispatchToProps<S, A, OP, DP>,
    options?: ConnectOptions
  ): Connector<OP, { dispatch: Dispatch<S, A> }>;

  declare function connect<S, A, OP, SP, DP>(
    mapStateToProps: MapStateToProps<S, OP, SP>,
    mapDispatchToProps: MapDispatchToProps<S, A, OP, DP>,
    options?: ConnectOptions
  ): Connector<OP, SP & DP>;

  declare function connect<S, A, OP, SP, DP, P>(
    mapStateToProps: MapStateToProps<S, OP, SP>,
    mapDispatchToProps: MapDispatchToProps<S, A, OP, DP>,
    mergeProps: MergeProps<SP, DP, OP, P>,
    options?: ConnectOptions
  ): Connector<OP, P>;

}
