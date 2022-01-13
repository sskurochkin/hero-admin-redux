// import { createAction } from "@reduxjs/toolkit";
import { heroesFetched, heroesFetching,heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/filtersSlice";

//redux-thunk используетсвя для того чтобы передавать в диспатч функции и их обрабатывать
export const fetchHeroes = (request) => (dispatch) => {
	dispatch(heroesFetching()); //выполняем запрос на сервер, меняем статус загрузки
	request("http://localhost:3001/heroes")
		.then((data) => dispatch(heroesFetched(data))) //получаем героев с сервера, меняем статус загрузки
		.catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
	dispatch(filtersFetching());
	request("http://localhost:3001/filters")
		.then((data) => dispatch(filtersFetched(data)))
		.catch(() => dispatch(filtersFetchingError()));
};

// export const heroesFetching = () => {
// 	return {
// 		type: "HEROES_FETCHING",
// 	};
// };


//закомментировал когда добавил createSlice()
// export const heroesFetching = createAction('HEROES_FETCHING')
// export const heroesFetched = createAction('HEROES_FETCHED')
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')
// export const heroCreate = createAction('HERO_CREATE')
// export const heroDelete = createAction('HERO_DELETE')


// export const heroesFetched = (heroes) => {
// 	return {
// 		type: "HEROES_FETCHED",
// 		payload: heroes,
// 	};
// };

// export const heroesFetchingError = () => {
// 	return {
// 		type: "HEROES_FETCHING_ERROR",
// 	};
// };

// export const filtersFetching = () => {
// 	return {
// 		type: "FILTERS_FETCHING",
// 	};
// };

// export const filtersFetched = (filters) => {
// 	return {
// 		type: "FILTERS_FETCHED",
// 		payload: filters,
// 	};
// };

// export const filtersFetchingError = () => {
// 	return {
// 		type: "FILTERS_FETCHING_ERROR",
// 	};
// };

// export const activeFilterChanged = (filter) => {
// 	return {
// 		type: "ACTIVE_FILTER_CHANGED",
// 		payload: filter,
// 	};
// };

// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(() =>{
//         dispatch(
//             {
//                 type: 'ACTIVE_FILTER_CHANGED',
//                 payload: filter
//             }
//         )
//     }, 1000)
// }

// export const heroCreate = (newHero) => {
// 	return {
// 		type: "HERO_CREATE",
// 		payload: newHero,
// 	};
// };
// export const heroDelete = (id) => {
// 	return {
// 		type: "HERO_DELETE",
// 		payload: id,
// 	};
// };
