//redux-thunk используетсвя для того чтобы передавать в диспатч функции и их обрабатывать
import heroes from "../reducers/heroes";
import filters from "../reducers/filters";
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

//Middleware - функции по изменению функционала и работы  диспатча, позволяют в качестве action принимать не только объекты
const stringMiddleware = () => (next) => (action) => {
	if (typeof action === "string") {
		return next({
			type: action,
		});
	}
	return next(action);
};

const enhancer =
	(createStore) =>
	(...args) => {
		const store = createStore(...args);

		const oldDispatch = store.oldDispatch; // сохраняем оригинальный диспатч
		store.dispatch = (action) => {
			if (typeof action === "string") {
				return oldDispatch({
					type: action,
				});
			}
			return oldDispatch(action);
		};
		return store;
	};

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(
// 	combineReducers({ heroes: heroes, filters: filters }),
// 	compose(
// 		applyMiddleware(ReduxThunk, stringMiddleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ &&
// 			window.__REDUX_DEVTOOLS_EXTENSION__()
		// compose(
		// 	enhancer,
		// 	window.__REDUX_DEVTOOLS_EXTENSION__ &&
		// 		window.__REDUX_DEVTOOLS_EXTENSION__()
// 		// )
// 	)
// );

const store = configureStore({
	reducer: {heroes, filters},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',//включение devtools только для разработки

})



export default store;
