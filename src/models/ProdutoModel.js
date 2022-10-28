const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    preco: { type: Number, required: true },
    quantidade: { type: Number, required: true },
    codigo: { type: String, required: true },
    criadoEm: { type: Date, default: Date.now }
});

const ProdutoModel = mongoose.model('Produto', ProdutoSchema);

class Produto {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.produto = null;
    };
    
    async register() {
        this.valida();

        if(this.errors.length > 0) return;

        this.produto = await ProdutoModel.create(this.body);
    };

    // async buscaPorId(id) {
    //     const prod = await ProdutoModel.findById(id);
    //     return prod;
    // }
    
    valida() {
        this.cleanUp();

        if(!this.body.nome) this.errors.push('o nome é um campo obrigatório!')
        if(!this.body.codigo) this.errors.push('o código é um campo obrigatório!')

        if(!this.body.preco) {
            this.errors.push('O preco é um campo obrigatório!')

            if(typeof this.body.preco !== 'number'){
                this.errors.push('O preco deve ser um número válido!')
            }
        } 
        if(!this.body.quantidade) {
            this.errors.push('A quantidade é um campo obrigatório!')

            if(typeof this.body.quantidade !== 'number'){
                this.errors.push('A quantidade deve ser um número válido!')
            }
        } 
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        };

        this.body = {
            nome: this.body.nome,
            preco: this.body.preco,
            quantidade: this.body.quantidade,
            codigo: this.body.codigo
        }
    };
};

Produto.buscaPorId = async function(id) {
    const prod = await ProdutoModel.findById(id);
    return prod
}



module.exports = Produto;