import express from 'express';

const app = express();

app.get('/api/products',(req,res) => {
    const products  = [
        {
            id:1,
            table: "this is the table",
            model: "advance",
            feedback: "4.5"
        },
        {
            id:2,
            table: "this is the table",
            model: "normal",
            feedback: "3.5"
        },
        {
            id:3,
            table: "this is the table",
            model: "normal",
            feedback: "4.0"
        },
        {
            id:4,
            table: "this is the table",
            model: "low",
            feedback: "2.5"
        },
        {
            id:5,
            table: "this is the table",
            model: "advance",
            feedback: "5.0"
        }
    ]

    if(req.query.search){
        const filtervalue = products.filter(product => product.name.includes(req.query.search));
        res.send(filtervalue);
        return;
    }

    setTimeout(()=>{
    res.send(products);
    },3000)
})

const port = 3000;

app.listen(port,()=>{
    console.log(`server is starting on port ${port}`);
});
