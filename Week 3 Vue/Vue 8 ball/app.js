const URL = "https://cs2022-eight-ball.herokuapp.com";
var app = new Vue({
    el: "#app",
    data: {
        prompt: "Ask a Question",
        message: "",
        messageColor: "",
        // messageBank: [
        //     "Yes",
        //     "No",
        //     "Maybe",
        //     "Ask Again Tomorrow",
        //     "Probably",
        //     "Probably Not"
        // ],

        question: "",
        answerReady: true
    },
    methods: {
        askQuestion: function () {
            if (!this.isValidQuestion()) {return;} 

            // let nextIndex = Math.floor(Math.random() * this.messageBank.length);
            // let nextResponse = this.messageBank[nextIndex];
            this.answerReady = false;
            this.messageColor = "rgba(255, 255, 255, 0)";
            setTimeout(() => {
                fetch(URL + "/questions").then((response) => {
                    response.json().then((data) => {
                        let answerObject = data;
    
                        this.message = answerObject.answer;
                        this.messageColor = answerObject.color;
                        setTimeout(() => {
                            this.answerReady = true;
                        }, 1000)
                    });
                });
            }, 1500);

            // this.message = nextResponse;
            this.prompt = "Ask another question";
            this.question = ""; 
        },

        isValidQuestion: function () {
            return this.question[this.question.length-1] == "?";
        }
    }
})