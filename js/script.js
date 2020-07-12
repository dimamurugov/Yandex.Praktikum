(function() {
    
    //КОНСТАНТЫ
    const placesList = document.querySelector('.places-list');

    const popupImage = document.querySelector('.popup_theme_image');

    const nameProfile = document.querySelector('.user-info__name');
    const descriptionProfile = document.querySelector('.user-info__job');

    const FormAdd = document.querySelector('.popup__form_add');
    const FormEdit = document.querySelector('.popup__form_edit');
    const FormAvatar = document.querySelector('.popup__form_avatar');

    const popupAdd = document.querySelector('.popup_theme_add-card');
    const popupEdit = document.querySelector('.popup_theme_edit-popup');
    const popupAvatar = document.querySelector('.popup_theme_avatar');
    
    const buttonAdd = document.querySelector('.user-info__button');
    const buttonEdit = document.querySelector('.user-info__edit-button');
    const buttonAvatar = document.querySelector('.user-info__photo');



    function _createCard(data) {
        const newCard = new Card(data, openImage, _deleteCard, _putLikeCard,_deleteLikeCard, _getUserProfile, _getMyID);
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
    function _setSubmitButtonStateAvatar() {
        validatorAvatarForm.setSubmitButtonState(this.form.button, false);
    }
    function _clearErrorMassegeAddCard() {
        validatorAddForm._clearErrorMassege();
    }

    function _clearErrorMassegeEditProfile() {
        validatorEditForm._clearErrorMassege();
    }
    
    function _clearErrorMassegeAvatar() { 
        validatorAvatarForm._clearErrorMassege();
    }

    function getInfoAboutMe() {
        return api.getAboutMe()
    }  
    function getMassCards() {
        return api.getMassCards();
    }
    function _putEditСhangesProfile(name, about) {
        return api.putEditСhangesProfile(name, about);
    }
    function _putServerCard(name, link) {
        return api.putServerCard(name,link);
    }
    function _deleteCard(idCard) {
        return api.deleteCard(idCard);
    }
    function _putLikeCard(idCard) {
        return api.putLikeCard(idCard);
    }
    function _deleteLikeCard(idCard) {
        return api.deleteLikeCard(idCard);
    }
   
    function _uploadAvatar(link) {
        return api.uploadAvatar(link)
    }
    function _getMyID() {
        return userInfo._getMyId()
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

    const userInfo = new UserInfo(nameProfile, descriptionProfile,buttonAvatar, getInfoAboutMe);

    const imagePopup = new ImagePopup(popupImage);
    imagePopup.setListeners();

    
    const validatorEditForm = new FormValidator(FormEdit);
    const profileFormInst = new FormPopup(popupEdit, FormEdit, buttonEdit, _setSubmitButtonState, _clearErrorMassegeEditProfile);

    const validatorAddForm = new FormValidator(FormAdd);
    const cardFormInst = new FormPopup(popupAdd, FormAdd, buttonAdd, _setSubmitButtonStateAddForm, _clearErrorMassegeAddCard);
    
    const validatorAvatarForm = new FormValidator(FormAvatar);//создай колбэки и отправь в класс
    const avatarFormInst = new FormPopup(popupAvatar, FormAvatar, buttonAvatar, _setSubmitButtonStateAvatar, _clearErrorMassegeAvatar);

    avatarFormInst.openForm = () => {
        avatarFormInst.open();
        avatarFormInst.doOnOpenForm();
        avatarFormInst.setListeners();
    }

    avatarFormInst.submitForm = () => {
        event.preventDefault();
        avatarFormInst.form.elements.button.textContent = 'Загрузка...';
        _uploadAvatar(avatarFormInst.form.elements.linkField.value)
        .then((res) => { return res.json() })
        .then((data) => { 
            buttonAvatar.src = data.avatar;
            avatarFormInst.close();
            profileFormInst.form.elements.button.textContent = 'Сохранить';
        })
        
    }

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
        profileFormInst.form.elements.button.textContent = 'Загрузка...';
        _putEditСhangesProfile(profileFormInst.form.elements.nameField.value, profileFormInst.form.elements.description.value)
        .then(res => {
            return res.json();
            
        })
        .then(() => {
            _updateEditProfile(profileFormInst.form.elements.nameField.value, profileFormInst.form.elements.description.value);
            profileFormInst.close();
            profileFormInst.form.elements.button.textContent = 'Сохранить';
        }); 
    }



    cardFormInst.openForm = () => {

        cardFormInst.open()
        cardFormInst.doOnOpenForm();
        cardFormInst.setListeners();

    }

    cardFormInst.submitForm = () => {

        event.preventDefault();
        cardFormInst.form.elements.button.textContent = 'Загрузка...';
        
        _putServerCard(cardFormInst.form.elements.name.value, cardFormInst.form.elements.link.value)
        .then((res) => {
            if (res.ok) {
                return res.json()    
            }
        })
        .then((data) => {
            
            const temp = _createCard(data);
            containerList.addCard(temp);
            
            cardFormInst.close();
            cardFormInst.form.elements.button.textContent = '+';
        });
    }

    profileFormInst.setListenersForm();
    cardFormInst.setListenersForm();
    avatarFormInst.setListenersForm();
    
})();


