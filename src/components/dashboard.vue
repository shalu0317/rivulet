<template>
  <div>
    
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar color="deep-purple" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Hello, {{userDetails.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title @click="Logout()" style="cursor: pointer">Logout</v-toolbar-title>
      </v-app-bar>
    </v-card>
    <v-container>
      <input
        v-model="newPost"
        type="text"
        class="postInput"
        placeholder="Create a new post..."
        @keyup.enter="newPost.trim() !== '' ? addPost() : ''"
      />
      <v-btn
        color="deep-purple"
        light
        style="color: white"
        @click="addPost()"
        :disabled="newPost.trim() === ''"
        small
      >
        Add Post
      </v-btn>
      <div v-if="allPost.length !== 0">
        <div class="singlePost" v-for="(Posts, index) in allPost" :key="index">
          <div class="postBox">{{ Posts.post }}</div>
          <div style="margin: 15px">
            <div style="cursor: pointer" @click="showCommentsFunc()">Comments ( {{ userDetails.posts[index].comments.length }} )</div>
            <div v-if="showComments && Posts.comments.length != 0" class="commentBox">
                <div class="commentFont" v-for="(comment, index) in Posts.comments" :key="index">
                    {{comment}}
                </div>
            </div>
            <div v-if="showComments && Posts.comments.length == 0" class="commentBox">
                No comments found
            </div>
            <input
              v-model="Posts.newComment"
              type="text"
              class="comment"
              placeholder="Add a comment..."
              @keyup.enter="Posts.newComment.trim() !== '' ? addComment(allPost[index]) : ''"
            />
            <v-btn
              color="deep-purple"
              light
              style="color: white"
              @click="addComment(allPost[index])"
              :disabled="Posts.newComment.trim() === ''"
              small
            >
              Add Comment
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    userValid: false,
    errorMsg: null,
    drawer: false,
    group: null,
    newPost: "",
    comments: "",
    newComment: "",
    posts: [],
    showComments: false,
    allPost: [],
  }),
  computed: {
    ...mapState({
      isUserLogin: (state) => state.isUserLogin,
      userDetails: (state) => state.userDetails,
    }),
  },
  mounted() {
    if (this.isUserLogin === true) {
      this.userValid = true;
      console.log("posts", this.posts);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    addPost() {
      console.log("addPost", this.newPost);
      let data = {
        id: Math.floor(Math.random() * 100 + 1),
        post: this.newPost,
        comments: [],
      };
      data.newComment = " "
      this.allPost.unshift(data);

      this.$store.dispatch("addPost", data);
      this.newPost = "";
    },
    addComment (data) {
        console.log('data', data)
        data.comments.push(data.newComment)
        let newData = {
            id : data.id,
            post: data.post,
            comments: data.comments
        }
        for(let i=0; i<this.userDetails.posts.length; i++) {
            if(this.userDetails.posts[i].id === data.id) {
                this.userDetails.posts[i] = newData
            }
        }
        this.updateData(this.userDetails.posts)
        data.newComment = ''
    },
    updateData (data) {
        this.$store.dispatch('updatePost', data)
    },
    showCommentsFunc () {
        console.log('show comments')
        this.showComments = !this.showComments
    },
    Logout() {
      this.$store.dispatch('isUserLogin', false)
      this.$store.dispatch('removeData', '')
      this.$router.push('/login')
    }
  },
};
</script>
<style scoped>
.postInput {
  margin: 29px auto;
  border: 2px solid;
  min-height: 100px;
  padding: 20px;
  width: 100%;
}
.singlePost {
  min-height: 50px;
  width: 100%;
  border: 2px solid #ececec;
  padding: 10px;
  margin: 15px auto;
}
.postBox {
  border: 2px solid #ececec;
    padding: 10px 25px;
}
.comment {
      width: 85%;
    margin-top: 10px;
    padding: 10px;
    margin-right: 10px;
        border-width: 0px 0px 3px 0px;
    border-style: solid;
    border-color: #ececec;
}
.commentBox {
    margin: 15px;
}
.commentFont {
    color: #646464;
    padding: 5px;
    border-width: 0px 0px 3px 0px;
    border-style: solid;
    border-color: #ececec;
}
</style>