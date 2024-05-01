import sql, { config, ConnectionPool } from 'mssql';

const connectionConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST as string,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT as string, 10),
  options: {
    trustServerCertificate: true,
  }
};

export async function connectDB() {
    try {
        const pool = await sql.connect(connectionConfig);
        return pool;
    } catch (error) {
        console.error('Błąd połączenia z bazą danych:', error);
    }
}

export async function executeQuery(query: string, params?: { name: string, type: sql.ISqlType, value: any }[]): Promise<any[] | undefined> {
    try {
        console.log(query)
        const db = await connectDB();
        if (db) {
            const request = db.request();
            params?.forEach(param => {
                request.input(param.name, param.type, param.value);
            });
            const result = await request.query(query);
            return result.recordset;
        }
    } catch (error) {
        console.error('Błąd zapytania do bazy danych:', error);
    }
    return undefined;
}