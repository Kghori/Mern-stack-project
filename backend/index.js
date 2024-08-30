const express = require('express');
require('./db/config'); // Ensure this is correctly connecting to your MongoDB
const cors = require('cors');
const User = require('./db/User');
const product = require("./db/Product");
const Product = require('./db/Product');
const jwt = require('jsonwebtoken');
const jwtkey = 'e-commerce'
const app = express();


app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
        // Create a new user
        let user = new User({ name, email, password });
        let result = await user.save();
        // res.status(201).send(result);
        result = result.toObject();
        delete result.password
        jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (error, token) => {
            if (error) {
                res.send({ result: "something went wrong token will not generate " })
            }
            res.send({ result, auth: token });

        })


    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: "something went wrong token will not generate " })
                }
                res.send({ user, auth: token });

            })
            // res.send(user)
        }
        else {
            res.send({ result: "no use found" });
        }
    }
    else {
        res.send({ result: "no user found" });
    }

})


app.post("/product",verifyauth, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})


app.get("/getProduct",verifyauth, async (req, res) => {
    let productsdata = await Product.find();
    if (productsdata.length > 0) {
        res.send(productsdata)
    }
    else {
        res.send({ result: "product not found" });
    }
})

app.delete("/delete-product/:id", verifyauth,async (req, res) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/upproduct/:id",verifyauth, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "no data found" })
    }
});
app.put("/update/:id", verifyauth, async (req, res) => {
    let result = await Product.updateOne({
        _id: req.params.id
    }, { $set: req.body })
    res.send(result)
});


app.get("/search_pro/:key", verifyauth, async (req, res) => {
    let result = await Product.find({
        "$or":

            [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { price: { $regex: req.params.key } },
                { category: { $regex: req.params.key } }

            ]
    });
    res.send(result);
})

function verifyauth(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        // console.log("auth verify-->", token);
        jwt.verify(token, jwtkey, (err, valid) => {

            if (err) {
                res.status(401).send({ result: "Please provide Valid token " })

            } else {
                next();
            }

        })
    }
    else {
        res.status(403).send({ result: "Please add Valid token " })
    }




}
app.listen(4000, () => {

    console.log('Server running on port 4000');
});

