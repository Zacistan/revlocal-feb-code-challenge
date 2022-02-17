function computeTotalPrice(productsArray) {
    price = 0
    productBasePrice = 299
    packagesArray = [] // Will contains arrays of each viable package

    while (productsArray.length > 0) {
        // Grab and remove the product from the array
        currentProduct = productsArray.pop()
        // Loop through the packages array, and check if the product can be bundled with an existing package.
        addedToExistingPackage = false
        for (i = 0; i < packagesArray.length; i++) {
            if (!packagesArray[i].includes(currentProduct)) {
                packagesArray[i].push(currentProduct)
                addedToExistingPackage = true
                break;
            }
        }
        // If the product cannot be placed in an existing package, create a new package with that product.
        if (!addedToExistingPackage) {
            packagesArray.push([currentProduct])
        }
    }
    // Loop through each package, and apply the appropriate discount based on number of products in package.
    packagesArray.forEach(package => {
        switch (package.length) {
            case 1:
                price += productBasePrice
                break;
            case 2:
                price += (productBasePrice * 2) * 0.95
                break;
            case 3:
                price += (productBasePrice * 3) * 0.90
                break;
            case 4:
                price += (productBasePrice * 4) * 0.80
                break;
            case 5:
                price += (productBasePrice * 5) * 0.75
                break;
            default:
                // I'm greedy so if something happens and there's more than 5 products in a package, full price!
                price += (productBasePrice * package.length)
                break;
        }
    })
    // Return rounded to nearest second decimal place.
    return Math.round(price * 100) / 100
}

/*
// These are some test functions I wrote for this.
function runTest1() {
    console.log("Test 1 result (should be 1928.55): " + computeTotalPrice(['A','A','B','B','C','C','D','E']))
}

function runTest2() {
    console.log("Test 2 result (should be 0): " + computeTotalPrice([]))
}

function runTest3() {
    console.log("Test 3 result (should be 1674.4): " + computeTotalPrice(['A','A','A','B','B','C']))
}

function runTest4() {
    console.log("Test 3 result (should be 1674.4): " + computeTotalPrice(['B','B','C','A','A','A']))
}

runTest1()
runTest2()
runTest3()
runTest4()
*/