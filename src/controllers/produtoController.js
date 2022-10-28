const Produto = require('../models/ProdutoModel');

exports.index = (req, res) => {
    res.render('produto', {
        produto: {}
    });
};

exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const produto = await Produto.buscaPorId(req.params.id);
    if(!produto) return res.render('404');

    res.render('produto', { produto });
}

exports.register = async (req, res) => {
    try {
        const produto = new Produto(req.body); 
        await produto.register();

        if(produto.errors.length > 0) {
            req.flash('errors', produto.errors);
            req.session.save(() => res.redirect('/produto/index'));
            return;
    } 

    req.flash('success', 'Produto registrado com Sucesso!');
        req.session.save(() => res.redirect(`/produto/index/${produto.produto._id}`));
        return;
    } catch (e) {
        console.log(e);
        res.render('404')
    }
    
};