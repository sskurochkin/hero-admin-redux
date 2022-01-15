import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector
} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

// const initialState = {
// 	heroes: [],
// 	heroesLoadingStatus: "idle",
// };

const heroesAdapter = createEntityAdapter() //используется для оптимизации

const initialState = heroesAdapter.getInitialState({//начальное состояние
	heroesLoadingStatus: 'idle'
})

export const fetchHeroes = createAsyncThunk(
	"heroes/fetchHeroes", //имя среза/тип действия
	async () => {
		//функция payloadCreator принимает 2 арг: то, что приходит при диспатче этоого действия, Thunk API
		const { request } = useHttp();
		return await request("http://localhost:3001/heroes"); // возвращаем промис
	}
);

const heroesSlice = createSlice({
	name: "heroes",
	initialState,
	reducers: {
		heroCreated: (state, action) => {
			heroesAdapter.addOne(state, action.payload)
		},
		heroDeleted: (state, action) => {
			heroesAdapter.removeOne(state, action.payload)
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = "loading";
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroesLoadingStatus = "idle";
				heroesAdapter.setAll(state, action.payload)
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer } = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes) //преобразование в массив

//работа с двумяредьюсерами с помощью библиотеки reselect. Для предотвращения лишних рендеров, если стейт не меняется
export const filteredHeroesSelector = createSelector(
	(state) => state.filters.activeFilter,
	selectAll,
	(filter, heroes) => {
		if (filter === "all") {
			return heroes;
		} else {
			return heroes.filter((hero) => hero.element === filter);
		}
	}
);

export const { heroCreated, heroDeleted } = actions;
