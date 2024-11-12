import { Commit, createStore } from 'vuex'
import axios from '../axios/axios'

export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

export interface ImageProps {
  _id: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string;
}

export interface MessagerProps {
  status: boolean;
  message?: string;
  type?: 'error' | 'success' | 'default'
  isVisible?: boolean;
}

export interface GlobalProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
  token: string;
  messager: MessagerProps;
  column: ColumnProps;
  post: PostProps;
}

export interface ResponseType<p> {
  code: number;
  msg: string;
  data: p;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit, params: any) => {
  const { data } = await axios.get(url, { params: { ...params } })
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}

export const store = createStore<GlobalProps>({
  state: {
    messager: {
      status: false,
      message: '默认消息',
      type: 'default',
      isVisible: true
    },
    loading: false,
    columns: [],
    posts: [],
    user: {
      isLogin: false
    },
    token: sessionStorage.getItem('token') || '',
    column: {
      _id: '',
      title: '',
      description: '',
      avatar: {
        url: '',
        _id: ''
      }
    },
    post: {
      title: '',
      column: ''
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  mutations: {
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn (state, rawData) {
      state.column = rawData.data
    },
    fetchPosts (state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading (state, status) {
      state.loading = status
    },
    login (state, rawData) {
      const token = rawData.data.token
      state.token = token
      sessionStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    fetchCurrentUser (state, rawData) {
      state.user = {
        ...rawData.data,
        isLogin: true
      }
    },
    callMessager (state, e: MessagerProps) {
      state.messager = { ...e }
      console.log(state.messager)
    },
    switchVisible (state, v: boolean) {
      state.messager.isVisible = v
    },
    logout (state) {
      state.token = ''
      sessionStorage.removeItem('token')
      state.user.isLogin = false
      delete axios.defaults.headers.common.Authorization
    },
    fetchPost (state, rawData) {
      state.post = { ...rawData.data }
    }
  },
  actions: {
    async fetchColumns ({ commit }) {
      await getAndCommit('/columns', 'fetchColumns', commit, {
        currentPage: 1,
        pageSize: 9
      })
    },
    async fetchColumn ({ commit }, cid) {
      await getAndCommit(`/columns/${cid}`, 'fetchColumn', commit, null)
    },
    async fetchPosts ({ commit }, cid) {
      return await getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit, {
        currentPage: 1,
        pageSize: 5
      })
    },
    async login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    async fetchCurrentUser ({ commit }) {
      return await getAndCommit('/user/current', 'fetchCurrentUser', commit, null)
    },
    async loginAndFetch ({ dispatch }, loginData) {
      return await dispatch('login', loginData)
        .then(() => {
          return dispatch('fetchCurrentUser')
        })
    },
    async createPost ({ commit }, payload) {
      return postAndCommit('/posts', 'createPost', commit, payload)
    },
    async fetchPost ({ commit }, id: string) {
      return getAndCommit(`/posts/${id}`, 'fetchPost', commit, null)
    }
  }
})
