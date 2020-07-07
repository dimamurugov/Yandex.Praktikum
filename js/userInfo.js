class UserInfo {
    constructor(name, description, getInfoAboutMe) {

        this.name = name;
        this.description = description;
        this.getInfoAboutMe = getInfoAboutMe;

        this.nameProfile = this.name.textContent;
        this.descriptionProfile = this.description.textContent;
        
        this.downloadUserInfo();
    }
    
    setUserInfo(name, description) { 
        this.nameProfile = name;
        this.descriptionProfile = description;
    }   
    
    updateUserInfo() {
        this.name.textContent = this.nameProfile;   
        this.description.textContent = this.descriptionProfile;
    }

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