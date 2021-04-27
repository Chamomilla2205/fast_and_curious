const fs = require('fs');
const path = require('path');
const {Sequelize, DataTypes} = require('sequelize');

module.exports = (() => {
    let instance;
    const initialConnect = () => {
        const client = new Sequelize('test-task', 'root', 'root', {dialect: 'mysql'});

        const models = {};
        const pathToModels = path.join(process.cwd(), 'dataBase', 'My_SQL', 'models');

        const getModels = () => {
            fs.readdir('models', (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    const modelFile = require(path.join(pathToModels, model));
                    models[model] = modelFile(client, DataTypes)
                })
            })
        }
        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName]
        }
    }

    return {
        getInit: () => {
            if (!instance) {
                instance = initialConnect()
            }
            return instance;
        }
    }
})();

