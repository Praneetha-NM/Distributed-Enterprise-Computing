import jsonWeb from 'jsonwebtoken'

export async function generateToken(id){
    let token  = jsonWeb.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
    return token
}