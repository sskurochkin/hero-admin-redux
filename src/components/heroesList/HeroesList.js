import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	heroesFetching,
	heroesFetched,
	heroesFetchingError,
	heroDelete,
} from "../../actions";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const { filteredHeroes, heroesLoadingStatus } = useSelector((state) => state); //достали занчения из стейта
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		dispatch(heroesFetching()); //выполняем запрос на сервер, меняем статус загрузки
		request("http://localhost:3001/heroes")
			.then((data) => dispatch(heroesFetched(data))) //получаем героев с сервера, меняем статус загрузки
			.catch(() => dispatch(heroesFetchingError()));

		// eslint-disable-next-line
	}, []);

	// Функция берет id и по нему удаляет ненужного персонажа из store
	// ТОЛЬКО если запрос на удаление прошел успешно
	// Отслеживайте цепочку действий actions => reducers
	const deleteHero = useCallback(
		(id) => {
			// Удаление персонажа по его id
			request(`http://localhost:3001/heroes/${id}`, "DELETE")
				.then((data) => console.log(data, "Deleted"))
				.then(dispatch(heroDelete(id)))
				.catch((err) => console.log(err));
			
		},// eslint-disable-next-line
		[request]
	);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
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
					deleteHero={()=> deleteHero(id)}
				/>
			);
		});
	};

	const elements = renderHeroesList(filteredHeroes);
	return <ul>{elements}</ul>;
};

export default HeroesList;