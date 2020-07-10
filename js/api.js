class Api {
    constructor(options) {
        this.options = options;
    }
  
  
    
    getAboutMe() {
        return fetch('https://praktikum.tk/cohort11/users/me', {
            headers: {
                authorization: this.options.headers.authorization
              }
        })
    }
    getMassCards() {
        return fetch('https://praktikum.tk/cohort11/cards',{
            headers: {
                authorization: this.options.headers.authorization
            }
        })
    }
    getCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/${idCard}`, {
            headers: {
                authorization: this.options.headers.authorization
            }})
    }
    putEditСhangesProfile(name, about) {
        return fetch('https://praktikum.tk/cohort11/users/me', {
            method: 'PATCH',
            headers: {
              authorization: this.options.headers.authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        }).then(res => {
            return res.json()
        }
        ); 
    }
    putServerCard(name, link) {
        return fetch('https://praktikum.tk/cohort11/cards', {
            method: 'POST',
            headers: {
                authorization: this.options.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
    }
    deleteCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
    }
    putLikeCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/like/${idCard}`,{
            method: 'PUT',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
    }
    deleteLikeCard(idCard) {
        return fetch(`https://praktikum.tk/cohort11/cards/like/${idCard}`, {
            method: 'DELETE',
            headers: {
                authorization: this.options.headers.authorization
            }
        })
    }
}
  