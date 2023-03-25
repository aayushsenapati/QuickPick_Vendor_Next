//import clientPromise from "/lib/mongodb";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import {useEffect} from 'react'

export default function Menu(){

    return(
        <>
             <div className = "">
                <h1>Menu</h1>
                </div>

            <div>
                
            <form>
                <label>
                    Restaurant Name:
                    <input type="text" name="restaurantname" />
                </label>
                <br></br>
                <label>
                    Menu Item 1:
                    <input type="text" name="menuitem1" />
                </label>
                <br></br>
                <label>
                    Menu Item 2:
                    <input type="text" name="menuitem2" />
                </label>
                <br></br>
                <input type="submit" value="Submit" />
            </form>

            </div>
        </>
    )
}