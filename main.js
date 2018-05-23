const app = {
    init: function(formId) {
        document
            .querySelector(formId)
            .addEventListener('submit', this.handleSubmit)
    },

    handleSubmit: function(ev) {
        ev.preventDefault()

        const form = ev.target

        console.log(form.flickName.value)
    },
}

app.init('#flickForm')