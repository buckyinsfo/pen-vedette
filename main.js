const app = {
    
    init: function (formId) {
        this.max = 0

        document
            .querySelector(formId)
            .addEventListener('submit', ev => {
                this.handleSubmit(ev)
            })
    },

    handleSubmit: function (ev) {
        ev.preventDefault()

        const form = ev.target
        const flick = {
            id: ++this.max, 
            name: form.flickName.value,
        }

        console.log(flick)
        form.reset()
    },
}

app.init('#flickForm')