// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { heroCreate } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";
import {v4 as uuidv4} from 'uuid'

const HeroesAddForm = () => {

	//создаем локальный стейт для формирования объекта героя
	const [heroName, setHeroName] = useState("");
	const [heroDescr, setHeroDescr] = useState("");
	const [heroElement, setHeroElement] = useState("");

	const dispatch = useDispatch();
	const { request } = useHttp();
	const { filtersLoadingStatus } = useSelector((state) => state.filters);
    const filters = selectAll(store.getState())

	const onSubmitHandler = (e) => {
        e.preventDefault()

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        }
        // Отправляем данные на сервер в формате JSON
        // ТОЛЬКО если запрос успешен - отправляем персонажа в store
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Good'))
            .then(dispatch(heroCreated(newHero)))
            .catch(error => console.log(error))

        // Очищаем форму после отправки
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    };

	const renderFilters = (filters, status) => {
		if (status === "loading") {
			return <option>Загрузка элементов</option>;
		} else if (status === "error") {
			return <option>Ошибка загрузки</option>;
		}

		// Если фильтры есть, то рендерим их
		if (filters && filters.length > 0) {
			return filters.map(({ name, label }) => {
				// Один из фильтров нам тут не нужен
				// eslint-disable-next-line
				if (name === "all") return;

				return (
					<option key={name} value={name}>
						{label}
					</option>
				);
			});
		}
	};

	return (
		<form 
            onSubmit={onSubmitHandler}
            className='border p-4 shadow-lg rounded'>
			<div className='mb-3'>
				<label htmlFor='name' className='form-label fs-4'>
					Имя нового героя
				</label>
				<input
					onChange={(e) => setHeroName(e.target.value)}
					value={heroName}
					required
					type='text'
					name='name'
					className='form-control'
					id='name'
					placeholder='Как меня зовут?'
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='text' className='form-label fs-4'>
					Описание
				</label>
				<textarea
					onChange={(e) => setHeroDescr(e.target.value)}
					value={heroDescr}
					required
					name='text'
					className='form-control'
					id='text'
					placeholder='Что я умею?'
					style={{ height: "130px" }}
				/>
			</div>

			<div className='mb-3'>
				<label htmlFor='element' className='form-label'>
					Выбрать элемент героя
				</label>
				<select
					required
					className='form-select'
					id='element'
					name='element'
					onChange={(e) => setHeroElement(e.target.value)}
					value={heroElement}>
					<option>Я владею элементом...</option>
					{renderFilters(filters, filtersLoadingStatus)}
				</select>
			</div>

			<button type='submit' className='btn btn-primary'>
				Создать
			</button>
		</form>
	);
};

export default HeroesAddForm;
