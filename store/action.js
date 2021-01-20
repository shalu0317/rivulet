const actions = {
    async setUserDetails (context, userDetails) {
        console.log('userDetails', userDetails)
        await context.commit('SET_USER_DETAILS', userDetails)
      },
      async isUserLogin (context, isUserLogin) {
        await context.commit('SET_USER_LOGIN', isUserLogin)
      },
      async addPost (context, postDetails) {
        await context.commit('ADD_POST', postDetails)
      },
      async updatePost (context, updatePost) {
         await context.commit('UPDATE_POST', updatePost)
      },
      async removeData (context, removePost) {
        await context.commit('REMOVE_USER', removePost)
     },
}

export default actions