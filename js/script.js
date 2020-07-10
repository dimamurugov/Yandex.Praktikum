(function() {
    //КОНСТАНТЫ

    const placesList = document.querySelector('.places-list');

    const popupImage = document.querySelector('.popup_theme_image');

    const nameProfile = document.querySelector('.user-info__name');
    const descriptionProfile = document.querySelector('.user-info__job');

    const FormAdd = document.querySelector('.popup__form_add');
    const FormEdit = document.querySelector('.popup__form_edit');

    const popupAdd = document.querySelector('.popup_theme_add-card');
    const popupEdit = document.querySelector('.popup_theme_edit-popup');

    const buttonAdd = document.querySelector('.user-info__button');
    const buttonEdit = document.querySelector('.user-info__edit-button');

    function _createCard(data) {
        const newCard = new Card(data, openImage, _deleteCard, _putLikeCard,_deleteLikeCard, _getUserProfile, _getCard);
        return newCard.create(data)
    }

    //КолБэк функции
    function openImage(link) {
        imagePopup.render(link);
    }

    function _updateEditProfile(name, descriprion) {
        userInfo.setUserInfo(name, descriprion);
        userInfo.updateUserInfo();
    }

    function _getUserProfile() {
        return userInfo.getUserInfo();
    }
    
    

    function _setSubmitButtonState() {
        validatorEditForm.setSubmitButtonState(this.form.button, true);
    }

    function _setSubmitButtonStateAddForm() {
        validatorAddForm.setSubmitButtonState(this.form.button, false);
    }

    //колбэк Для очистки в ErrorMassege в форме редактирования профиля
    function _clearErrorMassegeAddCard() {
        validatorAddForm._clearErrorMassege();
    }
    //колбэк Для очистки в ErrorMassege в форме добавления карточки
    function _clearErrorMassegeEditProfile() {
        validatorEditForm._clearErrorMassege();
    }

    function getInfoAboutMe() {
        return api.getAboutMe()
    }  
    function getMassCards() {
        return api.getMassCards();
    }
    function _putEditСhangesProfile(name, about) {
        api.putEditСhangesProfile(name, about);
    }
    function _putServerCard(name, link) {
        api.putServerCard(name,link);
    }
    function _deleteCard(idCard) {
        api.deleteCard(idCard);
    }
    function _putLikeCard(idCard) {
        api.putLikeCard(idCard);
    }
    function _deleteLikeCard(idCard) {
        api.deleteLikeCard(idCard);
    }
    function _getCard(idCard) {
        return api.getCard(idCard)
    }
    const api = new Api({
        baseUrl: 'https://praktikum.tk/cohort11',
        headers: {
          authorization: '8a9e37f1-9e18-44ec-b047-b5ce93ddaf7f',
          'Content-Type': 'application/json'
        }
    });

    
    const containerList = new CardList(placesList, _createCard, getMassCards);
    containerList.render();

    const userInfo = new UserInfo(nameProfile, descriptionProfile, getInfoAboutMe);

    const imagePopup = new ImagePopup(popupImage);
    imagePopup.setListeners();


    
    const validatorEditForm = new FormValidator(FormEdit);
    const profileFormInst = new FormPopup(popupEdit, FormEdit, buttonEdit, _setSubmitButtonState, _clearErrorMassegeEditProfile);

    const validatorAddForm = new FormValidator(FormAdd);
    const cardFormInst = new FormPopup(popupAdd, FormAdd, buttonAdd, _setSubmitButtonStateAddForm, _clearErrorMassegeAddCard);

    profileFormInst.openForm = () => {

        profileFormInst.open();
        const tempData = _getUserProfile();
        profileFormInst.form.elements.nameField.value = tempData.name;
        profileFormInst.form.elements.description.value = tempData.description;


        profileFormInst.doOnOpenForm();
        profileFormInst.setListeners();
    }

    profileFormInst.submitForm = (event) => {
        event.preventDefault();
        _putEditСhangesProfile(profileFormInst.form.elements.nameField.value, profileFormInst.form.elements.description.value);
        _updateEditProfile(profileFormInst.form.elements.nameField.value, profileFormInst.form.elements.description.value);
        profileFormInst.close();
    }



    cardFormInst.openForm = () => {

        cardFormInst.open()
        cardFormInst.doOnOpenForm();
        cardFormInst.setListeners();

    }

    cardFormInst.submitForm = () => {

        event.preventDefault();

        const temp = _createCard({
            name: cardFormInst.form.elements.name.value,
            link: cardFormInst.form.elements.link.value,
            likes: []
        });
        containerList.addCard(temp);
        _putServerCard(cardFormInst.form.elements.name.value, cardFormInst.form.elements.link.value);
        cardFormInst.close();
    }

    profileFormInst.setListenersForm();
    cardFormInst.setListenersForm();
    
})();


