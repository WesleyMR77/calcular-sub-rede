
// funcao que executa tudo
function functionIP(){
    var error = 0
    
    function reset(){
        document.getElementById("classe").innerHTML = ""
        document.getElementById("rede").innerHTML = ""
        document.getElementById("redei").innerHTML = ""
        document.getElementById("redef").innerHTML = ""
        document.getElementById("brodcast").innerHTML = ""
        document.getElementById("reservadoLAN").innerHTML = ""
    } 
    //funcao de alerta de erro
    function erro(){
        document.getElementById("classe").innerHTML = "IP inválido"    
        error = 1
    }
    
    // funcao que separa os octetos do ip
    function adiciona(){     
        ip = document.calc.ip.value;
        ipt = ip.split(".");
        ip8 = ipt[0];
        ip16 = ipt[1];
        ip24 = ipt[2];
        ip32 = ipt[3];  
    }

    // função verifica todos os possivéis erros
    function verifica(){        
        if(true){
            cont = 0
            for(i = 0; i < ip.length; i++){
                if(ip[i] == "."){
                    cont += 1 
                }
            }
                if(cont !== 3){
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
        function dados(classe, rede,redei, redef,brodcast){
            document.getElementById("classe").innerHTML = classe
            document.getElementById("rede").innerHTML = rede
            document.getElementById("redei").innerHTML = redei
            document.getElementById("redef").innerHTML = redef
            document.getElementById("brodcast").innerHTML = brodcast
        }

    //chamar funções
    reset()
    adiciona()
    verifica()
        //classe A e passsar valores por parametro
    if(error != 1){
        if(ip8 <= 126){
            dados(`Classe A`,
            `Mascara é 255.0.0.0`,
            `O endereço da rede é ${ip8}.0.0.0`,
            `O endereço da rede inicial da rede é ${ip8}.0.0.1`,
            `O endereço da rede final é ${ip8}.255.255.254`,
            `O endereço Brodcast da rede é ${ip8}.255.255.255`)
        if(ip8 == 10){
            reservadoLAN("É reservado para LAN")
        }
        else{
            reservadoLAN("Não é reservado para LAN")
        }
        
        }
        //classe B e passsar valores por parametro
        if(ip8 >= 128 && ip8 <= 191){
            dados(`Classe B`,
            `Mascara é 255.255.0.0`,
            `O endereço da rede é ${ip8}.${ip16}.0.0`,
            `O endereço da rede inicial da rede é ${ip8}.${ip16}.0.1`,
            `O endereço da rede final é ${ip8}.${ip16}.255.254`,
            `O endereço Brodcast da rede é ${ip8}.${ip16}.255.255`)
        if(ip8 == 172 && ip16 >= 16 && ip16 <= 31 && ip32 >= 1){
            reservadoLAN("É reservado para LAN")
        }
        else{
            reservadoLAN("Não é reservado para LAN")
        }
        }

        //classe C e passsar valores por parametro
        if(ip8 >= 192 && ip8 <= 223){
            dados(`Classe C`,
            `Mascara é 255.255.255.0`,
            `O endereço da rede é ${ip8}.${ip16}.${ip24}.0`,
            `O endereço da rede inicial da rede é ${ip8}.${ip16}.${ip24}.1`,
            `O endereço da rede final é ${ip8}.${ip16}.${ip24}.254`,
            `O endereço Brodcast da rede é ${ip8}.${ip16}.${ip24}.255`)
        if(ip8 == 192 && ip16 == 168){
            reservadoLAN("É reservado para LAN")
        }
        else{
            reservadoLAN("Não é reservado para LAN")
        }
        }
        //classe D e passsar valores por parametro
        if(ip8 >= 224 && ip8 <= 239){
            dados(`Classe D`,
            `Reservado para multicasting `, ``,``,``)
        }
        //classe E e passsar valores por parametro
        if(ip8 >= 240 && ip8 <= 255){
            dados(`Classe E`,
            `Experimental, usado para pesquisa`,``,``,``)
        }

    }


}    





