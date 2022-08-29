import { createSlice, configureStore } from "@reduxjs/toolkit";

import type { AnyAction, PayloadAction, ThunkAction } from "@reduxjs/toolkit";

type Color = {
  name: string;
};

type Shape = {
  name: string;
  sides: number;
};

const ShapesAPI = {
  getAll: () => {
    return Promise.resolve([
      { name: "Square", sides: 4 },
      { name: "Triangle", sides: 3 },
    ]);
  },
};

const { reducer: colorReducer } = createSlice({
  name: "colors",
  initialState: [] as Color[],
  reducers: {
    setColors: (state, { payload }: PayloadAction<Color[]>) => {
      return payload;
    },
  },
});

const { reducer: shapeReducer, actions: shapeActions } = createSlice({
  name: "shapes",
  initialState: [] as Shape[],
  reducers: {
    setShapes: (state, { payload }: PayloadAction<Shape[]>) => {
      return payload;
    },
  },
});

const bothStore = configureStore({
  reducer: { colors: colorReducer, shapes: shapeReducer },
});
type BothRootState = ReturnType<typeof bothStore.getState>;
type AppDispatch = typeof bothStore.dispatch;

const shapeStore = configureStore({ reducer: { shapes: shapeReducer } });
type ShapeRootState = ReturnType<typeof shapeStore.getState>;

const fetchShapesNoState = () => {
  return async (dispatch: AppDispatch) => {
    const shapes = await ShapesAPI.getAll();
    dispatch(shapeActions.setShapes(shapes));
  };
};

// both stores can fire if getState isn't used
shapeStore.dispatch(fetchShapesNoState());
bothStore.dispatch(fetchShapesNoState());

const fetchShapesGetState = (): ThunkAction<
  void,
  { shapes: Shape[] },
  undefined,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const shapes = await ShapesAPI.getAll();
    const state = getState();

    if (state.shapes.length > 0) {
      // do something
    } else {
      dispatch(shapeActions.setShapes(shapes));
    }
  };
};

// both stores can fire if the shape of the store is provided in the type
shapeStore.dispatch(fetchShapesGetState());
bothStore.dispatch(fetchShapesGetState());

const fetchShapesGetStateUnion = (): ThunkAction<
  void,
  BothRootState | ShapeRootState,
  undefined,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const shapes = await ShapesAPI.getAll();
    const state = getState();

    // @ts-expect-error Property 'colors' does not exist on type '{ colors: Color[]; shapes: Shape[]; } | { shapes: Shape[]; }'.
    if (state.colors.length > 0) {
      // do something
    } else {
      dispatch(shapeActions.setShapes(shapes));
    }
  };
};

// both stores can fire if the shape of the store is a union type, but it
// introduces control flow errors if state doesn't line up
shapeStore.dispatch(fetchShapesGetStateUnion());
bothStore.dispatch(fetchShapesGetStateUnion());

const fetchShapesGetStateRootState = (): ThunkAction<
  void,
  BothRootState,
  undefined,
  AnyAction
> => {
  return async (dispatch, getState) => {
    const shapes = await ShapesAPI.getAll();
    const state = getState();

    if (state.shapes.length > 0) {
      // do something
    } else {
      dispatch(shapeActions.setShapes(shapes));
    }
  };
};

// only the store that matches the state given in the ThunkAction type can fire the action
// @ts-expect-error No overload matches this call.
shapeStore.dispatch(fetchShapesGetStateRootState());
bothStore.dispatch(fetchShapesGetStateRootState());
