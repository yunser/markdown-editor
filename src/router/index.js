import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const Editor = resolve => require(['@/views/Editor'], resolve)
const Markdown2Html = resolve => require(['@/views/Markdown2Html'], resolve)
const Html2Markdown = resolve => require(['@/views/Html2Markdown'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/editor',
        component: Editor
    },
    {
        path: '/markdown2html',
        component: Markdown2Html
    },
    {
        path: '/html2markdown',
        component: Html2Markdown
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
