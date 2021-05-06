
import axios from 'axios';
const state = {
	user: null,
  jobs: null,
	externalJobs:null
};
const getters = {
	isAuthenticated: state => !!state.user,    
  StateJobs: state => state.jobs,
	StateExternalJobs: state => state.externalJobs,
	StateUserJobs: state => state.userJobs,

  StateUser: state => state.user,
};
const actions = {

	async Register({dispatch}, form) {
		await axios.post('register', form)
		await dispatch('LogIn', {email: form.email, password: form.password})
	},

	async	LogIn({commit}, User) {
			await axios.post('login', User)
			await commit('setUser', User.email)		
	},
	async LogOut({commit}){
		let user = null
		commit('logout', user)
	},
	async CreateJob({dispatch}, job) {
		await axios.post('jobs', job)
		await dispatch('GetUserJobs')	
		await dispatch('GetJobs')
	},
	async GetJobs({commit}){
		let response = await axios.get('jobs')

		commit('setJobs', response.data)
	},
	async GetUserJobs({commit}){
		let response = await axios.get('jobs/user')
		console.log(response.data)
		commit('setUserJobs', response.data)
	},
	async GetExternalJobs({commit}){
		let response = await axios.get('external')
		console.log(response.data)
		commit('setExternalJobs', response.data)
	},
	async DestroyJob({dispatch} , id){
		await axios.delete(`/jobs/${id}`)
		await dispatch('UserJobs')	
		await dispatch('GetJobs')
	},

	async updateJob({dispatch}, job){	
		await axios.put(`/jobs/${job.id}`, job)
		await dispatch('GetUserJobs')	
		await dispatch('GetJobs')			
	}

};
const mutations = {
	setUser(state, firstname){
        state.user = firstname
    },
    setJobs(state, jobs){
        state.jobs = jobs
    },
		setExternalJobs(state, jobs){
        state.externalJobs = jobs
    },
		setUserJobs(state, jobs){
        state.userJobs = jobs
    },
    logout(state){
        state.user = null
        state.jobs = null
    },
};
export default {
  state,
  getters,
  actions,
  mutations
};
