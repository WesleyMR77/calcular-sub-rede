function reset(){
    document.getElementById("classe").innerHTML = ""
    document.getElementById("reservadoLAN").innerHTML = ""
    document.getElementById("bits").innerHTML = ""
    document.getElementById("mascara_result").innerHTML = ""
    document.getElementById("quant_host").innerHTML = ""
    document.getElementById("quant_rede").innerHTML = ""
} 

//funcao de alerta de erro
function erro(){
    document.getElementById("classe").innerHTML = "Dados Inválidos"    
    error = 1
}

// funcao que separa os octetos do ip
function adiciona(ip){     
    ipt = ip.split(".");
    ip8 = ipt[0];
    ip16 = ipt[1];
    ip24 = ipt[2];
    ip32 = ipt[3];  

    min_sub = parseInt(document.etapa1.min_sub.value)
}


// função verifica todos os possivéis erros no ip
function verifica(){        
    if(true){
        bits = 0
        for(i = 0; i < ip.length; i++){
            if(ip[i] == "."){
                bits += 1 
            }
        }
            if(bits !== 3){
                erro()
            } 

        } 

    if (ip8 > 255 || ip16 > 255 || ip24 > 255 || ip32 > 255 || ip8 < 0 || ip16 < 0 || ip24 < 0 || ip32 < 0){        
        erro();
    }

    if(ip8.length > 3 || ip16.length > 3 || ip24.length > 3 || ip32.length > 3){
        erro();    
    }     

    if(isNaN(ip8) == true || isNaN(ip16) == true || isNaN(ip24) == true || isNaN(ip32) == true ) {
        erro()
    }

}
    //funcao que exibe se esta reservado para LAN
    function reservadoLAN(reservado){
        document.getElementById("reservadoLAN").innerHTML = reservado
    }

    //funcao que exibe os dados
    function dados(classe, bits, mascara_result, quant_host, quant_rede){
        document.getElementById("classe").innerHTML = classe
        document.getElementById("bits").innerHTML = bits 
        document.getElementById("mascara_result").innerHTML = mascara_result
        document.getElementById("quant_host").innerHTML = quant_host
        document.getElementById("quant_rede").innerHTML = quant_rede
    }

        //funcao que calcula a quantidade de bits
    function calcularBits(min_sub, quant_host){
        let i = 1
        bits = 0

        while(min_sub > i){
            bits += 1
            i = Math.pow(2,bits)
        }
    }

        //funcao que calcula a mascara
    function calcularMascara(){
    mascara_result = 0
    let cont = bits
    let cont_neg = 7

    while(cont != 0){
        mascara_result += Math.pow(2,cont_neg)
        cont_neg -= 1
        cont -= 1
        }
    }

    //calcular quantidade de rede
    function quantHost(bits){
        bits_host = 8-bits

        quant_host = Math.pow(2,bits_host)-2
    }

    function quantRede(bits){
    //calcular quantidade de sub redes
    bits_rede = bits

    quant_rede = Math.pow(2,bits_rede)
    }

    //funcao que imprimi ip inicial, final, broadcast e ip da rede
    function detalharSubrede(quant_rede){
        detalhar_subrede = quant_rede

        repartir_rede = parseInt(256/quant_rede)

        rede = 0
        host_1 = 0
        ult_host = 0
        brodcast = 0

        for(i = 0; i < detalhar_subrede; i++){
            Window = window.open("", "MsgWindow", "width=400, height=1000");
            Window.document.write(  `IP rede ${ip8}.${ip16}.${ip24}.${rede},
             Ip inicial ${ip8}.${ip16}.${ip24}.${host_1+1},
             Ip final ${ip8}.${ip16}.${ip24}.${ult_host+repartir_rede-2},
            brodcast ${ip8}.${ip16}.${ip24}.${brodcast+repartir_rede-1}               
            //////////////////////////////////////////////////////////////////////////////////////////`);
            rede += repartir_rede
            host_1 += repartir_rede
            ult_host += repartir_rede
            brodcast += repartir_rede        
        }
    }

    // funcao que separa os octetos da mascara
    function adicionaMascara(mascara){
        ipt_mascara = mascara.split(".");
        ip8_mascara = ipt_mascara [0];
        ip16_mascara = ipt_mascara [1];
        ip24_mascara = ipt_mascara [2];
        ip32_mascara = ipt_mascara [3];  
    }

    
    //funcao que calcula a quantidade de bits
    function calcularMascaraEtapa3(ip32_mascara){

        let cont_neg = 7
        cont = 0
        bits = 0
        mascara_result = 0

    while(mascara_result < ip32_mascara ){
        mascara_result += Math.pow(2,cont_neg)
        cont_neg -= 1
        bits += 1
        }
    }

