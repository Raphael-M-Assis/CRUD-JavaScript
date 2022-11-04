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
            req.session.save(() => res.redirect('back'));
            return;
    } 

    req.flash('success', 'Produto registrado com Sucesso!');
        req.session.save(() => res.redirect('/'));
        return;
    } catch (e) {
        console.log(e);
        res.render('404')
    }
    
};

exports.edited = async (req, res) => {
    try {
        
    if(!req.params.id) return res.send('Cai no inicio');
    const produto = new Produto(req.body);
    await produto.edited(req.params.id);

    if(produto.errors.length > 0) {
        req.flash('errors', produto.errors);
        req.session.save(() => res.redirect('/produto/index'));
        return;
    };

    req.flash('success', 'Produto editado com Sucesso!');
    req.session.save(() => res.redirect('/'))
    return;

    } catch (e) {
        res.send('Cai no catch');
    };
};

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404');

    const produto = await Produto.delete(req.params.id);
    if(!produto) return res.render('404');

    req.flash('success', 'Produto apagado com sucesso!');
    req.session.save(() => res.redirect('back'))
    return;
};