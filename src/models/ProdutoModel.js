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
        if(0 > this.body.preco) this.errors.push('O preço deve ser maior que R$ 0,00')
        if(!this.body.codigo) this.errors.push('o código é um campo obrigatório!')
        if(this.body.quantidade < 1) this.errors.push('A Quantidade de produtos deve ser de no mínimo 1')


        if(!this.body.preco) {
            this.errors.push('O preco é um campo obrigatório!')

            if(typeof this.body.preco !== 'number'){
                this.errors.push('O preço deve ser um número válido!')
            }
        }
        
        
        if(!this.body.quantidade) {
            this.errors.push('A quantidade é um campo obrigatório!')

            if(typeof this.body.quantidade !== 'number'){
                this.errors.push('A quantidade deve ser um número válido!')
            }
            
        }

    }

    async edited(id) {
        if(typeof id !== 'string') return;
        this.valida();

        if(this.errors.length > 0) return;
        this.produto = await ProdutoModel.findByIdAndUpdate(id, this.body, { new: true });
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
    if(typeof id !== 'string') return;
    const produto = await ProdutoModel.findById(id);
    return produto;
}

Produto.buscaProdutos = async function() {
    const produto = await ProdutoModel.find()
    .sort({ criadoEm: -1 });
    return produto;
}

Produto.delete = async function(id) {
    if(typeof id !== 'string') return;
    const produto = await ProdutoModel.findOneAndDelete({ id: id });
    return produto;
}



module.exports = Produto;