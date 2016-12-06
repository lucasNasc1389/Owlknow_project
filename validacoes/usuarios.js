var url = require('url');

module.exports = function(req, res,app){
	var createUrl = url.parse(req.url).pathname == "/";
	var updateUrl = !createUrl;

	req.assert('nome', 'Informe o seu nome.').notEmpty();
	if(createUrl){
		req.assert('email', 'E-mail inválido').isEmail();
		req.assert('senha', 'Sua senha deve conter de 6 a 10 caracteres.').len(6,10);
	}

	var validateErros = req.validationErrors() || [];

	// Verificar se a senhas batem
	if(req.body.senha != req.body.confirma_senha){
		validateErros.push({msg:'As senhas não batem'})
	}

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});

		return false;
	}else{
		return true;
	}
}