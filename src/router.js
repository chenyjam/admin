const routers = [{
    path: '',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [{
          path: '',
          component: (resolve) => require(['./views/exception.vue'], resolve)
        }]
},{
    path: '/transportation',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [{
        path: 'exception',
        component: (resolve) => require(['./views/exception.vue'], resolve)
    },{
        path: 'clock',
        component: (resolve) => require(['./views/clock.vue'], resolve)
    }]
}];
export default routers;