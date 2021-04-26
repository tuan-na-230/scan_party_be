const fileUploadModel = require("./model");

const fileUploadHandler = {
    async uploadExcel(req, res, next) {
        if (req.file) {
            try {
                const data = {
                    name: req.file.filename,
                    path: `${process.env.DOMAIN}/uploads/excels/${req.file.filename}`,
                    user: req.body.id,
                    type: req.body.type,
                };
                const item = await fileUploadModel.create(data);
                if (item) {
                    res.status(200).json({ message: "upload_success", data: item });
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.status(404).json({ message: "required_file" });
        }
    },

    async uploadNewAvatar(dataInput) {
        try {
            const data = {
                name: dataInput.filename,
                path: dataInput.path,
                user: dataInput.id,
                type: dataInput.type
            };
            fileUploadModel.create(data);
        } catch (error) {
            next(error)
        }
    },

    async getListFileExcel(req, res, next) {
        if (req.body) {
            try {
                let { page = 1, size = 10, sort = "asc", sortBy = "name" } = req.query;
                page = parseInt(page);
                size = parseInt(size);

                const skip = page * size;
                const limit = size;
                const item = await fileUploadModel
                    .find({ type: 'excel', user: req.params.id })
                    .skip(skip)
                    .limit(limit);
                const count = await fileUploadModel.find({ type: 'excel', user: req.params.id }).count();
                if (item) {
                    res.status(200).json({
                        content: item,
                        pagination: { page: page, size: size, total: count },
                    })
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.status(404).json({ message: "required_file" });
        }
    },

    async getListFileImage(req, res, next) {
        if (req.body) {
            try {
                let { page = 1, size = 10, sort = "asc", sortBy = "name" } = req.query;
                page = parseInt(page);
                size = parseInt(size);

                const skip = page * size;
                const limit = size;
                const item = await fileUploadModel
                    .find({ type: 'image', user: req.params.id })
                    .skip(skip)
                    .limit(limit);
                const count = await fileUploadModel.find({ type: 'image', user: req.params.id }).count();
                if (item) {
                    res.status(200).json({
                        content: item,
                        pagination: { page: page, size: size, total: count },
                    })
                }
            } catch (error) {
                next(error)
            }
        } else {
            res.status(404).json({ message: "required_file" });
        }
    }
};

module.exports = fileUploadHandler;
