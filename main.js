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

        item
            .querySelector('.del.button')
            .addEventListener('click', this.handleDeleteFlick)
        
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

    handleDeleteFlick(ev) {
        const item = ev.target.closest('.flick')
        item.remove()

        
        console.log('Delete Flick')
    },
}

app.init({
    flickForm: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})