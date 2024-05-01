import type { NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeQuery } from "../../db/connection";
import { TYPES } from "mssql";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },

            },
            async authorize(credentials, req) {
                if (credentials) {
                    try {
                        const { username, password } = credentials;
                        const query = `
                            SELECT * FROM AppUsers WHERE usr_Name = @username AND usr_password = @password;
                        `;
                        const params = [
                            { name: 'username', type: TYPES.NVarChar(), value: username },
                            { name: 'password', type: TYPES.NVarChar(), value: password }
                        ];
                        const recordset = await executeQuery(query, params);
                        if (recordset && recordset.length > 0) {
                            const user: User | null = {
                                id: recordset[0].usr_name,
                                email: recordset[0].usr_email,
                                name: recordset[0].usr_name,
                                image: recordset[0].usr_image
                            };
                            return user;
                        }

                    } catch (error) {
                        console.error('Błąd podczas komunikacji z bazą danych', error);
                    }
                    return null;
                } else {
                    return null;
                }
            }
        })
    ]
};
