const app = {

    init(selectors) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.flickForm)
            .addEventListener('submit', ev => {
                this.handleSubmit(ev)
            })
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name
        return item
    },

    handleSubmit(ev) {
        ev.preventDefault()

        const form = ev.target
        const flick = {
            id: ++this.max,
            name: form.flickName.value,
        }

        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)

        console.log(flick)
        form.reset()
    },
}

app.init({
    flickForm: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})