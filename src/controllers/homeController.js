const Produto = require('../models/ProdutoModel')

exports.index = async (req, res) => {
    const produtos = await Produto.buscaProdutos();
    res.render('index', { produtos })
};
  
 