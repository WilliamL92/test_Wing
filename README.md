# test_Wing
the project for the Wing technical test

# How it works ?
1. The main code is in  ./modules/mytools.js
2. I use this method in the ./server.js
3. This method return an object with the total_price of all pallets and an array of all pallets that contain 15 packages and these packages contain all items of an order organized by their weight

# Expected output
```
{
  total_prices: 2134, // the total price of the operation (including all palettes)
  items: [ // list of all palettes
    {
      palette_number: 1, 
      palette_price: 113, // The total price of the current palette (including all the 15 packages)
      packages: [ // list of all packages in the pallette (15 elements expected)
        {
          tracking_id: '%b9%D1Akc6t8]X[',
          items: [{id: '5bb619e49593e5d3cbaa0b52', name: 'Flowers', weight: '1.5'}, {...}], // list of all items in the current package
          weight: 22.9, // The total weight of the current package
          price: 10, // the total price of the current package (including all items)
          quantity: 4,
          order_id: '5bb61dfd3741808151aa413b'
        }, {...}]
    }, {...}]
}
```
