class CardList {
    constructor(container, createCard, getMassCards) {
        this.container = container;
        this._createCard = createCard;
        this.getMassCards = getMassCards;
    }

    addCard(element) {
        this.container.appendChild(element);
    }

    render() {
        this.getMassCards()
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                this.addCard(this._createCard(element))
            });
        })
    }
}