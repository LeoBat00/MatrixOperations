
//Trabalho de algebra 


//CLASSES  
    
class Matriz{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;

        let matriz = new Array(rows);
        
        for(var i = 0; i < rows; i++){
            matriz[i] = new Array(cols);
        }

        this.matriz = matriz;
    }

    getRows(){
        return this.rows;
    }
    
    getCols(){
        return this.cols;
    }

}

//BUBBLE SORT 

let bubbleSort = (matriz, termosInd) => {
    let k = matriz.matriz.length;
    var aux;
    for (let i = 0; i < (k - 1); i++) {
        for (let j = 0; j < (k - 1); j++) {
            if (matriz.matriz[j][0] < matriz.matriz[j + 1][0]) {
                aux = matriz.matriz[j];
                matriz.matriz[j] = matriz.matriz[j + 1];
                matriz.matriz[j + 1] = aux;
                aux = termosInd[j];
                termosInd[j] = termosInd[j + 1];
                termosInd[j + 1] = aux;
            }
        }
    }
}

//FUNÇÃO MULTIPLICA e SOMA VETOR 
function multVetor(vetor, mult){
for (let i = 0; i < vetor.length; i++) {
    vetor[i] = vetor[i] * mult;
}
}

function multVetor2(vetor, mult){
var matriz = [];
var termo;
for (let i = 0; i < vetor.length; i++) {
    termo = vetor[i] * mult; 
    matriz[i] = termo.toFixed(5);
}

var x = new Matriz(vetor.length, 1);
x.matriz = matriz;
return x;
}

function somaVetor(vetor1, vetor2, mult) {
    for (let i = 0; i < vetor1.length; i++) {
        vetor1[i] += (vetor2[i] * mult);
    }
}


//FUNÇÃO PARA CRIAR UMA MATRIZ 

function createMatriz(){
    let linhas = parseInt(prompt("Quantas linhas terá a matriz?"));
    let colunas = parseInt(prompt("Quantas colunas terá a matriz?"));

    var matriz = new Matriz(linhas, colunas);

    for(let i = 0; i < matriz.getRows(); i++){
        for (let j = 0; j < matriz.getCols(); j++) {
            let termo = parseInt(prompt("Qual o valor do termo " + "(" +(i + 1) + "," +(j + 1)+")"+ ":"));
            matriz.matriz[i][j] = termo;
        }
    }

    return matriz;
}



//FUNÇÃO PARA IMPRIMIR MATRIZ 
let tabela = document.getElementById("tabela");

