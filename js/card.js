class Card {
  /*
    + почитал про подчёркивания, убрал где это явлется методом класса или параметром

  REVIEW2. Молодец, что почитали! У названия метода класса может быть подчёркивание, но только тогда, когда этот метод вызывается только внутри других методов
  класса (такие методы и называются защищёнными) и не вызывается вне кода класса, например в файле-точке входа проекта script.js вместе
  с экземпляром класса.
  */
  constructor(data, openImage) {
        this.data = data;
        this.openImage = openImage;


        this.placeCard = null;
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.showImagePopup = this.showImagePopup.bind(this);
    }

    create(data) {
      const template = document.createElement("div");

      template.insertAdjacentHTML('beforeend', `
      <div class="place-card">
      <div class="place-card__image" style="background-image:">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>
      </div>` );

      this.placeCard = template.firstElementChild;

      this.placeCard.querySelector(".place-card__name").textContent = this.data.name;
      this.placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${this.data.link})`;

      this.setListeners();
      return this.placeCard;
    }

    like() {
      this.placeCard.querySelector(".place-card__like-icon").classList.toggle('place-card__like-icon_liked');
    }
    remove() {
      this.removeListernes();
      const selectCard = this.placeCard.closest('.place-card');
      selectCard.remove();
    }
    showImagePopup() {
      this.openImage(this.data.link);
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