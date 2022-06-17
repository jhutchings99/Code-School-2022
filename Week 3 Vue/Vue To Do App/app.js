var url="http://todo2022.codeschool.cloud";

var app = new Vue({
    el: '#app',
    data: {
        todos: [],
        usableTags: [],

        nameInput: "",
        descriptionInput: "",
        doneInput: false,
        dateInput: "",
        tagsInput: {},

        editingIndex: -1,
        // copy of todo to edit
        editingTodoCopy: {},
        editingTags: [],
    },
    methods: {
        addToDo: function () {
            let tagsList = [];
            this.usableTags.forEach(tag => {
                if (this.tagsInput[tag]) {
                    tagsList.push(tag)
                }
            })

            let newToDo = {
                name: this.nameInput,
                description: this.descriptionInput,
                done: this.doneInput,
                deadline: this.dateInput,
                tags: tagsList
            }

            this.postTodo(newToDo);

            this.nameInput = "";
            this.descriptionInput = "";
            this.doneInput = false;
            this.dateInput = "";
            this.tagsInput = {};
        },
        postTodo: function (new_todo) {
            fetch(url + "/todo", {
                method: "POST",
                body: JSON.stringify(new_todo),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                response.json().then(created_todo => {
                    this.getTodos();
                });
            });
        },  
        getTodos: function () {
            fetch(url + "/todos").then(response => {
                response.json().then(data => {
                    this.todos = data;

                    this.todos.forEach((todo) => {
                        todo.deadline = todo.deadline.split("T")[0];
                    })
                })
            });
        },

        editTodo: function (todo_object ,todo_index) {
            this.editingIndex = todo_index;
            this.editingTodoCopy = {...todo_object};

            if (Object.keys(todo_object).includes("tags")) {
                this.editingTags = [];
                this.usableTags.forEach(tag => {
                    this.editingTags.push(todo_object.tags.includes(tag));
                })
            }
        },

        putTodo: function (todo_object) {
            // this.todos[index] = {...this.editingTodoCopy};
            // this.editTodo({}, -1)
            let listOfTags = [];

            this.usableTags.forEach((tag, index) => {
                if (this.editingTags[index]) {
                    listOfTags.push(tag);
                }
            })

            this.editingTodoCopy.tags = [...listOfTags];

            fetch(url + "/todo/" + todo_object._id, {
                method: "PUT",
                body: JSON.stringify(this.editingTodoCopy),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                response.json().then(data => {
                    this.getTodos();
                })
            })
            this.editTodo({}, -1)
        },

        deleteTodo: function (todo_object) {
            fetch(url + "/todo/" + todo_object._id, {
                method: "DELETE",
            }).then(response => {
                response.json().then(data => {
                    this.getTodos();
                })
            })
            this.editTodo({}, -1)
        }
    },
    created: function () {
        this.getTodos();

        fetch(url + "/tags").then(response => {
            response.json().then(data => {
                this.usableTags = data;
                this.usableTags.forEach(tag => {
                    this.tagsInput[tag] = false 
                });
            })
        })
    }
});