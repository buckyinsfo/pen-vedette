class App {

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
    }

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name

        item
            .querySelector('.del.button')
            .addEventListener('click', this.handleDeleteFlick.bind(this, flick))
        
        return item
    }

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
    }

    handleDeleteFlick(flick, ev) {
        // Remove item from the DOM
        const item = ev.target.closest('.flick')
        item.remove()

        // Remove item from the Array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i, 1)
        
        console.log('Delete Flick')
    }
}

const app = new App
app.init({
    flickForm: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})