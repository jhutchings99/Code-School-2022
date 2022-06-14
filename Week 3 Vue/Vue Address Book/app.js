var app = new Vue({
    el: "#app",
    data: {
        // variables to model each input
        nameInput: "",
        addressInput: "",
        hoverIndex: -1,
        // list to hold addresses
        addresses: []
    },
    methods: {
        // function to add(push) address into list, clear input fields
        recordAddress: function () {
            let newAddress = {
                name: this.nameInput,
                address: this.addressInput
            }

            this.addresses.push(newAddress);
            this.name = "";
            this.address = "";
        },

        isValidAddress: function () {
            if (this.nameInput.length > 0 && this.addressInput.length > 0) {return true;}
        },

        deleteAddress: function (index) {
            this.addresses.splice(index, 1)
        },

        showAddress: function () {
            return true;
        }
    }
})