const {model, Schema} = require("mongoose");

const LinkSchema = new Schema({
	originalUrl: {type: String, require: true, unique: true},
	shortUrl: {type: String, require: true, unique: true},
}, {
	timestamps: false,
	versionKey: false,
});

module.exports = model("Link", LinkSchema);
