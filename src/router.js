import {createRouter, createMemoryHistory } from 'vue-router'
import HomeView from './views/home-view.vue'
import LearningVerbs from './components/learning-card.vue'
import Normalization from './services/normalize'
import SelectLearning from './views/learn-by.vue'


const routes = [
    
    { path: '/', component: HomeView},
    { path: '/select', component: SelectLearning},
    { path: '/learn/verbs/:case', 
        component: LearningVerbs,
        beforeEnter: (to) => {
             const caseParam = to.params.case
            if (!(caseParam in Normalization.verbsByCase)) {
            return '/select'
          }
        },
    }, 
   
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router