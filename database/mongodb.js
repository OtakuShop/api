
// const getIdCart = async (usuario) => {
//     const client = await main();
//     let response = {};
//     let ids = []
//     let qtdes = []
//     try {
//         const resultado = await client.db("otaku-shop-db").collection("usuarios").findOne({ usuario: usuario })
//         resultado.carrinho.forEach((element) => {
//             ids.push({
//                 id: element.id
//             })
//             qtdes.push(element.qtde)
//         })
//         response = {
//             ids: ids,
//             qtdes: qtdes
//         }
//     } catch (error) {
//         console.log(error)
//         response = "Error 404"
//     } finally {
//         client.close();
//     }
//     return response;
// }

// const searchCart = async (field) => {
//     const client = await main();
//     let response = {};
//     try {
//         const resultado = await client.db("otaku-shop-db").collection("usuarios").findOne(field)
//         response = resultado
//     } catch (error) {
//         console.error("Aqui está o error" + error)
//     } finally {
//         client.close();
//     }
//     return response;
// }

const getCart = async (usuario) => {
    const client = await main();
    const { ids, qtdes } = await getIdCart(usuario);
    let response;
    try {
        const resultado = filtro(await client.db("otaku-shop-db").collection("produtos").find(
            {
                $or: ids
            },
            {
                "path": 1,
                "name": 1,
                "price": 1
            }
        ).toArray())
        resultado.forEach((produto, index) => {
            produto.qtde = qtdes[index]
        })
        response = resultado
    } catch (error) {
        response = "Error 404"
    } finally {
        client.close();
    }
    return response
}
// 
// const updateCart = async (usuario, cart) => {
//     const client = await main();
//     try {
//         await client.db("otaku-shop-db").collection("usuarios").updateOne(
//             { usuario: usuario },
//             [
//                 { $set: { carrinho: cart } },
//             ]
//         )
//         response = true;
//     } catch (error) {
//         response = false;
//     } finally {
//         client.close();
//     }
// }


// module.exports =
// {
//     searchDetalhes, 
//     searchCart,
//     updateCart,
//     getCart,
//     searchProdutos
// }




