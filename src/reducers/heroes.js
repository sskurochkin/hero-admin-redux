import { createReducer } from "@reduxjs/toolkit";

import {
	heroesFetched,
	heroesFetching,
	heroesFetchingError,
	heroCreate,
	heroDelete,
} from "../actions";

const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
};

// const heroes = createReducer(initialState, builder => {
// 	builder
// 		.addCase(heroesFetching, state => {
// 			state.heroesLoadingStatus = 'loading'
// 		})
// 		.addCase(heroesFetched, (state, action)=>{
// 			state.heroesLoadingStatus = 'idle';
// 			state.heroes = action.payload
// 		})
// 		.addCase(heroesFetchingError, state =>{
// 			state.heroesLoadingStatus = 'error';
// 		})
// 		.addCase(heroCreate, (state, action)=>{
// 			state.heroes.push(action.payload)
// 		})
// 		.addCase(heroDelete, (state, action)=>{
// 			state.heroes = state.heroes.filter(
// 				                    	(hero) => hero.id !== action.payload
// 		)})
// 		.addDefaultCase(()=>{})
// })

//Только для нативного JS, не для Typescript
const heroes = createReducer(
	initialState,
	{
		[heroesFetching]: (state) => {
			state.heroesLoadingStatus = "loading";
		},
		[heroesFetched]: (state, action) => {
			state.heroesLoadingStatus = "idle";
			state.heroes = action.payload;
		},
		[heroesFetchingError]: (state) => {
			state.heroesLoadingStatus = "error";
		},
		[heroCreate]: (state, action) => {
			state.heroes.push(action.payload);
		},
		[heroDelete]: (state, action) => {
			state.heroes = state.heroes.filter(
				(hero) => hero.id !== action.payload
			);
		}
	},
	[],
	(state) => state
);

// const heroes = (state = initialState, action) => {
// 	switch (action.type) {
// 		case "HEROES_FETCHING":
// 			return {
// 				...state,
// 				heroesLoadingStatus: "loading",
// 			};
// 		case "HEROES_FETCHED":
// 			return {
// 				...state,
// 				heroes: action.payload,
// 			};
// 		case "HEROES_FETCHING_ERROR":
// 			return {
// 				...state,
// 				heroesLoadingStatus: "error",
// 			};
// 		case "HERO_DELETE":
// 			return {
// 				...state,
// 				heroes: state.heroes.filter(
//                     	(hero) => hero.id !== action.payload
//                     ),
// 			};

// 		case "HERO_CREATE":
// 			return {
// 				...state,
// 				heroes: [...state.heroes, action.payload],
// 			};
// 		default:
// 			return state;
// 	}
// };

export default heroes;
