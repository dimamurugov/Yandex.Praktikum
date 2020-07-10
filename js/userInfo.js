class UserInfo {
    constructor(name, description, getInfoAboutMe) {

        this.name = name;
        this.description = description;
        this.getInfoAboutMe = getInfoAboutMe;

        this.nameProfile = this.name.textContent;//хранилище имени
        this.descriptionProfile = this.description.textContent;//хранилище описания
        
        this.downloadUserInfo();
    }
    
    //это старый метод?
    setUserInfo(name, description) { 
        this.nameProfile = name;
        this.descriptionProfile = description;
    }   
    //обновление данный только на клиенте!!
    updateUserInfo() {
        this.name.textContent = this.nameProfile;   
        this.description.textContent = this.descriptionProfile;
    }
    //метод для получение данных с страницы для формы
    getUserInfo() {
        return {name: this.nameProfile, description: this.descriptionProfile}
    }

    downloadUserInfo() { 
        this.getInfoAboutMe()
        .then((res) => { return res.json()})
        .then((data) => {
            this.nameProfile = data.name;
            this.descriptionProfile = data.about;
        })
        .then(() => {this.updateUserInfo()})
    }   
}