const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
	filters: [],
	filtersLoadingStatus: "idle",
	activeFilter: "all",
	// filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "HEROES_FETCHING":
			return {
				...state,
				heroesLoadingStatus: "loading",
			};
		case "HEROES_FETCHED":
			return {
				...state,
				heroes: action.payload,
				// ЭТО МОЖНО СДЕЛАТЬ И ПО ДРУГОМУ
				// Я специально показываю вариант с действиями тут, но более правильный вариант
				// будет показан в следующем уроке
				// filteredHeroes:
				// 	state.activeFilter === "all"
				// 		? action.payload
				// 		: action.payload.filter(
				// 				(item) => item.element === state.activeFilter
				// 		  ),
				// heroesLoadingStatus: "idle",
			};
		case "HEROES_FETCHING_ERROR":
			return {
				...state,
				heroesLoadingStatus: "error",
			};
		case "FILTERS_FETCHING":
			return {
				...state,
				filtersLoadingStatus: "loading",
			};
		case "FILTERS_FETCHED":
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: "idle",
			};
		case "FILTERS_FETCHING_ERROR":
			return {
				...state,
				filtersLoadingStatus: "error",
			};
		case "ACTIVE_FILTER_CHANGED":
			return {
				...state,
				activeFilter: action.payload,
				// filteredHeroes:
				// 	action.payload === "all"
				// 		? state.heroes
				// 		: state.heroes.filter(
				// 				(item) => item.element === action.payload
				// 		  ),
			};

		case "HERO_DELETE":
			// const newHeroList = state.heroes.filter(
			// 	(hero) => hero.id !== action.payload
			// );
			return {
				...state,
				heroes: state.heroes.filter(
                    	(hero) => hero.id !== action.payload
                    ),
				// heroes: newHeroList,
				// Фильтруем новые данные по фильтру, который сейчас применяется
				// filteredHeroes:
				// 	state.activeFilter === "all"
				// 		? newHeroList
				// 		: newHeroList.filter(
				// 				(hero) => hero.element !== state.activeFilter
				// 		  ),
			};

		case "HERO_CREATE":
			// Формируем новый массив
			// let newCreatedHeroList = [...state.heroes, action.payload];
			return {
				...state,
				// heroes: newCreatedHeroList,
				heroes: [...state.heroes, action.payload],
				// Фильтруем новые данные по фильтру, который сейчас применяется
				// filteredHeroes:
				// 	state.activeFilter === "all"
				// 		? newCreatedHeroList
				// 		: newCreatedHeroList.filter(
				// 				(hero) => hero.element !== state.activeFilter
				// 		  ),
			};
		default:
			return state;
	}
};

export default reducer;
