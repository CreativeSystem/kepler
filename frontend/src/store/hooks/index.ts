/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, DependencyList } from "react";
import { useDispatch } from "react-redux";

import { bindActionCreators, ActionCreator } from "redux";

export function useAction<A>(action: ActionCreator<A>, deps:DependencyList = []) {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(action, dispatch),
    [action, dispatch, ...deps],
  );
}
