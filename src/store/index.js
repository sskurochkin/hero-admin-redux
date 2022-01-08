import { createStore, combineReducers, compose } from 'redux';
// import reducer from '../reducers';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const enhancer = (createStore) =>(...args) =>  {
    const store = createStore(...args)

    const oldDispatch = store.oldDispatch // сохраняем оригинальный диспатч
    store.dispatch = (action) => {
        if (typeof action === 'string'){
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(
                        combineReducers({heroes: heroes, filters: filters}),
                        compose(
                            enhancer, 
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;