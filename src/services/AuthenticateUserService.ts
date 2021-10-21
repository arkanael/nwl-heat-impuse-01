
/** REGRAS DE NEGOCIOS A SEGUIR
 * [X] RECEBER O CODE(STRING)
 * [x] RECUPERAR O ACCESS_TOKEN NO GITHUB
 * [x] RECUPERAR AS INFORMAÇÕES DO USUÁRIO NO GITHUB
 * [ ] VERIFICAR SE O USUARIO EXISTE NO DB SE EXISIR GERAR O TOKEN NO GITHUB SE NÃO EXISTIR CRIAR NO DB E GERAR UM TOKEN 
 * [ ] RETORNAR O TOKEN COM AS INFORMAÇÕES DO USUÁRIO 
 */

import axios from "axios";
import prismaClient from "../prisma"

interface IAccessTokenResponse{
      access_token: string
}

interface IUserResponse{
      avatar_url: string,
      login: string,
      id: number,
      name: string
}

class AuthenticateUserService{
      async execute(code:string){
            const url ="https://github.com/login/oauth/access_token";

            const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url,null ,{
                  params:{
                        client_id: process.env.GITHUB_CLIENT_ID,
                        client_secret: process.env.GITHUB_CLIENT_SECRET,
                        code,
                  },
                  headers:{
                        "Accept": "application/json"
                  }
            });

            const response = await axios.get<IUserResponse>("https://api.github.com/user", {
                  headers:{
                        authorization: `Bearer ${accessTokenResponse.access_token}`,
                  }
            });

            const { login, id, avatar_ulr, name } = response.data;

            const user = await prismaClient.

            return response.data;
      }
}

export { AuthenticateUserService }