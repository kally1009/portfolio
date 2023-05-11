var app = new Vue ({
    el:"#app",

    data: {
        question:"",
        feedback:"Waiting for a question...",
        answer: 8
    },
    methods:{
        checkQuestion: function() {
            if(this.question ==""){
                this.feedback = "waiting for a question...";
            }else if(this.question[this.question.length-1]!= "?"){
                this.feedback = "Questions usually end with a '?'";
            }else {
                this.feedback = "I'm ready to give an answer";
            }
            
        },
        askQuestion: function(){
            var possible_answer = ["yes", "no", "maybe", "perhaps someday", "in the near future", "of course not"]
            var random_number = Math.floor(Math.random()*possible_answer.length);
            this.answer = possible_answer[random_number];
        }
    }
})