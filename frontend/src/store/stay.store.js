import { stayService } from '../../services/stay.service.js'

export const stayStore = {
    state: {
        isLoading: false,
        stays: [],
        currStay: null,
        filterBy: {
            price: {
                min: 0,
                max: 1000,
            },
            typeOfPlace: [],
            labels: [],
        },
    },
    getters: {
        staysToShow(state, getters) {
            console.log(state.filterBy)
            const { destination, guests, dates } = getters.getCurrTrip
            var filteredStays = state.stays
            if (destination) {
                const regex = new RegExp(destination, 'i')
                filteredStays = filteredStays.filter(stay => regex.test(stay.loc.city))
            }

            const { labels } = state.filterBy
            if (labels.length) {
                console.log(labels);
                filteredStays = filteredStays.filter((stay) => {
                    const amns = stay.amenities.map(am => am.name)
                    if (labels.every(label => amns.includes(label))) return true
                })
            }
            const minPrice = state.filterBy.price.min
            const maxPrice = state.filterBy.price.max
            filteredStays = filteredStays.filter(stay =>
                stay.price >= minPrice && stay.price <= maxPrice)

            const {typeOfPlace} = state.filterBy
            if (typeOfPlace.length > 0) {
                filteredStays = filteredStays.filter(stay => stay.propertyType.includes(typeOfPlace))
                console.log(filteredStays);
            }

            return filteredStays
        },
        getCurrStay(state) {
            return JSON.parse(JSON.stringify(state.currStay))
        },
        isLoading({ isLoading }) {
            return isLoading
        },
        isLoading({ isLoading }) {
            return isLoading
        }
    },
    mutations: {
        setStays(state, { stays }) {
            state.stays = stays
        },
        setCurrStay(state, { stay }) {
            state.currStay = stay
            console.log('currStay', state.currStay)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setLoading(state, { isLoading }) {
            state.isLoading = isLoading
        },
    },
    actions: {
        // loadStays({ commit, state }) {
        //     const { filterBy } = state
        //     commit({ type: 'setLoading', isLoading: true })
        //     stayService.query().then(stays => {
        //         commit({ type: 'setStays', stays })
        //     })
        // },
        async loadStays({ commit, state }) {
            // const { filterBy } = state
            commit({ type: 'setLoading', isLoading: true })
            try {
                const stays = await stayService.query()
                commit({ type: 'setStays', stays })
            } catch (err) {
                console.log('Error in query stays (store)', err)
                throw err
            } finally {
                commit({ type: 'setLoading', isLoading: false });
            }
        },

        async setCurrStay({ commit }, { stayId }) {
            try {
                const stay = await stayService.getById(stayId);
                commit({ type: 'setCurrStay', stay })
                return stay
            } catch (err) {
                console.log(`Error in getting stay ${stayId}`, err)
                throw err
            }
        }
        // setCurrStay({ commit, getters }, { stayId }) {
        //     return stayService.getById(stayId).then((stay) => {
        //         console.log(stay)
        //         commit({ type: 'setCurrStay', stay })
        //     })
        // },
    }
}