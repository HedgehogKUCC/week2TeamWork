const mongoose = require('mongoose');

const ArticleListSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "【姓名】必填"],
        },
        userContent: {
            type: String,
            required: [true, "【內容】必填"],
        },
        userPhoto: String,
        createAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        versionKey: false,
    }
)

const ArticleListModel = mongoose.model('ArticleList', ArticleListSchema);

module.exports = ArticleListModel;
