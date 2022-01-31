var app = new Vue ({
    el: "#app",
    data: {
        problem_num: 1,
        num_one:3,
        num_two: 5,
        answer: "",
        results: 0 ,
        answered: 0,
        feedback: "",
        page:"test",
        the_answer:"??",
        submitted: false
    },
    methods:{
        generateRandomNumbers: function(){
            var random_number1 = Math.floor(Math.random()*10)
            this.num_one = random_number1;
            var random_number2 = Math.floor(Math.random()*10)
            this.num_two = random_number2;
            this.problem_num +=1;
            this.answer = "";
            this.submitted=false;
            this.the_answer = "??";
            this.feedback = "";
        },
        checkAnswer: function() {
            this.answered +=1;
            if(this.answer == this.num_one+this.num_two){
                this.results+=1;
                this.feedback = "Correct!"
            }
            else{
                this.feedback = "Incorrect...Try again"
            }
            this.submitted = true;
            this.the_answer = this.num_one + this.num_two
        }
        
    }
})