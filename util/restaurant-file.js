const path=require('path');
const fs=require('fs');
const filepath = path.join(__dirname,'..', 'data', 'restaurents.json');
function getStoredRestaurants() {
    const fileData = fs.readFileSync(filepath);
    const storedRestaurents = JSON.parse(fileData);

    return storedRestaurents;
}
function storedRestaurents(storableRestaurants){
    fs.writeFileSync(filepath,JSON.stringify(storableRestaurants));
}

module.exports={
    getStoredRestaurants:getStoredRestaurants,
    storedRestaurents:storedRestaurents
}