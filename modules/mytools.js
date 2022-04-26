const fetch = require('node-fetch-commonjs')
const mytools = {
    generatePackage: (orders, items)=>{
        return new Promise((resolve, reject)=>{
            (async function(){
                function findItem(id){ // Function to find the index of an item
                    let k = 0
                    let result = -1
                    do{
                        if(id == items.items[k].id){
                            result = k
                        }
                        k++
                    }
                    while(typeof(items.items[k]) != "undefined" && (id != items.items[k].id || k < items.items.length))
                    return result
                }
                function convertWeightInPrice(weight){ // function to getting the price of package by their weight
                    let price = 0
                    if(weight > 0 && weight < 1){
                        price = 1
                    }
                    else if(weight > 1 && weight < 5){
                        price = 2
                    }
                    else if(weight > 5 && weight < 10){
                        price = 3
                    }
                    else if(weight > 10 && weight < 20){
                        price = 5
                    }
                    else if(weight > 20){
                        price = 10
                    }
                    return price
                }
                let newTab = []
                for(let i = 0; i < orders.orders.length; i++){
                    const response = await fetch('https://random.justyy.workers.dev/api/random/?cached&n=15') // get package code
                    const code = await response.json()
                    newTab.push({tracking_id: code, items: [], weight: 0, price: 0, quantity: 0, order_id: orders.orders[i].id})
                    for(let n = 0; n < orders.orders[i].items.length; n++){
                        const itemIndex = findItem(orders.orders[i].items[n].item_id)
                        if(parseFloat(newTab[newTab.length-1].weight) + parseFloat(items.items[itemIndex].weight) <= 30){ // if weight of package is < 30
                            // calculate the new weight of the package
                            newTab[newTab.length-1].weight = Math.round((parseFloat(newTab[newTab.length-1].weight) + parseFloat(items.items[itemIndex].weight))*10)/10
                            newTab[newTab.length-1].items.push(items.items[itemIndex])
                            newTab[newTab.length-1].price = convertWeightInPrice(newTab[newTab.length-1].weight) // getting the price of the package
                            newTab[newTab.length-1].quantity = newTab[newTab.length-1].quantity + 1
                        }
                        else{
                            const _response = await fetch('https://random.justyy.workers.dev/api/random/?cached&n=15') // get package code
                            const _code = await _response.json()
                            newTab.push({tracking_id: _code, items: [], weight: 0, price: 0, quantity: 0, order_id: orders.orders[i].id})
                            const itemIndex = findItem(orders.orders[i].items[n].item_id)
                            // calculate the new weight of the package
                            newTab[newTab.length-1].weight = Math.round((parseFloat(newTab[newTab.length-1].weight) + parseFloat(items.items[itemIndex].weight))*10)/10
                            newTab[newTab.length-1].items.push(items.items[itemIndex])
                            newTab[newTab.length-1].price = convertWeightInPrice(newTab[newTab.length-1].weight) // getting the price of the package
                            newTab[newTab.length-1].quantity = newTab[newTab.length-1].quantity + 1
                        }
                    }
                }
                let count = 0
                let paletteNumber = 1
                let parcel = [{palette_number: paletteNumber, packages: []}]
                for(let i = 0; i < newTab.length; i++){ // creating our palettes
                    count++
                    if(count >= 15){
                        paletteNumber++
                        parcel.push({palette_number: paletteNumber, packages: [newTab[i]]})
                        count = 0
                    }
                    else{
                        parcel[parcel.length-1].packages.push(newTab[i])
                    }
                }
                resolve(parcel) // return array with each parcels containing 15 packages
            })()
        })
    }
}
module.exports = mytools