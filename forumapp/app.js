var url = "http://forum2021.codeschool.cloud"
var app = new Vue({
    el: "#app",
    data: {
        page: "forum",

        threads_empty:"There are no threads for this category",
        selected_category:"all",
        search_string: "",
        categories: [
            "all",
            "books",
            "clothing",
            "cooking",
            "computers",
            "music",
            "world news",
            "misc."
        ],
        post_author:"",
        post_body:"",
        new_name:"",
        new_author:"",
        new_description:"",
        new_category:"all",
        postings: [],
        posts_empty:"There are no posts for this thread",
        threads:[

        ]
    },
    created:function(){
        this.getThreads(); //first thing called when app starts. 
    },
    methods: {
        getThreads:function(){
            fetch(`${url}/thread`).then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    app.threads = data;
                })
            })
        },
        createThread: function(){
            var new_thread = {
                name: this.new_name,
                author: this.new_author,
                description: this.new_description,
                category: this.new_category,
                posts: []
            };
            fetch(`${url}/thread`,{
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(new_thread)
            }).then(function(response){
                console.log(new_thread)
                if(response.status==400){
                    response.json().then(function(data){
                        alert(data.msg)
                    })
                    
                }else if(response.status == 201){
                    app.new_name="";
                    app.new_author="";
                    app.new_description="";
                    app.category="all";
                    app.page="forum";
                    app.getThreads()
                }
                });
            
        },
        deleteThread: function(id){
            fetch(`${url}/thread/`+id,{
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(function(){
                app.getThreads()});
        },
        getPosts: function(thread_id){
            fetch(`${url}/thread/${thread_id}`).then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    app.postings=data;
                })
            }).then(function(){
                app.page="posts"
            })
        },
        createPost: function(thread_id){

            var new_post = {
                thread_id:thread_id,
                author: this.post_author,
                body: this.post_body
            }
            fetch(`${url}/post`,{
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(new_post)
            }).then(function(response){
                console.log(new_post)
                if(response.status==404){
                    response.json().then(function(data){
                        alert(data.msg)
                    })
                    
                }else if(response.status == 200){
                    app.post_author="";
                    app.post_body="";
                    app.getPosts(thread_id)
                }
                });

           
        },
        deletePost: function(post){
            console.log("delete Post")
            fetch(`${url}/post/`+post.thread_id+"/"+post._id,{
                method: "DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(function(){
                app.getPosts(post.thread_id)});
            
        }
        
        },
        computed: {
            filteredThreads: function(){
                if(this.selected_category=="all"){
                    return this.threads
                }
                else{
                    var sorted_threads = this.threads.filter(function(thread){
                        return thread.category == app.selected_category;
                    });
                    return sorted_threads 
                }
                
        }
        }


})