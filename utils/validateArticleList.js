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
            this.errorMsg = '【發文者名稱】必填';
            return;
        }

        if ( this.regexTest(this.userName) ) {
            this.errorMsg = '【發文者名稱】請勿使用特殊符號 -';
        }
    }

    validateUserContent() {
        if ( this.errorMsg ) {
            return;
        }

        if ( !this.userContent ) {
            this.errorMsg = '【貼文內容】必填';
            return;
        }

        if ( this.regexTest(this.userContent) ) {
            this.errorMsg = '【貼文內容】請勿使用特殊符號 -';
        }
    }

    validateUserPhoto() {
        if ( this.errorMsg ) {
            return;
        }

        if ( this.regexTest(this.userPhoto) ) {
            this.errorMsg = '【發文者照片】請勿使用特殊符號 -';
        }
    }

    validateImgUrl() {
        if ( this.errorMsg ) {
            return;
        }

        if ( this.regexTest(this.imgUrl) ) {
            this.errorMsg = '【圖片網址】請勿使用特殊符號 -';
        }
    }

    start() {
        this.validateUserName();
        this.validateUserContent();
        this.validateUserPhoto();
        this.validateImgUrl();
    }
}
