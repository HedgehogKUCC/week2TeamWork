module.exports = class ValidateArticleList {
    constructor(data) {
        const {
            userName,
            userContent,
            userPhoto,
            imgUrl,
        } = data;
        this.userName = userName;
        this.userContent = userContent;
        this.userPhoto = userPhoto;
        this.imgUrl = imgUrl;
        this.errorMsg = '';
    }

    hasErrorMsg() {
        return !!this.errorMsg;
    }

    regexTest(str) {
        let regex = /['\-<>]/g;
        return regex.test(str);
    }

    validateUserName() {
        if ( !this.userName ) {
            this.errorMsg = 'userName property is required';
            return;
        }

        if ( this.regexTest(this.userName) ) {
            this.errorMsg = 'userName do not use special symbol dash(-)';
        }
    }

    validateUserContent() {
        if ( this.errorMsg ) {
            return;
        }

        if ( !this.userContent ) {
            this.errorMsg = 'userContent property is required';
            return;
        }

        if ( this.regexTest(this.userContent) ) {
            this.errorMsg = 'userContent do not use special symbol dash(-)';
        }
    }

    validateUserPhoto() {
        if ( this.errorMsg ) {
            return;
        }

        if ( this.regexTest(this.userPhoto) ) {
            this.errorMsg = 'userPhoto do not use special symbol dash(-)';
        }
    }

    validateImgUrl() {
        if ( this.errorMsg ) {
            return;
        }

        if ( this.regexTest(this.imgUrl) ) {
            this.errorMsg = 'imgUrl do not use special symbol dash(-)';
        }
    }

    start() {
        this.validateUserName();
        this.validateUserContent();
        this.validateUserPhoto();
        this.validateImgUrl();
    }
}
