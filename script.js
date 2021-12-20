let client = []

function showFilter(filteredClient){
    let showContent = filteredClient.map(function(item){

        return `<tr>
                                                                        <td>${item.name}</td>
                                                                        <td>${item.dateV.split("-").reverse().join('/')}</td>
                                                                        <td>R$${item.valueC}</td>
                                                                    </tr>`;
    })
    document.querySelector("#tableFiltered tbody").innerHTML = showContent.join("");
    
}

document.getElementById('filter-btn').addEventListener('click', function(){
    let filteredClient
    console.log(filteredClient)

    if(document.getElementById('dateIfilter').value != ""){
        filteredClient = client.filter(item => item.dateV >= document.getElementById('dateIfilter').value)
    }
    
    if(document.getElementById('dateFfilter').value != ""){
        if(filteredClient == undefined){
            filteredClient = client.filter(item => item.dateV <= document.getElementById('dateFfilter').value)
        }else{
            filteredClient = filteredClient.filter(item => item.dateV <= document.getElementById('dateFfilter').value)
        }
    }
    if(document.getElementById('minValue').value != ""){
        if(filteredClient == undefined){
            filteredClient = client.filter(item => parseInt(item.valueC) >= document.getElementById('minValue').value)
        }else{
            filteredClient = filteredClient.filter(item => parseInt(item.valueC) >= document.getElementById('minValue').value)
        }
    }
    if(document.getElementById('maxValue').value != ""){
        if(filteredClient == undefined){
            filteredClient = client.filter(item => parseInt(item.valueC) <= document.getElementById('maxValue').value)
        }else{
            filteredClient = filteredClient.filter(item => parseInt(item.valueC) <= document.getElementById('maxValue').value)
        }
    }
    console.log(filteredClient)
    showFilter(filteredClient)
})

function addClient(){
    if(document.getElementById('name').value != "" && document.getElementById('datev').value != "" && document.getElementById('purchValue').value != ""){   
        client.push({'name':document.getElementById('name').value, 'dateV':document.getElementById('datev').value, 'valueC':parseFloat(document.getElementById('purchValue').value).toFixed(2)})
        document.getElementById('name').value = ""
        document.getElementById('datev').value = ""
        document.getElementById('purchValue').value = ""
        document.querySelector("#tableResult tbody").innerHTML += `<tr>
                                                                        <td>${client[client.length - 1].name}</td>
                                                                        <td>${client[client.length - 1].dateV.split("-").reverse().join('/')}</td>
                                                                        <td>R$${client[client.length - 1].valueC}</td>
                                                                    </tr>`;
    }else{
        alert("Dados inseridos inválidos ou incompletos")
    }
}

function jurosCalc(){
    let showContent = client.map(function(item){
            let newdate = new Date
            let olddate = new Date(item.dateV)
            let timeDif = newdate.getTime() - olddate.getTime()
            let dayDif = timeDif / (1000 * 3600 * 24);
            item.percJ = 0
            if(dayDif.toFixed(0) > 0){
                item.percJ = 2 + (dayDif.toFixed(0) * 0.1)
            }
            item.valueT = parseFloat(item.valueC) + (parseFloat(item.valueC) * (item.percJ / 100))
            return `<tr>
                        <td>${item.name}</td>
                        <td>${item.dateV.split("-").reverse().join('/')}</td>
                        <td>R$${item.valueC}</td>
                        <td>${item.percJ}%</td>
                        <td>R$${item.valueT.toFixed(2)}</td>
                    </tr>`;
        });

    document.querySelector("#tableResult tbody").innerHTML = showContent.join("");
    console.log(client)
}

function agroup(array, prop){
    return array.reduce(function (acc,obj){
        let key = obj[prop];
        if (!acc[key]) {
        acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {})
}

function showGroup(array, prop){
    jurosCalc()
    document.querySelector("#tableResult tbody").innerHTML = "";
    let groupC = agroup(array, prop)
    let propT = Object.keys(groupC)
    let tableB = document.querySelector("#tableResult tbody")
    propT.forEach( item => {
        let tableG = document.createElement('tr')
        let tableGN = document.createElement('th')
        tableGN.colSpan = "5"
        tableGN.innerHTML = item
        tableG.appendChild(tableGN)
        tableB.appendChild(tableG)
        groupC[item].forEach(propI => {
            document.querySelector("#tableResult tbody").innerHTML += `<tr>
                        <td>${propI.name}</td>
                        <td>${propI.dateV.split("-").reverse().join('/')}</td>
                        <td>R$${propI.valueC}</td>
                        <td>${propI.percJ}%</td>
                        <td>R$${propI.valueT.toFixed(2)}</td>
                    </tr>`;
        })
    })
    let tableG = document.createElement('tr')
    let tableGN = document.createElement('th')
    tableGN.colSpan = "5"
    tableGN.innerHTML = "Sem Grupo"
    tableG.appendChild(tableGN)
    tableB.appendChild(tableG)
}




document.getElementById('saveC').addEventListener('click', function(){
    addClient()
}) 

document.getElementById('jurosC').addEventListener('click', function(){
    jurosCalc()
})

document.getElementById('agrC').addEventListener('click', function(){
    showGroup(client, 'name')
})

document.getElementById('agrD').addEventListener('click', function(){
    showGroup(client, 'dateV')
})