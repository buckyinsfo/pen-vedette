const app = {
    
    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)

        document
            .querySelector(selectors.flickForm)
            .addEventListener('submit', ev => {
                this.handleSubmit(ev)
            })
    },

    renderListItem(flick) {
        const item = document.createElement('li')
        item.textContent = flick.name
        return item
    },

    handleSubmit(ev) {
        ev.preventDefault()

        const form = ev.target
        const flick = {
            id: ++this.max, 
            name: form.flickName.value,
        }

        this.flicks.push(flick)

        const item = this.renderListItem(flick)
        this.list.appendChild(item)

        console.log(flick)
        form.reset()
    },
}

app.init({
    flickForm: '#flickForm',
    listSelector: '#flickList',
})