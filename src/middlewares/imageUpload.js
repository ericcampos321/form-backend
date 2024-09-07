const multer = require("multer");
const path = require("path");

//Destination to store
const imageStorage = multer.diskStorage({
  /**
   * Define the destination to store the images, based on the request route
   * @param {Express.Request} req - The Express request object
   * @param {Multer.File} file - The Multer file object
   * @param {Function} cb - The callback function
   */
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users"
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos"
    }
    cb(null, `${__dirname}/../uploads/${folder}/`)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {

      //upload only png and jpg formts
      return cb(new Error("Por favor, Envie apenas imagens com as extensões (jpg, jpeg, png)"))
    }
    cb(undefined, true)
  }
})

module.exports = {
  imageUpload,
}