// funcao que executa a 1° etapa
function Etapa1(){
    var error = 0

    //chamar funções
    reset()
    ip = document.etapa1.ip.value;
    adiciona(ip)
    verifica()

        //Verifica se é classe C
        if(ip8 >= 192 && ip8 <= 223){
            //verifica se esta reservado para LAN
            if(ip8 == 192 && ip16 == 168){
                reservadoLAN("É reservado para LAN")
            }
            else{
                reservadoLAN("Não é reservado para LAN")
            }     

            //verifica se pode calcular a quantidade mínima de sub redes
            if(min_sub > 128 || min_sub < 2 ){ //colocar para aceitar valores inteiros
                alert("inválido")
            }
            //calcula a quantidade de bits
            else{

                // chamar funcoes
                calcularBits(min_sub)
                calcularMascara() 
                quantHost(bits)
                quantRede(bits)
                detalharSubrede(quant_rede)

                //funcao de exibição de dados
            dados(`Classe C`,
            `A quantidade de bits é ${bits}`,
            `A Máscara de rede resultante da divisão das sub-redes é $255.255.255.${mascara_result} /${bits+24}`,
            `A Quantidade de Hosts válidos por sub-rede é de: ${quant_host}`,
            `A Quantidade de Sub-redes criadas é de: ${quant_rede}`)         
        }
    }

        else{
            erro()
        }
}



function Etapa2(){
    //pegar o ip digitado
    ip = document.etapa2.ip.value
    //separar o ip por octeto
    adiciona(ip)
    //verificar os erros no ip
    verifica()
    //ver se é classe C
    if(ip8 >= 192 && ip8 <= 223){
        min_sub = parseInt(document.etapa2.quant_hot.value) + parseInt(2)
        calcularBits(min_sub)
        bits_rede = 8-bits

        bits =  bits_rede
        //calcular a quantidade de rede
        quantRede(bits)
        //calcular a quantidade de hosts
        quantHost(bits)

        div_quant_host = 1
        let cont = 0

        // exibit todos os hosts por sub rede
        for(i = 0; i < quant_rede; i++){ 
            for(j = 0; j < quant_host; j++ ){      
                Window = window.open("", "MsgWindow", "width=400, height=1000");
                Window.document.write(  `IP host ${ip8}.${ip16}.${ip24}.${div_quant_host + j + cont}           
                `);
            }
            Window.document.write(  `           
                //////////////////////////////////////////////////////////////////////////////////////////`)
            div_quant_host += 2
            cont += quant_host           
        }    

    }
    else{
        erro()
    }

}
//funcao da 3 etapa
function Etapa3(){
    //pegar os valores da 3 etapa
    ip = document.etapa3.ip.value
    //separar por octeto
    adiciona(ip)
    //verificar os erros no ip
    verifica()
    //verificar se é classe c
    if(ip8 >= 192 && ip8 <= 223){
        mascara = document.etapa3.mascara.value
        //separar a mascara por octeto
        adicionaMascara(mascara)
        //descobri quantidade de bits
        calcularMascaraEtapa3(ip32_mascara)

        quantRede(bits)
        
        detalharSubrede(quant_rede)


        
     } 

}
    

