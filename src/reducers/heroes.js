const initialState = {
	heroes: [],
	heroesLoadingStatus: "idle",
};

const heroes = (state = initialState, action) => {
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
			};
		case "HEROES_FETCHING_ERROR":
			return {
				...state,
				heroesLoadingStatus: "error",
			};
		case "HERO_DELETE":
			return {
				...state,
				heroes: state.heroes.filter(
                    	(hero) => hero.id !== action.payload
                    ),
			};

		case "HERO_CREATE":
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			};
		default:
			return state;
	}
};

export default heroes;
