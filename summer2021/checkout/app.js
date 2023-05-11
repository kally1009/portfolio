var app = new Vue ({
    el: "#app",
    data:{
        deck_type:"oak",
        wheel_type:"white",
        cost:0,
        tax:0,
        total:0
    },
    computed: {
        computedDeckImage: function(){
            return "photos/" + this.deck_type + ".jpg"
        },
        computedWheelImage: function(){
            return "photos/" + this.wheel_type + ".jpg"
        },
        computedCost: function (){
            this.cost = 0;
            this.tax = 0;
            this.total = 0;
            if( this.deck_type == "oak") this.cost += 30;
            if (this.deck_type == "pine") this.cost += 25;
            if (this.deck_type == "wood") this.cost += 20;
            if (this.wheel_type == "white") this.cost += 35;
            if (this.wheel_type == "black") this.cost += 25;
            if ( this.wheel_type == "blue" ) this.cost += 45;
            this.tax = this.cost*.06
            this.total = this.cost + this.tax
            return this.total
        }
    }
})