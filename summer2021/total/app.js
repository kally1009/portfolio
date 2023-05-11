var app = new Vue({
    el:"#app",
    data: {
        services:[
            {
                name: "Web Development",
                price: 300,
                active: true
            },
            {
                name: 'Design',
                price: 350,
                active: false
            },
            {
                name: 'Integration',
                price: 250,
                active: false
            },
            {
                name:'Training',
                price: 200,
                active: false
            }

        ]

    },
    methods:{

        toggleActive: function(service){
            service.active =! service.active;
        }
        //toggle active
    },

    computed: {
        //total each service
        //return total
        total: function(){
            var total=0
            this.services.forEach(function(service){
                if(service.active == true){
                    total+=service.price
                }
            })
            return total
        }
    }
})