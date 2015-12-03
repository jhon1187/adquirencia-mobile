/* Exemplo de uso: oninput="mask(this,Telefone);" */

var v_obj = {};
var v_fun = {};

/*Função Pai de Mascaras*/
function mask(o, f) {
	v_obj = o;
	v_fun = f;
	execMask();
	return false;
}

/*Função que Executa os objetos*/
function execMask() {
	v_obj.value = v_fun(v_obj.value);
	return false;
}

function Porcentagem100(v) {
	var value = Integer(v);
	if (value) {
		var valueAsInt = parseInt(value, 10);
		if (valueAsInt > 100) {
			var newLength = value.length - 1;
			return value.substr(0, newLength);
		}
	}
	return value;
}

/*Função que permite apenas numeros*/
function Integer(v) {
	return v.replace(/\D/g, "");
}

function Telefone(v) {
	v = v.replace(/\D/g, "");

	if (v.length > 10) {
		return Telefone5Digito(v);
	}
	return Telefone4Digito(v);
}

/*Função que padroniza telefone (11) 4184-1241*/
function Telefone4Digito(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
	v = v.replace(/(\d{4})(\d)/, "$1-$2");

	v = maxLength(v, 14);
	return v;
}

/*Função que padroniza telefone (11) 4184-1241*/
function Telefone5Digito(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/^(\d\d)(\d)/g, "($1) $2");
	v = v.replace(/(\d{5})(\d)/, "$1-$2");

	v = maxLength(v, 15);
	return v;
}

function maxLength(v, l) {
	if (v.length > l) {
		return v.substring(0, l);
	}
	return v;
}

function CpfCnpj(v) {
	v = v.replace(".", "");
	v = v.replace("/", "");
	v = v.replace("-", "");
	if (v.length > 12) {
		return Cnpj(v);
	}
	return Cpf(v);
}

/*Função que padroniza CPF*/
function Cpf(v) {
	if (v) {
		v = v.replace(/\D/g, "");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d)/, "$1.$2");
		v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

		v = maxLength(v, 14);

		return v;
	}
	return null;
}

/*Função que padroniza CNPJ*/
function Cnpj(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/^(\d{2})(\d)/, "$1.$2");
	v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
	v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
	v = v.replace(/(\d{4})(\d)/, "$1-$2");

	v = maxLength(v, 18);

	return v;
}

/*Função que padroniza CEP*/
function Cep(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/^(\d{2})(\d)/, "$1.$2");
	v = v.replace(/(\d{3})(\d)/, "$1-$2");

	v = maxLength(v, 10);

	return v;
}

/*Função que padroniza DATA*/
function Data(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/(\d{2})(\d)/, "$1/$2");
	v = v.replace(/(\d{2})(\d)/, "$1/$2");

	v = maxLength(v, 10);

	return v;
}

/*Função que padroniza Hora*/
function Hora(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/(\d{2})(\d)/, "$1:$2");

	v = maxLength(v, 5);

	return v;
}

function RemoveZeroEsquerda(v){
	var first = v.substring(0, 1);
	if(first=="0" && v.length >3){
		return RemoveZeroEsquerda(v.substring(1, v.length));
	}
	return v;
}

/*Função que padroniza valor monétario*/
function Valor(v) {
	v = v.replace(/\D/g, "");
	v = RemoveZeroEsquerda(v);
	//Remove tudo o que não é dígito
	v = v.replace(/(\d{1})(\d{20})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{17})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{14})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{11})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{8})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{5})$/, "$1.$2");
	v = v.replace(/(\d{1})(\d{1,2})$/, "$1,$2");

	return v;
}