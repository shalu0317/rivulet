const mutations = {
    'SET_USER_DETAILS' (state, payload) {
      console.log('payload', payload)
      state.userDetails.address = payload.address
      state.userDetails.company = payload.company.name
      state.userDetails.email = payload.email
      state.userDetails.id = payload.id
      state.userDetails.name = payload.name
      state.userDetails.phone = payload.phone
      state.userDetails.website = payload.website
    },
    'SET_USER_LOGIN' (state, payload) {
        console.log('payload', payload)
        state.isUserLogin= payload
      },
    'ADD_POST' (state, payload) {
        console.log('payload', payload)
        state.userDetails.posts.unshift(payload)
    },
    'UPDATE_POST' (state, payload) {
      console.log('payload', payload)
      state.userDetails.posts = payload
    },
    'REMOVE_USER' (state, payload) {
      console.log(payload)
      state.userDetails.address = ''
      state.userDetails.company = ''
      state.userDetails.email = ''
      state.userDetails.id = ''
      state.userDetails.name = ''
      state.userDetails.phone = ''
      state.userDetails.website = ''
    }
}

export default mutations