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
        
        const nameSpan = item.querySelector('.flickName')
        nameSpan.textContent = flick.name
        nameSpan.addEventListener('keypress', this.handleSaveOnEnter.bind(this, flick))

        item
            .querySelector('.del.button')
            .addEventListener('click', this.handleDeleteFlick.bind(this, flick))

        item
            .querySelector('.fav.button')
            .addEventListener('click', this.handleFavFlick.bind(this, flick))

        item
            .querySelector('.edit.button')
            .addEventListener('click', this.handleEditFlick.bind(this, flick))

        return item
    }

    handleSubmit(ev) {
        ev.preventDefault()

        const form = ev.target
        const flick = {
            id: ++this.max,
            name: form.flickName.value,
            fav: false,
        }

        this.flicks.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstElementChild)

        console.log(flick)
        form.reset()
    }

    handleSaveOnEnter(flick, ev) {
        if(ev.key === 'Enter') {
            this.handleEditFlick(flick, ev)
        }
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

    handleFavFlick(flick, ev) {
        const item = ev.target.closest('.flick')
        flick.fav = item.classList.toggle('favorite')
        
        console.log("Fav Flick")
    }

    handleEditFlick(flick, ev) {
        const item = ev.target.closest('.flick')
        const btn = item.querySelector('.edit.button')
        const nameField = item.querySelector('.flickName')

        if (nameField.isContentEditable) {
            nameField.contentEditable = false
            btn.textContent = 'edit'
            btn.classList.remove('success')

            // Save the content
            flick.name = nameField.textContent

        } else {
            nameField.contentEditable = true
            nameField.focus()
            btn.textContent = 'save'
            btn.classList.add('success')
        }
        

    }
}

const app = new App()
app.init({
    flickForm: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
})