import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

const HeroesList = () => {
	const {
		data: heroes = [],
		isFetching,
		isLoading,
		isError,
	} = useGetHeroesQuery(); // заменяет все что было удалено из этого файла

	const [deleteHero] = useDeleteHeroMutation();

	const activeFilter = useSelector((state) => state.filters.activeFilter);

	const filteredHeroes = useMemo(() => {
		const filteredHeroes = heroes.slice();

		if (activeFilter === "all") {
			return filteredHeroes;
		} else {
			return filteredHeroes.filter(
				(hero) => hero.element === activeFilter
			);
		}
	}, [heroes, activeFilter]);

	//продвинутый вариант реализации фильтров

	// const filteredHeroes = useSelector(state=> {
	// 	if(state.filters.activeFilter === 'all'){
	// 		return state.heroes.heroes
	// 	} else {
	// 		return state.heroes.heroes.filter(hero => hero.element === state.filters.activeFilter)
	// 	}

	// });

	// const { filteredHeroes, heroesLoadingStatus } = useSelector((state) => state); //достали занчения из стейта

	// useEffect(() => {
	// 	dispatch(heroesFetching); //выполняем запрос на сервер, меняем статус загрузки
	// 	request("http://localhost:3001/heroes")
	// 		.then((data) => dispatch(heroesFetched(data))) //получаем героев с сервера, меняем статус загрузки
	// 		.catch(() => dispatch(heroesFetchingError()));

	// 	// eslint-disable-next-line
	// }, []);

	// Функция берет id и по нему удаляет ненужного персонажа из store
	// ТОЛЬКО если запрос на удаление прошел успешно
	// Отслеживайте цепочку действий actions => reducers
	const onDelete = useCallback(
		(id) => {
			deleteHero(id);
		}, // eslint-disable-next-line
		[]
	);

	if (isLoading || isFetching) {
		return <Spinner />;
	} else if (isError) {
		return <h5 className='text-center mt-5'>Ошибка загрузки</h5>;
	}

	//мой вариант без удаления из базы
	// const deleteHero = (id) => {
	// 	const newArr = heroes.filter((hero) => hero.id !== id);
	// 	dispatch(heroDelete(newArr));
	// };

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className='text-center mt-5'>Героев пока нет</h5>;
		}

		return arr.map(({ id, ...props }) => {
			return (
				<HeroesListItem
					key={id}
					{...props}
					// id={id}
					deleteHero={() => onDelete(id)}
				/>
			);
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;
