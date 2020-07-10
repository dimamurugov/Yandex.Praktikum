class Card {
  constructor(data, openImage, _deleteCard, _putLikeCard,_deleteLikeCard,  _getUserProfile, _getCard) {
        this.data = data;
        this.openImage = openImage;
        this._deleteCard = _deleteCard;
        this._putLikeCard = _putLikeCard;
        this._deleteLikeCard = _deleteLikeCard;
        this._getUserProfile = _getUserProfile;
        this._getCard = _getCard;
        
        console.log(this.data);
        this.placeCard = null;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.showImagePopup = this.showImagePopup.bind(this);
    }

    create() {
      const template = document.createElement("div");

      template.insertAdjacentHTML('beforeend', `
      <div class="place-card">
      <div class="place-card__image" style="background-image:">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <div class="place-card__container-like">
          <button class="place-card__like-icon"></button>
          <p class="place-card__like-counter">0</p>
        </div>      
        
      </div>
      </div>` );

      this.placeCard = template.firstElementChild;
      this.placeCard.querySelector(".place-card__name").textContent = this.data.name;
      this.placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.data.link})`;
      this.placeCard.querySelector(".place-card__like-counter").textContent = this.data.likes.length;

      //ставим лайк, если я уже лайкал эту картинку
      if (this.isILiked() === undefined) {
        this.placeCard.querySelector(".place-card__like-icon").classList.remove('place-card__like-icon_liked');
      } else {
        this.placeCard.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');
      }

      this.setListeners();
      return this.placeCard;
    }

    like() {
    // this._getCard(this.data._id).then((res) => {
    //     return res.json()
    // }).then((data) => {
    //     data.find((item) => {
    //         return item._id == idCard
    //     })
    // });
      console.log(this._getCard(this.data._id));
      
      // if (this.placeCard.querySelector(".place-card__like-icon").classList.contains('place-card__like-icon_liked')) {
      //   this.placeCard.querySelector(".place-card__like-icon").classList.remove('place-card__like-icon_liked');
        
      //   this.placeCard.querySelector(".place-card__like-counter").textContent = this._getCard(data._id) - 1;
      //   this._deleteLikeCard(this.data._id);
      // } else {
      //   this.placeCard.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');
        
      //   this.placeCard.querySelector(".place-card__like-counter").textContent = this.data.likes.length + 1;
      //   this._putLikeCard(this.data._id);
      // }
    }

    
    remove() {
      this.removeListernes();
      const selectCard = this.placeCard.closest('.place-card');
      
      if (window.confirm("Вы действительно хотите удалить эту картоку?")) {
        this._deleteCard(this.data._id);
      }
      selectCard.remove();
    }
    showImagePopup() {
      this.openImage(this.data.link);
    }
    isILiked() {
      const myName = this._getUserProfile().name;
      return this.data.likes.find((item) => {
        return item.name == myName
      });
    }
    setListeners() {
      this.placeCard.querySelector(".place-card__like-icon").addEventListener("click", this.like);
      this.placeCard.querySelector(".place-card__delete-icon").addEventListener("click", this.remove);
      this.placeCard.querySelector(".place-card__image").addEventListener("click", this.showImagePopup);
    }

    removeListernes() {
      this.placeCard.querySelector(".place-card__like-icon").removeEventListener("click", this.like);
      this.placeCard.querySelector(".place-card__delete-icon").removeEventListener("click", this.remove);
      this.placeCard.querySelector(".place-card__image").removeEventListener("click", this.showImagePopup);
    }
}