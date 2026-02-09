import {createRouter, createMemoryHistory } from 'vue-router'
import HomeView from './views/home-view.vue'
//import DativVerbs from './views/learn-by.vue'
import SelectLearning from './views/learn-by.vue'
const routes = [
    
    { path: '/', component: HomeView},
    { path: '/select', component: SelectLearning},
    //{ path: '/learn/verbs/dative', component: DativVerbs},
    //{ path: '/learn/verbs/accusative', component: AkkusativVerbs},
    //{ path: '/learn/verbs/genitive', component: GenitiveVerbs},

]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router