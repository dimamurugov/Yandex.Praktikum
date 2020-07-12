class UserInfo {
    constructor(name, description, avatar, getInfoAboutMe) {

        this.name = name;
        this.description = description;
        this.avatar = avatar;
        this.getInfoAboutMe = getInfoAboutMe;
        let myId;
        
        this.nameProfile = this.name.textContent;
        this.descriptionProfile = this.description.textContent;
        this.avatarProfile = this.avatar.src;
        
        this.downloadUserInfo();
    }
    _getMyId() {
        return this.myId
    }
    
    setUserInfo(name, description) { 
        this.nameProfile = name;
        this.descriptionProfile = description;
    }   

    //обновление данный только на клиенте!!
    updateUserInfo() {
        this.name.textContent = this.nameProfile;   
        this.description.textContent = this.descriptionProfile;
        this.avatar.src = this.avatarProfile;
    }

    //метод для получение данных с страницы для формы
    getUserInfo() {
        return {name: this.nameProfile, description: this.descriptionProfile}
    }

    downloadUserInfo() { 
        this.getInfoAboutMe()
        .then((res) => { return res.json()})
        .then((data) => {
        
            this.myId = data._id;
            this.nameProfile = data.name;
            this.descriptionProfile = data.about;
            this.avatarProfile = data.avatar;
        })
        .then(() => {this.updateUserInfo()})
    }   
}