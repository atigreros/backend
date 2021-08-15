import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {type: String, require:true, max: 60},
    price: {type: Number, require:true},
    thumbnail: {type: String, require:true, max: 200}
});


const ProductModel = mongoose.model('products', ProductSchema);

export default class persistenceMongo {
    constructor() {
        ;( async () => {
            try {
                await mongoose.connect('mongodb://localhost/mvc', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useFindAndModify: false,
                    useCreateIndex: true
                });
                console.log('Base de datos conectada')
            }
            catch(error) {
                console.log(error)
            }
        })()
    }
    getProducts = async () => {
        try {
            return await ProductModel.find({}).lean()
        }
        catch(error) {
            console.log(error)
        }
    }
    addProduct = async product => {
        try {
            const instance = new ProductModel(product);
            await instance.save()
        }
        catch(error) {
            console.log(error)
        }
    }
}


