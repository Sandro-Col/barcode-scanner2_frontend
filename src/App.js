// import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [aisle, setAisle] = useState(0);
  const [side, setSide] = useState("");
  const [section, setSection] = useState(0);
  const [shelf, setShelf] = useState(0);
  const [shelfOrder, setShelfOrder] = useState(0);
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  //const connection = "http://localhost:3001/";
  const connection = "https://barcodescanner2-backend.onrender.com/";
  

  useEffect(() => {
    Axios.get(connection + "getProducts").then((response) => {
      setListOfProducts(response.data);
    });
  }, []);

  const createProduct = () => {
    Axios.post(connection + "createProduct", {
      barcode: barcode,
      aisle: aisle,
      side: side,
      section: section,
      shelf: shelf,
      shelfOrder: shelfOrder,
      brand: brand,
      name: name,
      category: category,
    }).then((response) => {
      setListOfProducts([
        {
          barcode: barcode,
          aisle: aisle,
          side: side,
          section: section,
          shelf: shelf,
          shelfOrder: shelfOrder,
          brand: brand,
          name: name,
          category: category,
        },
        ...listOfProducts,
      ]);
      // alert("PRODUCT CREATED");
    });
  };

  return (
    <div className="App">
    <br />
    <h1>Enter Product Information</h1>
      <br />
      <input type="text" placeholder="UPC..." onChange={(event) => { setBarcode(event.target.value.trim());}}></input>
      <input type="number" placeholder="Aisle..." onChange={(event) => { setAisle(event.target.value);}}></input>
      <input type="text" placeholder="Side..." onChange={(event) => { setSide(event.target.value.trim().toUpperCase());}}></input>
      <br />
      <br />
      <input type="number" placeholder="Section..." onChange={(event) => { setSection(event.target.value);}}></input>
      <input type="number" placeholder="Shelf..." onChange={(event) => { setShelf(event.target.value);}}></input>
      <input type="number" placeholder="Shelf Order..." onChange={(event) => { setShelfOrder(event.target.value);}}></input>
      <br />
      <br />
      <input type="text" placeholder="Brand..." onChange={(event) => { setBrand(event.target.value.trim());}}></input>
      <input type="text" placeholder="Product Name..." onChange={(event) => { setName(event.target.value.trim()); }} ></input>
      <input type="text" placeholder="Category..." onChange={(event) => { setCategory(event.target.value.trim()); }} ></input>
      <br />
      <br />
      <button onClick={createProduct}> Create Product </button>

      
      <br />
      <br />
      <br />
      <h1>List of Product</h1>

    

      <div className="productDisplay">
        <table>
          <thead>
            <tr>
              <th>UPC</th>
              <th>Brand - Product Name</th>
              <th>Aisle</th>
              <th>Side</th>
              <th>Section </th>
              <th>Shelf </th>
              <th>Shelf Position</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {listOfProducts.map((product, index) => {
              const link = "https://go-upc.com/search?q=" + product.barcode;
              return (
                <tr key={index}>
                  <td>
                    <a href={link} className="link">
                      {" "}
                      {product.barcode}{" "}
                    </a>
                  </td>
                  <td>
                    {product.brand} - {product.name}
                  </td>

                  <td>{product.aisle}</td>
                  <td>{product.side}</td>
                  <td>{product.section}</td>
                  <td>{product.shelf}</td>
                  <td>{product.shelfOrder}</td>
                  <td>{product.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// function App() {

// <div>
//                     <h1>Barcode: {product.barcode}</h1>
//                     <h2>Aisle: {product.aisle}</h2>
//                     <h2>Side: {product.side}</h2>
//                     <h2>Section: {product.section}</h2>
//                     <h2>Shelf: {product.shelf}</h2>
//                 </div>

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }

export default App;