function writeMatriz(matriz) {

    let table = document.createElement('table');

    for (let i = 0; i < matriz.getRows(); i++) {

        let tr = document.createElement('tr');

        for (let j = 0; j < matriz.getCols(); j++) {
            var td = document.createElement('td')
            var data = document.createTextNode(matriz.matriz[i][j]);

            td.appendChild(data);

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    document.getElementById('matrizArea').appendChild(table);
}


//SOMA ENTRE DUAS MATRIZES

function somaMatriz(matriz1, matriz2) {

    if(matriz1.getRows() != matriz2.getRows() || matriz1.getCols() != matriz2.getCols()){
        alert("Essa operação não pode ser realizada! (As matrizes devem ter a mesma ordem)");
        return(null);
    } else {

        var matriz = new Matriz(matriz1.getRows(), matriz1.getCols());

        for(let i = 0; i < matriz.getRows(); i++){
            for (let j = 0; j < matriz.getCols(); j++) {
                let termo = matriz1.matriz[i][j] + matriz2.matriz[i][j];
                matriz.matriz[i][j] = termo;
            }
        }

    }
    return(matriz);

}

//MULTIPLICAÇÃO POR ESCALAR 

function multEscalar(matriz1, matriz2) {
    if (matriz1.getCols() != matriz2.getRows()) {
        alert("Essa operação não pode ser realizada! (colunas da Matriz1 é diferente do número de linhas da Matriz2)");
        return null;
    } else {

        var matriz = new Matriz(matriz1.getRows(), matriz2.getCols());
        let termo;

        for (let i = 0; i < matriz1.getRows(); i++) {
            for (let j = 0; j < matriz2.getCols(); j++) {
                termo = 0;
                if(typeof matriz2.matriz[0] === 'object'){
                    for (let k = 0; k < matriz2.getRows(); k++) {
                        termo += matriz1.matriz[i][k] * matriz2.matriz[k][j];
                    }
                } else{
                    for (let k = 0; k < matriz2.getRows(); k++) {
                        termo += matriz1.matriz[i][k] * matriz2.matriz[k];
                    }
                }
                matriz.matriz[i][j] = termo.toFixed(5);
            }
        }
        return matriz;
    }
}


//MULTIPLICAÇÃO TERMO A TERMO

function multTermo(matriz1, matriz2) {
if (matriz1.getCols() != matriz2.getCols() || matriz1.getRows() != matriz2.getRows()) {
    alert("Essa operação não pode ser realizada! (As matrizes devem ter a mesma ordem)");
} else {

    var matriz = new Matriz(matriz1.getRows(), matriz1.getCols());

    for(let i = 0; i < matriz.getRows(); i++){
        for (let j = 0; j < matriz.getCols(); j++) {
            let termo = matriz1.matriz[i][j] * matriz2.matriz[i][j];
            matriz.matriz[i][j] = termo;
        }
    }
    
    return matriz;
}
}


//ELIMINAÇÃO GAUSSIANA
function gauss(matriz){

    var b = [];

    for (let x = 0; x < matriz.getRows(); x++) {
        b[x] = parseInt(prompt('Digite o ' + (x + 1) + 'º termo independente:'));
    }

    bubbleSort(matriz, b);

    var i, j, k, l, m;
    //início do escalonamento
    for(k = 0; k < matriz.getRows() - 1; k++){ //'matriz.getRows() - 1' pois trabalhará somente com o que estiver abaixo e à esquerda
        if(matriz.matriz[k][k] == 0){
            document.write("A = 0");
            return null;
        }else{
            for(m = k + 1; m < matriz.getRows(); m++){ //operações para escalonamento de linha por linha, m = k + 1 para pegar o que estiver na linha de baixo
                var F = -matriz.matriz[m][k] / matriz.matriz[k][k];
                for(l = k + 1; l < matriz.getRows(); l++){ //cada termo da linha receberá as alterações a partir da coluna à esquerda já que o termo anterior será 0
                    matriz.matriz[m][l] = matriz.matriz[m][l] + F * matriz.matriz[k][l];
                }
                b[m] = b[m] + F * b[k]; //vetor dos termos independentes acompanha as mudanças
                matriz.matriz[m][k] = 0; //seta 0 para evitar problemas de iteração
            }
        }
    }

    // transforma todos os pivores em 1
    for (var g = 0; g < matriz.getRows(); g++){
        if(matriz.matriz[g][g] != 1){
            b[g] = b[g] * 1/matriz.matriz[g][g];
            multVetor(matriz.matriz[g], 1/matriz.matriz[g][g]);
        }
    }

    // criação da matriz ampliada
    var matrizAmpliada = new Matriz(matriz.getRows(), (matriz.getCols() + 1));
    for (i = 0; i < matriz.getRows(); i++) {
        for (j = 0; j < matriz.getCols(); j++) {
            matrizAmpliada.matriz[i][j] = matriz.matriz[i][j]/*.toFixed(5)*/;
        }
        matrizAmpliada.matriz[i][matriz.getCols()] = b[i]/*.toFixed(5)*/;
    }

    return matrizAmpliada;

}

//SOLVE 

function solve(matriz) {

    var b = [];
    for (let i = 0; i < matriz.matriz.length; i++) {
        b[i] = parseInt(matriz.matriz[i][matriz.matriz[i].length - 1]);
    }
    
    for(k = matriz.getRows() - 1; k >= 0; k--){ //'matriz.getRows() - 1' 
        if(matriz.matriz[k][k] == 0){
            document.write("A = 0");
            return null;
        }else{
            for(m = k - 1; m >= 0; m--){ //operações para escalonamento de linha por linha, m = k + 1 para pegar o que estiver na linha de baixo
                var F = -matriz.matriz[m][k] / matriz.matriz[k][k];
                for(l = matriz.getRows() - 1; l >= k - 1; l--){ //cada termo da linha receberá as alterações a partir da coluna à esquerda já que o termo anterior será 0
                    matriz.matriz[m][l] = matriz.matriz[m][l] + F * matriz.matriz[k][l];
                }
                b[m] = b[m] + F * b[k]; //vetor dos termos independentes acompanha as mudanças
                matriz.matriz[m][k] = 0; //seta 0 para evitar problemas de iteração
            }
        }
    }

    for (let i = 0; i < matriz.matriz.length; i++) {
        matriz.matriz[i][matriz.matriz[i].length - 1] = b[i];
    }
    
    return matriz;

}


//TRANSPOSTA 

function transpose(matriz){
    let rows = matriz.getRows();
    let cols = matriz.getCols();
    var newMatriz = new Matriz(cols, rows)
    for(let i = 0; i < matriz.getCols(); i++){
        for(let j = 0; j < matriz.getRows(); j++){
            newMatriz.matriz[i][j] = matriz.matriz[j][i];
        }
    }
    return newMatriz;
}

//IDENTIDADE 

function createIdentity(dimensao) {
    var matriz = new Matriz(dimensao, dimensao);
    for (let i = 0; i < matriz.matriz.length; i++) {
        for (let j = 0; j < matriz.matriz.length; j++) {
            matriz.matriz[i][j] = 0;
        }
    }
    for (let x = 0; x < matriz.matriz.length; x++) {
        matriz.matriz[x][x] = 1;
    }
    return matriz;
}

//-----------------------------------------------Av2-------------------------------------------------
//TRANSLAÇÃO 

function translate2D(vetor, dx, dy) {
var identidade = createIdentity(3);
var delta = [dx, dy];
for (let i = 0; i < vetor.length - 1; i++) {
    identidade.matriz[i][identidade.getRows() - 1] = delta[i];
}

//[1,0,dx]
//[0,1,dy]
//[0,0,1 ]

let vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;
}

function translate3D(vetor, dx, dy, dz) {
var identidade = createIdentity(4);
var delta = [dx, dy, dz];
for (let i = 0; i < vetor.length - 1; i++) {
    identidade.matriz[i][identidade.getRows() - 1] = delta[i];
}
let vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;

//[1,0,0,dx]
//[0,1,0,dy]
//[0,0,1,dz]
//[0,0,0, 1]


}



//ROTAÇÃO 

function grausToRad(graus){
var rad = graus * (Math.PI / 180);
return rad;
}

function rotation2D(vetor, angulo){
var identidade = createIdentity(3);
var matrizRotation = [[Math.cos(grausToRad(angulo)), -Math.sin(grausToRad(angulo))], [Math.sin(grausToRad(angulo)), Math.cos(grausToRad(angulo))]];
for (let i = 0; i < matrizRotation.length; i++) {
    for (let j = 0; j < matrizRotation.length; j++) {
        identidade.matriz[i][j] = matrizRotation[i][j];
    }
}
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;


return vetorNH;


}

function rotation3DX(vetor, angulo) {
var identidade = createIdentity(4);
var matrizRotation = [[Math.cos(grausToRad(angulo)), -Math.sin(grausToRad(angulo))], 
                    [Math.sin(grausToRad(angulo)), Math.cos(grausToRad(angulo))]];
identidade.matriz[1][1] = matrizRotation[0][0];
identidade.matriz[1][2] = matrizRotation[0][1];
identidade.matriz[2][1] = matrizRotation[1][0];
identidade.matriz[2][2] = matrizRotation[1][1];
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;

//[ 1 , 0 , 0  ]   [1,0,0]
//[ 0 ,cos,-sen]   [0,0,1]
//[ 0 ,sen,cos ]   [0,1,0]


}

function rotation3DY(vetor, angulo) {
var identidade = createIdentity(4);
var matrizRotation = [[Math.cos(grausToRad(angulo)), Math.sin(grausToRad(angulo))],
                     [-Math.sin(grausToRad(angulo)), Math.cos(grausToRad(angulo))]];
identidade.matriz[0][0] = matrizRotation[0][0];
identidade.matriz[0][2] = matrizRotation[0][1];
identidade.matriz[2][0] = matrizRotation[1][0];
identidade.matriz[2][2] = matrizRotation[1][1];
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;

//[cos ,  0 , sen]   [1,0,0]
//[ 0  ,  1 ,  0 ]   [0,1,0]
//[-sen,  0 , cos]   [0,0,1]

}

function rotation3DZ(vetor, angulo) {
var identidade = createIdentity(4);
var matrizRotation = [[Math.cos(grausToRad(angulo)), -Math.sin(grausToRad(angulo))], 
                        [Math.sin(grausToRad(angulo)), Math.cos(grausToRad(angulo))]];
identidade.matriz[0][0] = matrizRotation[0][0];
identidade.matriz[0][1] = matrizRotation[0][1];
identidade.matriz[1][0] = matrizRotation[1][0];
identidade.matriz[1][1] = matrizRotation[1][1];
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}

//[cos, -sen, 0]   [1,0,0]
//[sen,  cos, 0]   [0,1,0]
//[ 0 ,  0  , 1]   [0,0,1]


//REFLEXÃO 

function reflection2DX(vetor) {
var identidade = createIdentity(3);
identidade.matriz[1][1] = -1;
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;
}

function reflection2DY(vetor) {
var identidade = createIdentity(3);
identidade.matriz[0][0] = -1;
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;
}

function reflection3DX(vetor) {
var identidade = createIdentity(4);
identidade.matriz[0][0] = -1;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}

function reflection3DY(vetor) {
var identidade = createIdentity(4);
identidade.matriz[1][1] = -1;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}

function reflection3DZ(vetor) {
var identidade = createIdentity(4);
identidade.matriz[2][2] = -1;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}


//PROJEÇÃO 

function projetction2DX(vetor) {
var identidade = createIdentity(3);
identidade.matriz[1][1] = 0;
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;

//[1,0]
//[0,0]

}

function projetction2DY(vetor) {
var identidade = createIdentity(3);
identidade.matriz[0][0] = 0;
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;

//[0,0]
//[0,1]
}

function projetction3DX(vetor) {
var identidade = createIdentity(4);
identidade.matriz[0][0] = 0;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}

function projetction3DY(vetor) {
var identidade = createIdentity(4);
identidade.matriz[1][1] = 0;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}

function projetction3DZ(vetor) {
var identidade = createIdentity(4);
identidade.matriz[2][2] = 0;
var vetorMatriz = new Matriz(4, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 3;
return vetorNH;
}
//CISALHAMENTO 

function shearing(vetor, dx, dy) {
var identidade = createIdentity(3);
identidade.matriz[0][1] = dx;
identidade.matriz[1][0] = dy;
var vetorMatriz = new Matriz(3, 1);
vetorMatriz.matriz = vetor;
var vetorNH =  multEscalar(identidade, vetorMatriz);
vetorNH.rows = 2;
return vetorNH;
}


//Botõees 

function selectOperation(select){
    
    //let select = parseInt(prompt("Escolha a operação que você deseja fazer:\n1- Soma entre matrizes;\n2- Multiplicação por escalar;\n3- Multiplicação termo a termo;\n4- Eliminação Gaussiana;\n5- Solve;\n6- Matriz transposta;\n7- Criar Matriz;\n8- Translação;\n9- Rotação;\n10- Reflexão;\n11- Projeção;\n12- Cisalhamento;"))
    document.getElementById('matrizArea').innerText = ""
    switch(select){

        case 1:

            let soma = somaMatriz(createMatriz(), createMatriz());
            document.getElementById('matrizArea').appendChild(writeMatriz(soma));

        break;

        case 2:

            let mult_escalar = multEscalar(createMatriz(), createMatriz());
            document.getElementById('matrizArea').appendChild(writeMatriz(mult_escalar));

        break;

        case 3:

            let mult_termo = multTermo(createMatriz(), createMatriz());
            document.getElementById('matrizArea').appendChild(writeMatriz(mult_termo));

        break;

        case 4:

            var teste = new Matriz(3, 3);
            teste.matriz = [[1, 0, 3], [2, -4, 0], [3, -2, -5]];
            //termos independentes para teste: -8, -4, 26
            document.getElementById('matrizArea').appendChild(writeMatriz(gauss(createMatriz())));
            //deve resultar 4, 3, -4

        break;
        
        case 5:

            var teste = new Matriz(3, 3);
            teste.matriz = [[2, 1, 1], [1, 1, -1], [1, -1, 1]];
            //termos independentes para teste: -8, -4, 26
            document.getElementById('matrizArea').appendChild(writeMatriz(solve(gauss(createMatriz()))));
            //deve resultar 4, 3, -4

        break;

        case 6:

            document.getElementById('matrizArea').appendChild(writeMatriz(transpose(createMatriz())));

        break;
        case 7:

            document.getElementById('matrizArea').appendChild(writeMatriz(createMatriz()));

        break;
        case 8:
            let translate = parseInt(prompt("1- 2D;\n2- 3D;"))
            switch(translate) {

                case 1:
                
                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var vetor = [[x], [y], [1]];
                    var dx = parseInt(prompt('Qual o valor de dX?'));
                    var dy = parseInt(prompt('Qual o valor de dY?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(translate2D(vetor, dx, dy)));
                
                break;
                case 2:
                
                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var z = parseInt(prompt('Qual o valor de Z?'));
                    var vetor = [[x], [y], [z], [1]];
                    var dx = parseInt(prompt('Qual o valor de dX?'));
                    var dy = parseInt(prompt('Qual o valor de dY?'));
                    var dz = parseInt(prompt('Qual o valor de dZ?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(translate3D(vetor, dx, dy, dz)));

                break;
            }

        break;
        case 9:

            let rotation = parseInt(prompt('1- 2D;\n2- 3DX;\n3- 3DY;\n4- 3DZ;'));
            switch(rotation){
                case 1:

                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var vetor = [[x], [y], [1]];
                    var angulo = parseInt(prompt('Qual ângulo em GRAUS?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(rotation2D(vetor, angulo)));

                break;
                case 2:

                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var z = parseInt(prompt('Qual o valor de Z?'));
                    var vetor = [[x], [y], [z], [1]];
                    var angulo = parseInt(prompt('Qual ângulo em GRAUS?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(rotation3DX(vetor, angulo)));

                break;
                case 3:

                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var z = parseInt(prompt('Qual o valor de Z?'));
                    var vetor = [[x], [y], [z], [1]];
                    var angulo = parseInt(prompt('Qual ângulo em GRAUS?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(rotation3DY(vetor, angulo)));

                break;
                case 4:

                    var x = parseInt(prompt('Qual o valor de X?'));
                    var y = parseInt(prompt('Qual o valor de Y?'));
                    var z = parseInt(prompt('Qual o valor de Z?'));
                    var vetor = [[x], [y], [z], [1]];
                    var angulo = parseInt(prompt('Qual ângulo em GRAUS?'));
                    document.getElementById('matrizArea').appendChild(writeMatriz(rotation3DZ(vetor, angulo)));

                break;
            }

            break;
            case 10:

                var reflection = parseInt(prompt('1- 2DX;\n2- 2DY;\n3- 3DX;\n4- 3DY;\n5- 3DZ;'))
                switch(reflection){
                    case 1:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var vetor = [[x], [y], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(reflection2DX(vetor)));

                    break;
                    case 2:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var vetor = [[x], [y], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(reflection2DY(vetor)));

                    break;
                    case 3:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(reflection3DX(vetor)));

                    break;
                    case 4:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(reflection3DY(vetor)));

                    break;
                    case 5:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(reflection3DZ(vetor)));

                    break;
                }

            break;
            case 11:

                var projection = parseInt(prompt('1- 2DX;\n2- 2DY;\n3- 3DX;\n4- 3DY;\n5- 3DZ;'));
                
                switch(projection){
                    case 1:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var vetor = [[x], [y], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(projetction2DX(vetor)));

                    break;
                    case 2:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var vetor = [[x], [y], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(projetction2DY(vetor)));

                    break;
                    case 3:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(projetction3DX(vetor)));

                    break;
                    case 4:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(projetction3DY(vetor)));

                    break;
                    case 5:

                        var x = parseInt(prompt('Qual o valor de X?'));
                        var y = parseInt(prompt('Qual o valor de Y?'));
                        var z = parseInt(prompt('Qual o valor de Z?'));
                        var vetor = [[x], [y], [z], [1]];
                        document.getElementById('matrizArea').appendChild(writeMatriz(projetction3DZ(vetor)));

                    break;
                }

            break;
            case 12:


                var x = parseInt(prompt('Qual o valor de X?'));
                var y = parseInt(prompt('Qual o valor de Y?'));
                var vetor = [[x], [y], [1]];
                var dx = parseInt(prompt('Qual o valor de dx?'));
                var dy = parseInt(prompt('Qual o valor de dy?'));
                document.getElementById('matrizArea').appendChild(writeMatriz(shearing(vetor, dx, dy)));

            break;

            case 13:

                var projection = parseInt(prompt('1- Questão 05;\n2- Questão 06;\n3- Questão 07;\n4- Questão 08;\n5- Teste'));
                                
                switch(projection){
                    case 1:
                    document.getElementById('matrizArea').appendChild(writeMatriz(pageRank(matrizQst5)));
                    case 2:
                    document.getElementById('matrizArea').appendChild(writeMatriz(pageRank(matrizQst6)));
                    case 3:
                    document.getElementById('matrizArea').appendChild(writeMatriz(pageRank(matrizQst7)));
                    case 4:
                    document.getElementById('matrizArea').appendChild(writeMatriz(pageRank(matrizQst8)));
                    case 5:
                    document.getElementById('matrizArea').appendChild(writeMatriz(pageRank(matrizTeste)));

                }
                    
            break;

    }
}

//============================= PageRank =============================
var matrizQst5 = new Matriz(4, 4);

matrizQst5.matriz =[[0, 0, 1, 0],
                    [1, 0, 0, 0],
                    [1, 1, 0, 0],
                    [0, 1, 0, 0]];

var matrizQst6 = new Matriz(4,4);
matrizQst6.matriz =[[0, 1, 1, 0],
                    [0, 0, 1, 0],
                    [1, 0, 0, 1],
                    [1, 0, 0, 0]]
                    //4x4

var matrizQst7 =  new Matriz(5,5);
matrizQst7.matriz =[[0, 1, 1, 1, 0],
                    [1, 0, 0, 0, 1],
                    [0, 0, 0, 0, 1],
                    [0, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0]]

                   //5x5
var matrizQst8= new Matriz(10,10);
matrizQst8.matriz =[[0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
                    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
                    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 1, 0, 1, 0, 1],
                    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]]
                   //10x10

var matrizTeste = new Matriz(4,4);
matrizTeste.matriz =[[0, 0, 1, 1],
                     [1, 0, 0, 0],
                     [1, 0, 0, 1],
                     [1, 1, 1, 0]]


function somaLinha(matriz){   //Formar o vetor centro inicial a0
    var linhas_somadas = [];
    var aux = 0;
    for (let i = 0; i < matriz.matriz.length; i++) {
        for (let j = 0; j < matriz.matriz.length; j++) {
            aux += matriz.matriz[i][j];
        }
        linhas_somadas[i] = aux;
        aux = 0;
    }
    var matriz = new Matriz(linhas_somadas.length);
    matriz.matriz = linhas_somadas;
    return matriz;
}

function norma(matriz){ 
    var aux = 0;
    for (let i = 0; i < matriz.matriz.length; i++) {
        aux += matriz.matriz[i] * matriz.matriz[i];
    }
    return Math.sqrt(aux).toFixed(5);
}

function checkRange(vetor1, vetor2) {
    console.log(vetor1);
    console.log(vetor2);
    for (let i = 0; i < vetor1.length; i++) {
        if(vetor1[i] != vetor2[i])
            return true;
    }
    return false;
}


function pageRank(matriz) {
    var a;
    var ata;
    var ataa;
    var aux = new Matriz(0, 0); 
    var normaInversa;
    normaInversa = 1 / norma(somaLinha(transpose(matriz))); //norma inversa
    a = multVetor2(somaLinha(transpose(matriz)).matriz, (normaInversa.toFixed(5))); //Novo vetor centro h1 //a0


    ata = multEscalar(transpose(matriz), matriz); //AT * A 
    ataa = multEscalar(ata, a); //AT* A * a0
    
    while(checkRange(a.matriz, aux.matriz)) { //estabilizar 
        aux = a;
        a = multVetor2(ataa.matriz, 1 / norma(ataa));
        ata = multEscalar(transpose(matriz), matriz);
        ataa = multEscalar(ata, a);
    }

    var matrizz = new Matriz(1, a.matriz.length);
    matrizz.matriz[0] = a.matriz;

    return transpose(matrizz);

}
