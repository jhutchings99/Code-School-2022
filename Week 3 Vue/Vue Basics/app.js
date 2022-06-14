var app = new Vue({
    el: "#app",
    data: {
        hello: "Hello, vue!",
        showText: true,
        globalColor: "#000",
        items: [
            {text:"item a", color:"#1f2", show:true},
            {text:"item b", color:"#500", show:true},
            {text:"item c", color:"#5cf", show:true},
            {text:"item d", color:"#0f0", show:true}
        ],
        strings: [
            "a",
            "b",
            "c",
            "d"
        ],
        listA: [10,9,8,7,6,5,4,3,2,1]
    },
    methods: {
        toggleTextandAddA_GLOBAL: function () {
            this.showText = !this.showText;
            this.hello = this.hello + "a";
        },

        toggleTextandAddA: function (item) {
            item.show = !item.show;
            item.text = item.text + "a";
        },

        changeColor: function (item) {
            if (item.color != "orange") {
                item.previousColor = item.color;
                item.color = "orange"
            } else {
                item.color = item.previousColor
            }
            this.globalColor = "yellow";
        }
    }
})