const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path('/uploads'))
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname.split('.')[0];
        const ext = file.originalname.split(".").pop()
        cb(null, file.fieldname + '-' + originalName + '-' + Date.now() + '.' + ext)
    }
})

const upload = multer({
    storage
});

module.exports = upload;