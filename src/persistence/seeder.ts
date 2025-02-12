import { hasher } from "../application/extensions/password-hasher.js";
import pkg from 'pg';
import "dotenv/config"


const pool = new pkg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


export async function TitleSeed() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        const client = await pool.connect();
        const result = await client.query(`Select count(*) as count from "titles" `);
        if (result.rows[0]['count'] == 0) {
            await client.query(`INSERT INTO public.titles ("description", "createdAt","updatedAt") VALUES(  'Personel', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
            await client.query(`INSERT INTO public.titles ("description", "createdAt","updatedAt") VALUES(  'Depo Sorumlusu', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
            await client.query(`INSERT INTO public.titles ("description", "createdAt","updatedAt") VALUES(  'İK Sorumlusu', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
        }
        client.release(true);
    } catch (error) {
        console.log(error);
    }
}

export async function PositionSeed() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        const client = await pool.connect();
        const result = await client.query(`Select count(*) as count from "positions" `);
        if (result.rows[0]['count'] == 0) {
            await client.query(`INSERT INTO public.positions ( "description", "createdAt","updatedAt") VALUES('Müdür', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
            await client.query(`INSERT INTO public.positions ( "description", "createdAt","updatedAt") VALUES('Ofis Çalışanı', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
            await client.query(`INSERT INTO public.positions ( "description", "createdAt","updatedAt") VALUES('Bilgi İşlem Yöneticisi', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
        }
        client.release(true);
    } catch (error) {
        console.log(error);
    }
}

export async function EmployeeSeed() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        const hashedPassword = await hasher("admin");
        const client = await pool.connect();
        const result = await client.query(`Select count(*) as count from "employees" `);
        if (result.rows[0]['count'] == 0) {
            await client.query(`INSERT INTO public.employees ("name", "surName", "email", "gsm", "positionId","titleId","createdAt","updatedAt") VALUES( 'Fevzi', 'Temiz', 'fevzi.temiz@outlook.com','0 000 000 00 00',3,1, '2024-12-20 20:30:29.055 +0300','2024-12-20 20:30:29.055 +0300');`);
        }
        client.release(true);
    } catch (error) {
        console.log(error);
    }
}

export async function RoleSeed() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        const client = await pool.connect();
        const result = await client.query(`Select count(*) as count from "roles" `);
        if (result.rows[0]['count'] == 0) {
            await client.query(`INSERT INTO public.roles ("description", "createdAt","updatedAt") VALUES( 'Admin', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
            await client.query(`INSERT INTO public.roles ("description", "createdAt","updatedAt") VALUES( 'Standart Kullanıcı', '2025-02-07 13:57:29.055 +0300','2025-02-07 13:57:29.055 +0300');`);
        }
        client.release(true);
    } catch (error) {
        console.log(error);
    }
}

export async function UserSeed() {
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
        const hashedPassword = await hasher("admin");
        const client = await pool.connect();
        const result = await client.query(`Select count(*) as count from "users" `);
        if (result.rows[0]['count'] == 0) {
            await client.query(`INSERT INTO public.users ( "userName", "isActive", "password", "roleId","employeeId","createdAt","updatedAt") VALUES( 'feyz', true, '${hashedPassword}',1,1, '2024-12-20 20:30:29.055 +0300','2024-12-20 20:30:29.055 +0300');`);
        }
        client.release(true);
    } catch (error) {
        console.log(error);
    }
}