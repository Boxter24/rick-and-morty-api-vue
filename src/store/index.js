import { createStore } from 'vuex'

export default createStore({
  state: {
    characters : [],
    charactersFilter : []
  },
  mutations: {
    setCharacters(state,payload){
      state.characters = payload
    },
    setCharactersFilters(state,payload){
      state.charactersFilter = payload
    }
  },
  actions: {
    async getCharacters({commit}){
      try{
        const response = await fetch("https://rickandmortyapi.com/api/character")
        const data = await response.json()
        //console.log(data)
        commit("setCharacters",data.results)
        commit("setCharactersFilters",data.results)
      }
      catch(error){
        console.error(error)
      }
    },
    filterByStatus({commit,state},status){
      const results = state.characters.filter((character) => {
        return character.status.includes(status)
      })
      commit("setCharactersFilters",results)
    },
    filterByName({commit,state},name){
      const formatName = name.toLowerCase()
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase()

        if(characterName.includes(formatName)){
          return character
        }
      })
      commit("setCharactersFilters",results)
    }
  },
  modules: {
  }
})
