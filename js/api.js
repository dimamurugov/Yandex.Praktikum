class Api {
    constructor(options) {
        this.options = options;
        
    }
  
    getInitialCards() {
      
    }
    
    getAboutMe() {
        
        return fetch('https://praktikum.tk/cohort11/users/me', {
            headers: {
                authorization: '8a9e37f1-9e18-44ec-b047-b5ce93ddaf7f'
              }
        })
    }
    getMassCards() {
        return fetch('https://praktikum.tk/cohort11/cards',{
            headers: {
                authorization: '8a9e37f1-9e18-44ec-b047-b5ce93ddaf7f'
            }
        })
    }
    putEditСhangesProfile(name, about) {
        return fetch('https://praktikum.tk/cohort11/users/me', {
            method: 'PATCH',
            headers: {
              authorization: '8a9e37f1-9e18-44ec-b047-b5ce93ddaf7f',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
        });
    }
}
  